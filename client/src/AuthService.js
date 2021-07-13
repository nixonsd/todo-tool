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
        remember
      })
      .catch((err) => console.log(err.message));
  }

  static async logout() {
    return await axios
      .post(`${url}logout`)
      .catch((err) => console.log(err.message));
  }
}

export default AuthService;
