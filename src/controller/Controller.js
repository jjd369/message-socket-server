class Controller {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res, next) {
    const result = await this.service.getAll(req.query);
    return res.status(result.statusCode).json(result);
  }
  async get(req, res, next) {
    const result = await this.service.get(req.id);
    return res.status(result.statusCode).json(result);
  }
  async insert(req, res, next) {
    const result = await this.service.insert(req.body);
    return res.status(result.statusCode).json(result);
  }
  async update(req, res, next) {
    const result = await this.service.update(req.id, req.body);
    return res.status(result.statusCode).json(result);
  }
  async delete(req, res, next) {
    const result = await this.service.delete(req.id);
    return res.status(result.statusCode).json(result);
  }
}

export default Controller;
