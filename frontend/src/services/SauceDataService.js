import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/sauces");
  }

  get(id) {
    return http.get(`/sauces/${id}`);
  }

  create(data) {
    return http.post("/sauces", data);
  }

  update(id, data) {
    return http.put(`/sauces/${id}`, data);
  }

  delete(id) {
    return http.delete(`/sauces/${id}`);
  }

  deleteAll() {
    return http.delete(`/sauces`);
  }

  findByTitle(title) {
    return http.get(`/sauces?title=${title}`);
  }
}

export default new SauceDataService();