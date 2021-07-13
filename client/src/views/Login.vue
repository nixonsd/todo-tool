<template>
  <div>
    <div class="row">
      <h4>Sign In</h4>
      <h6><router-link to="/register">/ Sign Up</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            placeholder="Write email..."
            id="email"
            type="email"
            class="validate"
            v-model="values.email"
          />
          <label for="email">Email</label>
        </div>

        <div class="input-field">
          <input
            placeholder="Write password..."
            id="password"
            type="password"
            class="validate"
            v-model="values.password"
          />
          <label for="password">Password</label>
        </div>

        <div class="row">
          <label>
            <input type="checkbox" class="filled-in" checked="checked" v-model="values.remember" />
            <span>Remember me</span>
          </label>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light btn-space" type="submit">
            Sign In
          </button>
          <router-link to="/">Forgot password?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  data: () => ({
    store: useStore(),
    router: useRouter(),
    values: {
      email: '',
      password: '',
      remember: true
    },
  }),
  methods: {
    async submitHandler() {
      await this.store.dispatch("auth/login", this.values);
      this.router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-space {
  margin-right: 0.7rem;
}
</style>
