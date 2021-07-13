import AuthService from "../../AuthService";
import cookies from "vue-cookies";

const TOKEN_KEY = "sid";

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    async login(_, payload) {
      try {
        await AuthService.login(payload);
      } catch (err) {
        console.log(err.message);
      }
    },
    async logout() {
      try {
        await AuthService.logout();
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  getters: {
    token: (state) => state.token,
    isAuthenticated: () => !!cookies.get(TOKEN_KEY),
  },
};
