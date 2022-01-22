import Controller from './Controller';
import AuthService from '../service/authService'
import userModel from '../models/user'
import tokenModel from '../models/token'

const authService = new AuthService(userModel, tokenModel)

class AuthController extends Controller {
  constructor(service) {
    super(service)
    this.service = service
  }
  async signUp(req, res, next) {
    const result = await this.service.signUp(req.body)
    return res.status(result.statusCode).json(result.data)
  }
  async signIn(req, res, next) {
    const result = await this.service.signIn(req.body)
    return res.status(result.statusCode).json(result.data)
  }
  async logOut(req, res, next) {
    const result = await this.service.logOut(req.body)
    return res.status(result.statusCode).json(result.data)
  }
  async isAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      const error = new Error('please check your authorization')
      error.statusCode = 400
      throw error
    }

    const result = await this.service.isAuth(token)
    // if (!result) {
    //   const error = new Error('Invaild token')
    //   error.statusCode = 404
    //   throw error
    // }
    req.authorized = true
    req.name = result.name
    next()
  }
}

const authController = new AuthController(authService)
export default authController