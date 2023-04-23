import { Schema, model } from "mongoose";

const collection = "carts";

export const schemaProduct = new Schema(
  {
    products: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { versionKey: false }
);

const cartModel = model(collection, schemaProduct);

export default cartModel;
