import http from "../utulies/http";
class SchemaDataService {
  getAll() {
    return http.get(`/file_schema`);
  }
  get(id) {
    return http.get(`/file_schema/${id}`);
  }
  create(data) {
    return http.post(`/file_schema`, data);
  }
  update(data, id) {
    return http.put(`/file_schema/${id}`, data);
  }
  delete(id) {
    return http.delete(`/file_schema/${id}`);
  }
}
export default new SchemaDataService();
