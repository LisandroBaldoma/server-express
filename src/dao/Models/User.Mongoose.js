import mongoose from "mongoose";

const collection = "users";

const schemaUser = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    salt: String,
  },
  { versionKey: false }
);

const userModel = mongoose.model(collection, schemaUser);

export default userModel;
