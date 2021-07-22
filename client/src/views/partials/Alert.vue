<template>
  <div class="row">
    <i class="material-icons left">error</i>{{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped></style>
