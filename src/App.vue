<template>
  <div id="app">
    <header-item />
    <menu-button @openMenu="handleMenu" />
    <side-menu v-if="showMenu" @closeMenu="handleMenu" />
    <main class="main">
      <router-view />
    </main>
    <footer-item
      v-if="$route.name !== 'Home' && $route.name !== 'area_index'"
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/style.scss";
@import "https://fonts.googleapis.com/css?family=Noto+Sans+JP";
html {
  font-size: 62.5%;
}
body {
  position: relative;
  height: 100vh;
  font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Noto Sans JP",
    "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
  font-size: 1.4rem;
  color: $gray02;
  margin: 0;
  & * {
    box-sizing: border-box;
  }
}
@for $i from 1 through 6 {
  h#{$i} {
    font-size: 1.6rem;
    font-weight: 100;
    margin: 0;
  }
}
.main {
  display: block;
  min-height: calc(100vh - 26.3rem);
}
img {
  max-width: 100%;
  height: auto;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
  opacity: 1;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.6;
  }
}
button {
  font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Noto Sans JP",
    "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
}
input,
textarea {
  @include mediaMobile {
    font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Noto Sans JP",
      "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
    font-size: 16px;
  }
}
button {
  outline: none;
}
</style>
<script>
import HeaderItem from "./components/HeaderItem";
import FooterItem from "./components/FooterItem";
import SideMenu from "./components/SideMenu";
import MenuButton from "./components/MenuButton";
export default {
  components: {
    MenuButton,
    SideMenu,
    FooterItem,
    HeaderItem
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    handleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
