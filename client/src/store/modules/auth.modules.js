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
        return await AuthService.login(payload);
      } catch (err) {
        console.log(err.message);
      }
    },
    async logout() {
      try {
        return await AuthService.logout();
      } catch (err) {
        console.log(err.message);
      }
    },
    async register(_, payload) {
      try {
        return await AuthService.register(payload);
      } catch (err) {
        console.log(err.message);
      }
    },
    async restoreRequest(_, payload) {
      try {
        return await AuthService.restoreRequest(payload);
      } catch (err) {
        console.log(err.message);
      }
    },
    async restorePassword(_, payload) {
      try {
        return await AuthService.restorePassword(payload);
      } catch (err) {
        console.log(err.message);
      }
    },
    async googleOAuth(_, payload) {
      try {
        return await AuthService.googleOAuth(payload);
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
