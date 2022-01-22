import HttpResponse from "../utils/httpResponse";

class Service {
  constructor(model) {
    this.model = model;
  }
  async getAll(query) {
    const result = await this.model.find(query);
    console.log(query);
    if (!result.length) {
      const error = new Error("item is not find");
      error.statusCode = 404;
      throw error;
    }
    const totalCount = await this.model.countDocuments(query);
    return new HttpResponse(result, totalCount);
  }
  async get(id) {
    const result = await this.model.findByid(id);
    if (!result.length) {
      const error = new Error("item is not find");
      error.statusCode = 404;
      throw error;
    }
    const totalCount = await this.model.countDocuments(query);
    return new HttpResponse(result, totalCount);
  }
  async insert(data) {
    const result = await this.model.create(data);
    return new HttpResponse(result);
  }
  async update(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data);
    return new HttpResponse(result);
  }
  async delete(id) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      const error = new Error("item is not find");
      error.statusCode = 404;
      throw error;
    } else {
      return new HttpResponse(result, { deleted: true });
    }
  }
}

export default Service;
