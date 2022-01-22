import Controller from './Controller';
import user from '../models/user'
import UserService from '../service/userService';

const userService = new UserService(user)
class UserController extends Controller {
  constructor(service) {
    super(service)
    this.service = service
  }
  async getAllUser(req, res, next) {
    const result = await this.service.getAllUser(req.query)
    return res.status(result.statusCode).json(result.data)
  }
}

export default new UserController(userService)