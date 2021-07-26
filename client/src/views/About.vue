<template>
  <div v-cloak>
    <h1>About</h1>
    <p>
      The application is designed for portfolios. TodoTool is a simple to-do
      list that allows you to conveniently create, modify and compose your own
      lists, available with internal or external authorization. Just sign in to
      your account, add a new task, modify it whether you want, check it and
      delete it.
      <a href="https://github.com/nixonsd/todo-tool#readme">README</a>
    </p>

    <h3>
      Github
      <!-- Place this tag where you want the button to render. -->
      <github-button
        href="https://github.com/nixonsd"
        data-color-scheme="no-preference: light; light: light; dark: light;"
        data-size="large"
        data-show-count="true"
        aria-label="Follow @nixonsd on GitHub"
        >Follow @nixonsd</github-button
      >
    </h3>

    <p>
      Project Link:
      <a href="https://github.com/nixonsd/todo-tool"
        >https://github.com/nixonsd/todo-tool</a
      >
    </p>

    <small>
      Use the materials as you see fit. The logo and images are distributed by
      <a href="https://materializecss.com/">Materialize</a> and
      <a href="https://www.iconfinder.com/">Iconfinder</a> under a free license.
    </small>
  </div>
</template>

<script>
import GithubButton from "vue-github-button";

export default {
  components: {
    GithubButton,
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
</style>
