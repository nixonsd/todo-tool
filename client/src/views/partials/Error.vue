<template>
  <div class="row">
    <div class="card red white-text">
      <div class="card-content">
        <i class="material-icons left">error</i>{{ title }}
      </div>
    </div>
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
