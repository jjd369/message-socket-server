import { Router } from "express";
import MessageController from "../controller/messageController";
import AuthController from '../controller/authController';
import wrapAsync from "../utils/wrapAsync";

const routes = Router();

routes.get(
  "/message", wrapAsync(AuthController.isAuth.bind(AuthController)),
  wrapAsync(MessageController.getMessage.bind(MessageController))
);
routes.get(
  "/messages",
  wrapAsync(AuthController.isAuth.bind(AuthController)),
  wrapAsync(MessageController.getAllMessages.bind(MessageController))
)
routes.post(
  "/roomCreate",
  wrapAsync(MessageController.insert.bind(MessageController))
);
routes.patch(
  "/updateMessage",
  wrapAsync(MessageController.pushMessage.bind(MessageController))
);

export default routes;
