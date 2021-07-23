<template>
  <div>
    <div class="row">
      <h4>New password</h4>
      <h6><router-link to="/login">/ Sign In</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent="onSubmit" novalidate>
        <div class="row">
          <div class="input-field col s12">
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

          <div class="input-field col s12">
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
            <span
              v-if="pcError"
              class="helper-text"
              :data-error="pcError"
            ></span>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button
              class="btn waves-effect waves-light btn-space col s6 m4"
              type="submit"
              :disabled="isSubmitting"
            >
              Save Password
            </button>
          </div>
        </div>
      </form>
      <component
        class="red-text"
        :is="ErrorProp"
        :title="error.message"
        v-if="error.id === 'restore_failed'"
      />
      <component
        class="green-text"
        :is="ErrorProp"
        :title="error.message"
        v-else-if="error.id === 'restore_succeed'"
      />
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Alert from "./partials/Alert.vue";

export default {
  components: { Alert },
  setup() {
    // Variables
    const ErrorProp = "Alert";
    let error = { id: null, message: null };

    // Initial values
    const formValues = {
      password: "",
      passwordConfirmation: "",
    };

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const { handleSubmit, isSubmitting } = useForm({
      initialValues: formValues,
    });

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

    const onSubmit = handleSubmit(async ({ password }) => {
      const response = await store.dispatch("auth/restorePassword", {
        resetToken: route.params.resetToken,
        password,
      });
      const { data } = response;
      const { id, message } = data;
      error.id = id;
      error.message = message;
      router.push("/");
    });

    return {
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

<style lang="scss" scoped></style>
