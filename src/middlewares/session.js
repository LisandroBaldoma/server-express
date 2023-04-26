import MongoStore from "connect-mongo";
import session from "express-session";
import { MOONGODB_CONECTION_STRING } from "../config/database.config.js";

export default session({
  store: MongoStore.create({mongoUrl: MOONGODB_CONECTION_STRING}),
  saveUninitialized: false,
  resave: false,
  secret: "SESSION_SECRET"
});
