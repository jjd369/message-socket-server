import { Router } from "express";
import AuthController from '../controller/authController'
import wrapAsync from '../utils/wrapAsync';
import tokenModel from '../models/token';


const routes = Router();

routes.post('/signIn', wrapAsync(AuthController.signIn.bind(AuthController)))
routes.post('/signUp', wrapAsync(AuthController.signUp.bind(AuthController)))
routes.delete('/logOut', wrapAsync(AuthController.logOut.bind(AuthController)))

routes.get('/tokens', wrapAsync(async (req, res) => {
  const result = await tokenModel.find()
  res.json(result)
}))

export default routes
