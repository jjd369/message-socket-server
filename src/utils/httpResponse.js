class HttpResponse {
  constructor(
    data,
    options = { totalCount: 0, statusCode: "200", deleted: null }
  ) {
    this.statusCode = options.statusCode || 200;
    if (options.deleted) {
      this.deleted = options.deleted;
    }
    this.data = data;
  }
}
export default HttpResponse;
