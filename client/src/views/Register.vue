<template>
  <div>
    <div class="row">
      <h4>Sign Up</h4>
      <h6><router-link to="/login">/ Sign In</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent="onSubmit" novalidate>
        <div class="input-field">
          <input
            placeholder="Write first name..."
            :class="{ invalid: nError }"
            id="name"
            type="text"
            name="name"
            v-model="name"
            @blur="nBlur"
          />
          <label for="name">First Name</label>
          <span v-if="nError" class="helper-text" :data-error="nError"></span>
        </div>

        <div class="input-field">
          <input
            placeholder="Write email..."
            :class="{ invalid: eError }"
            id="email"
            type="email"
            name="email"
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
            type="password"
            name="password"
            v-model="password"
            @blur="pBlur"
          />
          <label for="password">Password</label>
          <span v-if="pError" class="helper-text" :data-error="pError"></span>
        </div>

        <div class="input-field">
          <input
            placeholder="Repeat password..."
            :class="{ invalid: pcError }"
            id="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            v-model="passwordConfirmation"
            @blur="pcBlur"
          />
          <label for="passwordConfirmation">Repeat Password</label>
          <span v-if="pcError" class="helper-text" :data-error="pcError"></span>
        </div>

        <div class="row">
          <div class="col s12">
            <button
              class="btn waves-effect waves-light btn-space col s6 m4"
              type="submit"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <component
        class="red-text"
        :is="ErrorProp"
        :title="error.message"
        v-if="error.id !== 'auth_succeed'"
      />
      <!-- <div class="row">
        <div class="col s12 wrapper">
          <span>Or Sign Up with</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Alert from "./partials/Alert.vue";

export default {
  components: { Alert },
  setup() {
    // Variables
    const ErrorProp = "Alert";
    const error = { id: "auth_succeed", message: "OK" };

    // Initial values
    const formValues = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    const store = useStore();
    const router = useRouter();

    const { handleSubmit, isSubmitting } = useForm({
      initialValues: formValues,
    });

    const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
      "name",
      yup
        .string()
        .trim()
        .required("Field is required")
    );

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

    const {
      value: passwordConfirmation,
      errorMessage: pcError,
      handleBlur: pcBlur,
    } = useField(
      "passwordConfirmation",
      yup
        .string()
        .trim()
        .required("This field is required")
        .min(6, "Password must have 6 characters at least")
        .test("passwords-match", "Passwords must match", (value) => {
          return password.value === value;
        })
    );

    const onSubmit = handleSubmit(async (values) => {
      const { email, password } = values;
      const response = await store.dispatch("auth/register", values);
      const { status, data } = response;
      if (status !== 201) {
        const { id, message } = data;
        error.id = id;
        error.message = message;
        return;
      }
      await store.dispatch("auth/login", { email, password });
      router.push("/");
    });

    return {
      name,
      nError,
      nBlur,
      email,
      eError,
      eBlur,
      password,
      pError,
      pBlur,
      passwordConfirmation,
      pcError,
      pcBlur,
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
  background-color: gray;
  height: 1px;
  margin: 32px 0 0;
  text-align: center;

  span {
    position: relative;
    padding: 0 2rem;
    top: -0.9rem;
    font-size: 1.1rem;
    color: gray;
    background: #ffffff;
  }
}
</style>
