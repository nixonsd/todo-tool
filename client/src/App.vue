<template>
  <div>
    <component :is="`${layout}-layout`" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Main from "./views/layouts/Main.vue";
import Empty from "./views/layouts/Empty.vue";

export default {
  data: () => ({
    layout: computed(() => useRoute().meta.layout),
  }),
  components: {
    "main-layout": Main,
    "empty-layout": Empty,
  },
};
</script>

<style lang="scss" scoped></style>
