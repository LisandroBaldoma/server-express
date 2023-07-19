function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

export class GenericDao {
  #model;
  constructor(modelMongoose) {
    this.#model = modelMongoose;
  }
  async create(model) {
    const result = toPojo(await this.#model.create(model));
    //delete result._id
    return result;
  }
  async findById(criteria) {
    const result = await this.#model.findById(criteria);
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  async find(params) {
    console.log("metodo find");
    //PAGINACION
    let opcion;

    let paginacion = {
      limit: params.limit ? params.limit : 5,
      page: params.page ? params.page : 1,
      lean: true,
      sort: params.sort ? { stock: params.sort } : "",
    };
    params.query
      ? (opcion = {
          category: params.query,
        })
      : (opcion = {});

    const {
      docs,
      totalDocs,
      limit,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = await this.#model.paginate(opcion, paginacion);

    const respuesta = {
      status: "Success",
      payload: docs,
      totalDocs,
      limit,
      page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink:
        hasPrevPage == true
          ? `http://localhost:8080/products?page=${prevPage}`
          : null,
      nextLink:
        hasNextPage == true
          ? `http://localhost:8080/products?page=${nextPage}`
          : null,
    };
    return respuesta;
  }
  async findOne(criteria) {
    
      // le saco el lean() para poder actualizar contraseñas si surge un error mas adelante por usar el metodo en otro lado revisar contraseña
      const result = await this.#model.findOne(criteria);      
      if(!result){
        throw new Error('NOT FOUND')
      }else{
        return result;
      }
      
   

  }
  async updateOne(criteria, newData) {
    const result = await this.#model
      .findByIdAndUpdate(criteria, newData, {new:true})
      .lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  
  async deleteOne(criteria) {
    const result = await this.#model.findByIdAndRemove(criteria);
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  
  async findByIdPopulate(criteria, tabla) { 
    const result = await this.#model
      .findById(criteria)
      .populate({ path: `${tabla}`, strictPopulate: false })
      .lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  async insertMany(criteria){
    const result = await this.#model.insertMany(criteria)
    return result;
  }
}
