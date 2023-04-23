import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "products";

export const schemaProduct = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true }, // TODO AGREGAR PROPIEDAD UNIQUE Y PROBAR EL ERROR
    category: { type: String, required: true },
    thumbnails: { type: Array, required: true },
    status: { type: Boolean, required: true },
  },
  { versionKey: false }
)

schemaProduct.plugin(mongoosePaginate);

const productModel = model(collection, schemaProduct);

export default productModel;