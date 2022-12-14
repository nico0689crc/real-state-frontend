import { axiosAdminPath, axiosPublicPath } from "./axios.js";

export class QueryService {
  constructor(basePath, adminPath = false, headers = {}) {
    this.http = adminPath ? axiosAdminPath(headers) : axiosPublicPath(headers);
    this.basePath = basePath;
  }

  findAll = async () => {
    return await this.http.get(this.basePath).then(res => res.data);
  };

  find = async (params = { page: { size: "10", number: "1" } }) => {
    const { page } = params;

    const queries = {
      "page[size]": page.size,
      "page[number]": page.number
    };

    const queryString = new URLSearchParams(queries).toString();

    return this.http
      .get(`${this.basePath}?${queryString}`)
      .then(res => res.data);
  };

  findOne = async (id) => {
    return this.http.get(`${this.basePath}/${id}`).then(res => res.data);
  };

  get = async () => {
    return this.http.get(this.basePath).then(res => res.data);
  };

  create = async (data) => {
    return this.http.post(this.basePath, data).then(res => res.data);
  };

  update = async (id, data) => {
    return this.http.patch(`${this.basePath}/${id}`, data).then(res => res.data);
  };

  updateCustom = async (url, data) => {
    return this.http.patch(url, data).then(res => res.data);
  };

  delete = async (id) => {
    return this.http.delete(`${this.basePath}/${id}`).then(res => res.data);
  };

  deleteCustom = async (url) => {
    return this.http.delete(url).then(res => res.data);
  };

  async login(input) {
    return this.http.post(this.basePath, input).then(res => res);
  }

  async resetPassword(input) {
    return this.http
      .post(this.basePath, input)
      .then(res => res.data);
  }

  async resetPasswordEdit(input) {
    return this.http
      .put(this.basePath, input)
      .then(res => res.data);
  }
}
