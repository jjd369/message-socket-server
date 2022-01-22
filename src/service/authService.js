import Service from "./service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import globalEmitter from '../utils/globalEmitter';
import MessageService from './messageService'
import messageModel from '../models/message'
import HttpResponse from "../utils/httpResponse";

class AuthService extends Service {
  constructor(model, tokenModle) {
    super(model);
    this.model = model;
    this.tokenModle = tokenModle;
    this.messageService = new MessageService(messageModel)
  }
  async signUp(data) {
    const { name, password } = data;
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.model.create({
      name,
      password: hashPassword
    });
    return new HttpResponse(result, { statusCode: 201 });
  }
  async signIn(data) {
    const { name, password } = data;

    const user = await this.model.findOne({ name })
    if (!user) {
      const error = new Error('please check your id')
      error.statusCode = 422
      throw error
    }
    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
      const error = new Error('please check your password')
      error.statusCode = 422
      throw error
    }

    const accessToken = await this.createAccessToken({ name })
    const refreshToken = await this.createRefreshToken({ name })
    globalEmitter.emit('login', name)
    await this.tokenModle.create({ token: refreshToken, user: user._id })

    const result = { accessToken, refreshToken }

    return new HttpResponse(result);
  }
  async logOut(data) {
    const { token, name } = data
    const result = await this.tokenModle.deleteOne({ token })
    globalEmitter.emit('logout', name)
    return new HttpResponse(result, { delete: true })
  }
  async isAuth(token) {
    try {
      return await jwt.verify(token, process.env.ACCESS_TOKEN)
    } catch (e) {
      throw e
    }
  }
  async createAccessToken(data) {
    return await jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "30m" });
  }
  async createRefreshToken(data) {
    return await jwt.sign(data, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
  }
}

export default AuthService;
