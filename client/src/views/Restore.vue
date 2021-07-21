<template>
  <div>
    <div class="row">
      <h4>Restore password</h4>
      <h6><router-link to="/login">/ Sign In</router-link></h6>
    </div>
    <component
      :is="ErrorProp"
      :title="error.message"
      v-if="error.id !== 'auth_succeed'"
    />
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
        <div class="row">
          <div class="col s12">
            <button
              class="btn waves-effect waves-light btn-space"
              type="submit"
              :disabled="isSubmitting"
            >
              Send Recovery Key
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import Error from "./partials/Error.vue";
export default {
  components: { Error },
  setup() {
    // Variables
    const ErrorProp = "Error";
    const error = { id: "auth_succeed", message: "OK" };

    // Initial values
    const formValues = {
      email: "",
    };

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

    return {
      email,
      eError,
      eBlur,
      error,
      handleSubmit,
      isSubmitting,
      ErrorProp,
    };
  },
};
</script>

<style lang="scss" scoped></style>
