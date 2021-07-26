<template>
  <div>
    <div class="row">
      <h4>Sign In</h4>
      <h6><router-link to="/register">/ Sign Up</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent="onSubmit" novalidate>
        <div class="input-field">
          <input
            placeholder="Write email..."
            :class="{ invalid: eError }"
            id="email"
            name="email"
            type="email"
            v-model="email"
            @blur="eBlur"
          />
          <label for="email">Email</label>
          <span v-if="eError" class="helper-text" :data-error="eError"></span>
        </div>

        <div class="input-field">
          <input
            placeholder="Write password..."
            :class="{ invalid: pError }"
            id="password"
            name="password"
            type="password"
            v-model="password"
            @blur="pBlur"
          />
          <label for="password">Password</label>
          <span v-if="pError" class="helper-text" :data-error="pError"></span>
        </div>

        <div class="row">
          <label class="col s12">
            <input
              id="remember"
              type="checkbox"
              class="filled-in"
              checked="checked"
              name="remember"
              v-model="remember"
            />
            <span>Remember me</span>
          </label>
        </div>
        <div class="row">
          <div class="col s12">
            <button
              class="btn waves-effect waves-light btn-space"
              type="submit"
              :disabled="isSubmitting"
            >
              Sign In
            </button>
            <router-link to="/restore">Forgot password?</router-link>
          </div>
        </div>
        <div class="row col s12">
          <div class="wrapper">
            <span>Or Sign In With</span>
          </div>
        </div>
        <div class="row">
          <google-auth class="col s12" />
        </div>
      </form>
      <component
        class="red-text"
        :is="ErrorProp"
        :title="error.message"
        v-show="error.id !== 'auth_succeed'"
      />
    </div>
  </div>
</template>
<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Alert from "./partials/Alert.vue";
import GoogleAuth from "./partials/GoogleAuth.vue";

export default {
  components: { Alert, "google-auth": GoogleAuth },
  methods: {},
  setup() {
    // Variables
    const ErrorProp = "Alert";
    let error = { id: "auth_succeed", message: "OK" };

    // Initial values
    const formValues = {
      email: "",
      password: "",
      remember: true,
    };

    const store = useStore();
    const router = useRouter();

    const { handleSubmit, isSubmitting } = useForm({
      initialValues: formValues,
    });
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Field is required")
        .email("Invalid email address")
    );
    const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur,
    } = useField(
      "password",
      yup
        .string()
        .trim()
        .required("Field is required")
        .min(6, "Password must have 6 characters at least")
    );

    const { value: remember } = useField("remember", yup.boolean());

    const onSubmit = handleSubmit(async (values) => {
      try {
        const response = await store.dispatch("auth/login", values);
        const { status, data } = response;
        if (status !== 200) {
          const { id, message } = data;
          error.id = id;
          error.message = message;
          return;
        }
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    });

    return {
      email,
      password,
      remember,
      eError,
      pError,
      eBlur,
      pBlur,
      onSubmit,
      isSubmitting,
      error,
      ErrorProp,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-space {
  margin-right: 0.7rem;
}

.wrapper {
  background-color: #ddd;
  height: 1px;
  text-align: center;

  span {
    position: relative;
    padding: 0 2rem;
    top: -0.9rem;
    font-size: 1.1rem;
    color: #b6b6b6;
    background: #ffffff;
  }
}
</style>
