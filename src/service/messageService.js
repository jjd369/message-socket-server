import Service from "./service";
import HttpResponse from "../utils/httpResponse";

class MessageService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async getAllMessages(query) {
    const { name } = query
    const result = await this.model.find({ members: name }, { members: 1, messages: 1 })
    const totalCount = await this.model.countDocuments({ members: [name] })
    return new HttpResponse(result, totalCount)
  }
  async getMessage(query) {
    const { id } = query
    const result = await this.model.findById(id, { messages: 1, total_messages: 1 });
    return new HttpResponse(result);
  }
  async pushMessage(id, data) {
    const { messages } = data;
    const result = await this.model.findByIdAndUpdate(
      id,
      { $push: { messages } },
      { new: true }
    );
    return new HttpResponse(result);
  }
}

export default MessageService;
