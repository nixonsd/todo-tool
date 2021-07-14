import axios from "axios";

const url = "http://localhost:3000/api/auth/";

axios.defaults.withCredentials = true;

class AuthService {
  static async login(object) {
    const { email, password, remember } = object;
    return await axios
      .post(`${url}login`, {
        email,
        password,
        remember,
      })
      .catch((err) => err.response);
  }

  static async logout() {
    return await axios
      .post(`${url}logout`)
      .catch((err) => err.response);
  }

  static async register(object) {
    const { name, email, password } = object;
    return await axios
      .post(`${url}register`, {
        name,
        email,
        password,
      })
      .catch((err) => err.response);
  }
}

export default AuthService;
