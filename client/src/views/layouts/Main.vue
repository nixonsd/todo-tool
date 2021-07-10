<template>
  <div>
    <app-loader class="app-loader white" />
    <div v-cloak>
      <app-navbar />
      <div class="container">
        <router-view />
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
</style>
