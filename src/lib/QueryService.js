import { axiosAdminPath, axiosPublicPath } from "./axios.js";

export class QueryService {
  constructor(basePath, adminPath = false) {
    this.http = adminPath ? axiosAdminPath() : axiosPublicPath();
    this.basePath = basePath;
  }

  findAll = async () => {
    return await this.http.get(this.basePath).then(res => res.data);
  };

  find = async params => {
    const { page = {
      size: "10",
      number: "1"
    } } = params;

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

  get = async url => {
    return this.http.get(url).then(res => res.data);
  };

  create = async (url, data) => {
    return this.http.post(url, data).then(res => res.data);
  };

  update = async ({ url, data, id }) => {
    return this.http.patch(`${url}/${id}`, data).then(res => res.data);
  };

  delete = async (url) => {
    return this.http.delete(url).then(res => res.data);
  };
}
