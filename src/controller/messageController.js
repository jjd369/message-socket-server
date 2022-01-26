import Controller from "./Controller";
import MessageService from "../service/messageService";
import MessageModel from "../models/message";

const messageService = new MessageService(MessageModel);

class MessageController extends Controller {
  constructor(service) {
    super(service);
    this.service = service;
  }
  async getAllMessages(req, res, next) {
    const result = await this.service.getAllMessages(req.query);
    return res.status(result.statusCode).json(result.data)
  }
  async getMessage(req, res, next) {
    const result = await this.service.getMessage(req.query);
    return res.status(result.statusCode).json(result.data);
  }
  async pushMessage(req, res,) {
    const result = await this.service.pushMessage(req.body.id, req.body);
    return res.status(result.statusCode).json(result.data);
  }
}

const messageController = new MessageController(messageService);
export default messageController;
