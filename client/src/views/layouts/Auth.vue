<template>
  <div>
    <app-loader class="app-loader white" />
    <div class="backgorund-container red darken-1" v-cloak></div>
    <div class="auth-container" v-cloak>
      <div class="container container-bar">
        <div class="row">
          <router-link to="/" class="brand-logo image-logo white-text">
            <img class="responsive-img" src="@/assets/logo.svg" alt="Logo" />
            <span class="cursor">┃</span>
            <span class="text-logo">TodoTool</span>
          </router-link>
        </div>
        <div class="row">
          <div class="card-panel col s12 m8 offset-m2">
            <div class="card-content col s10 offset-s1">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  mounted: () => {
    setTimeout(() => {
      $(".app-loader").fadeOut().delay("slow");
    }, 1000);
  },

  data: () => ({}),
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

.app-loader {
  /* Position Set */
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  z-index: 1000;

  /* FlexBox */
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
}

.backgorund-container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.auth-container {
  /* Position */
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem 0;

  /* FlexBox */
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.image-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-size: 1.4rem;
  user-select: none;

  img {
    width: 3rem;
  }

  .text-logo {
    font-size: 1.5rem;
  }
}

.container-bar {
  padding: 1rem 0;
}

.cursor {
  opacity: 1;
  font-weight: 200;
  /// animation: blink 0.7s infinite;
}
</style>
