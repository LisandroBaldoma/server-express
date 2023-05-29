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
    const result = await this.#model.findById(criteria).lean();
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
    const result = await this.#model.findOne(criteria).lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  async updateOne(criteria, newData) {
    const result = await this.#model
      .findByIdAndUpdate(criteria, newData)
      .lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  //   async updateMany(criteria, newData) {
  //     console.log("funcion TODO: Terminar")
  //   }
  async deleteOne(criteria) {
    const result = await this.#model.findByIdAndRemove(criteria).lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
  //   async deleteMany(criteria) {
  //     console.log("funcion TODO: Terminar")
  //   }
  async findByIdPopulate(criteria, tabla) {
    const result = await this.#model
      .findById(criteria)
      .populate({ path: `${tabla}`, strictPopulate: false })
      .lean();
    if (!result) throw new Error("NOT FOUND");
    return result;
  }
}
