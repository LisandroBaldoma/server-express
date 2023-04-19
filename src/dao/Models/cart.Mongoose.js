import { Schema, model } from "mongoose";

const collection = "carts";

export const schemaProduct = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number },
        },
      ],
    },
  },
  { versionKey: false }
);

const cartModel = model(collection, schemaProduct);

export default cartModel;
