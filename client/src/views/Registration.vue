<template>
  <div>
    <div class="row">
      <h4>Sign Up</h4>
      <h6><router-link to="/login">/ Sign In</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent>
        <div class="input-field">
          <input
            placeholder="Write first name..."
            id="first_name"
            type="text"
            class="validate"
          />
          <label for="first_name">First Name</label>
        </div>

        <div class="input-field">
          <input
            placeholder="Write email..."
            id="email"
            type="email"
            class="validate"
          />
          <label for="email">Email</label>
        </div>

        <div class="input-field">
          <input
            placeholder="Write password..."
            id="password"
            type="password"
            class="validate"
          />
          <label for="password">Password</label>
        </div>

        <div class="input-field">
          <input
            placeholder="Repeat password..."
            id="repeat_password"
            type="password"
            class="validate"
          />
          <label for="repeat_password">Repeat Password</label>
        </div>

        <div class="row">
          <button class="btn waves-effect waves-light btn-space col s12" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn-space {
  margin-right: 0.7rem;
}
</style>
