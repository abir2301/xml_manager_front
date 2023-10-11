import http from "../utulies/http";
class SchemaDataService {
  //shemas
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
  exportSchema(id) {
    return http.post(`/file_schema/${id}`);
  }
  downloadSchema() {
    return http.get(`/xsdFiles/schema.xsd`);
  }

  exportFile(id) {
    return http.post(`/file/xml/${id}`);
  }
  downloadFile() {
    return http.get(`/xmlFiles/output.xml`);
  }
  //xml_elements
  postElement(data, id) {
    return http.post(`/xml_element/${id}`, data);
  }
  postValue(data, id) {
    return http.post(`/xml_element/value/${id}`, data);
  }
  getSubElement(id, data) {
    return http.post(`/xml_element/sub/${id}`, data);
  }
  deleteElement(id) {
    return http.delete(`/xml_element/${id}`);
  }
  updateElement(data, id) {
    return http.put(`/xml_element/${id}`, data);
  }
  //auth
  userLogin(data) {
    return http.post(`/user/login`, data);
  }
  userRegister(data) {
    return http.post(`/user/register`, data);
  }
  userProfile() {
    return http.get(`/user`);
  }
  updateProfile(data) {
    return http.put(`/user`, data);
  }
  // xml_files
  getAllFiles() {
    return http.get(`/file`);
  }
  getFile(id) {
    return http.get(`/file/${id}`);
  }
  createFile(data, id) {
    return http.post(`/file/${id}`, data);
  }
  updateFile(data, id) {
    return http.put(`/file/${id}`, data);
  }
  deleteFile(id) {
    return http.delete(`/file/${id}`);
  }
}
export default new SchemaDataService();
