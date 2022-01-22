import Service from './service'
import HttpResponse from "../utils/httpResponse";

class UserService extends Service {
  constructor(model) {
    super(model)
    this.model = model
  }
  async getAllUser(query) {
    const result = await this.model.find(query, { name: 1, image: 1 })
    return new HttpResponse(result)
  }
}

export default UserService