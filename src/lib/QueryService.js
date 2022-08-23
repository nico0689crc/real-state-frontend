import axiosInstance from "./axios.js";

export class QueryService {
  constructor(basePath) {
    this.http = axiosInstance;
    this.basePath = basePath;
  }

  findAll = async () => {
    return await this.http.get(this.basePath).then(res => res.data);
  };

  find = async params => {
    const { size = 10, page = 1, include, filter = [] } = params;

    const queries = {
      "page[size]": size,
      "page[number]": page,
      ...(Boolean(include) && { include: include.join(",") }),
    };

    if (filter.length > 0) {
      for (const item of filter) {
        queries[`filter[${item.field}]`] = item.criteria;
      }
    }

    const queryString = new URLSearchParams(queries).toString();

    return this.http
      .get(`${this.basePath}?${queryString}`)
      .then(res => res.data);
  };

  findOne = async ({ id, include }) => {
    const queries = {
      ...(Boolean(include) && { include: include.join(",") }),
    };

    const queryString = new URLSearchParams(queries).toString();

    return this.http
      .get(
        `${this.basePath}/${id}${
          queryString.length > 0 ? `?${queryString}` : ""
        }`
      )
      .then(res => res.data);
  };

  get = async url => {
    return this.http.get(url).then(res => res.data);
  };
}
