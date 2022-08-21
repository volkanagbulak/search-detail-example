import request from "./request";

class ProductService {
  getAll() {
    return request({
      url: "/products",
      method: "GET",
    });
  }
  getDetailById(id) {
    return request({
      url: `/products/${id}`,
      method: "GET",
    });
  }
}

export default new ProductService();
