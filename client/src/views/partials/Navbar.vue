<template>
  <div>
    <nav>
      <div class="nav-wrapper red darken-1">
        <router-link to="/" class="brand-logo image-logo">
          <img class="responsive-img" src="@/assets/logo.svg" alt="Logo" />
          <span class="cursor">┃</span>
          <span>TodoTool</span>
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li>
            <a href="https://github.com/nixonsd/todo-tool"
              ><i class="small material-icons left">insert_link</i>GitHub</a
            >
          </li>
          <li>
            <a class="sidenav-close" href="/" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>

      <ul class="sidenav" id="mobile-demo">
        <li><div class="divider"></div></li>
        <li><a class="subheader">Navigation Bar</a></li>
        <li><router-link class="sidenav-close" to="/">Home</router-link></li>
        <li>
          <router-link class="sidenav-close" to="/about">About</router-link>
        </li>
        <li>
          <a class="sidenav-close" href="#" @click.prevent="logout">Logout</a>
        </li>
        <li><div class="divider"></div></li>
        <li><a class="subheader">Links</a></li>
        <li>
          <a class="sidenav-close" href="https://github.com/nixonsd/todo-tool"
            ><i class="small material-icons left">insert_link</i>GitHub</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import M from "materialize-css";
export default {
  data: () => ({
    store: useStore(),
    router: useRouter(),
  }),
  mounted: () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  },
  methods: {
    async logout() {
      this.$gAuth.signOut();
      await this.store.dispatch("auth/logout");
      this.router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  padding: 0 2rem;
}

.image-logo {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 1.4rem;
  user-select: none;

  img {
    width: 3rem;
  }
}

.cursor {
  opacity: 1;
  font-weight: 200;
  /// animation: blink 0.7s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
