import mongoose from "mongoose";

const collection = "users";

const schemaUser = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },    
    name: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { versionKey: false }
);

const userModel = mongoose.model(collection, schemaUser);

export default userModel;
