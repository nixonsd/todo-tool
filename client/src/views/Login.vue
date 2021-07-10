<template>
  <div>
    <div class="row">
      <h4>Sign In</h4>
      <h6><router-link to="/registration">/ Sign Up</router-link></h6>
    </div>
    <div class="row">
      <form method="POST" @submit.prevent>
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

        <div class="row">
          <label>
            <input type="checkbox" class="filled-in" checked="checked" />
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
export default {};
</script>

<style lang="scss" scoped>
.btn-space {
  margin-right: 0.7rem;
}
</style>
