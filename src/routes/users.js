import { Router } from 'express';
import wrapAsync from "../utils/wrapAsync";
import userController from '../controller/userController';
const routes = Router()

routes.get('/users', wrapAsync(userController.getAllUser.bind(userController)))

export default routes