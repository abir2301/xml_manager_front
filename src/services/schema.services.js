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
  postElement(data, id) {
    return http.post(`/xml_element/${id}`, data);
  }
  deleteElement(id) {
    return http.delete(`/xml_element/${id}`);
  }
  updateElement(data, id) {
    return http.put(`/xml_element/${id}`, data);
  }
  exportSchema(id) {
    return http.post(`/file_schema/${id}`);
  }
  downloadSchema() {
    return http.get(`/xsdFiles/schema.xsd`);
  }
  userLogin(data) {
    return http.get(`/user/login`, data);
  }
  userRegister(data) {
    return http.get(`/user/register`, data);
  }
}
export default new SchemaDataService();
