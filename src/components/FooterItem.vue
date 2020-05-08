<template>
  <footer class="footer">
    <img
      src="/images/gray_logo.svg"
      alt="テイクアウトとデリバリー情報"
      class="footer__logo"
    />
  </footer>
</template>

<script>
export default {
  name: "FooterItem"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.footer {
  padding: 4.3rem 0 3.7rem;
  text-align: center;
  border-top: 1rem solid $mainColor;
  background: $white;
  &__logo {
    margin: 0 0 2.9rem;
    width: 150px;
    height: auto;
  }
  &__icons {
    display: flex;
    justify-content: center;
    .icon {
      display: block;
      margin: 0 1.5rem;
      path {
        fill: $gray02;
      }
    }
  }
}
</style>
