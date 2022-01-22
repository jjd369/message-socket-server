import { Router } from "express";
import message from "./message";
import auth from './auth'
import user from './users'

const routes = Router();
routes.use("/message", message);
routes.use("/auth", auth);
routes.use("/user", user);

export default routes;
