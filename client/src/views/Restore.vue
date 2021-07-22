<template>
  <div>
    <div class="row">
      <h4>Restore password</h4>
      <h6><router-link to="/login">/ Sign In</router-link></h6>
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
// import { useRouter } from "vue-router";
import Alert from "./partials/Alert.vue";
export default {
  components: { Alert },
  setup() {
    // Variables
    const ErrorProp = "Alert";
    let error = { id: null, message: null };

    const store = useStore();
    // const router = useRouter();

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

    const onSubmit = handleSubmit(async (values) => {
      const response = await store.dispatch("auth/restoreRequest", values);
      const { data } = response;
      const { id, message } = data;
      error.id = id;
      error.message = message;
    });

    return {
      email,
      eError,
      eBlur,
      error,
      handleSubmit,
      isSubmitting,
      onSubmit,
      ErrorProp,
    };
  },
};
</script>

<style lang="scss" scoped></style>
