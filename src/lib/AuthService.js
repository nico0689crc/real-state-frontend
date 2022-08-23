import { QueryService } from "./QueryService";
import API_ENDPOINTS from "../constants/endpoints";

class Auth extends QueryService {
  async login(input) {
    return this.http.post(API_ENDPOINTS.LOGIN, input).then(res => res);
  }

  async register(input) {
    return this.http.post(API_ENDPOINTS.REGISTER, input).then(res => res.data);
  }

  async forgotPassword(input) {
    return this.http
      .post(API_ENDPOINTS.FORGOT_PASSWORD, input)
      .then(res => res.data);
  }

  async resetPassword(input) {
    return this.http
      .post(API_ENDPOINTS.RESET_PASSWORD, input)
      .then(res => res.data);
  }

  async activateAccount(input) {
    return this.http
      .post(API_ENDPOINTS.ACTIVATE_ACCOUNT, input)
      .then(res => res.data);
  }
}

export const AuthService = new Auth(API_ENDPOINTS.USERS);
