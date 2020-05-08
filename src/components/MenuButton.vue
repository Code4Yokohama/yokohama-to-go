<template>
  <div class="menu_button" @click="$emit('openMenu')" />
</template>

<script>
export default {
  name: "MenuButton"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.menu_button {
  position: fixed;
  top: 2rem;
  left: 3rem;
  z-index: 20;
  width: 1.8rem;
  height: 1.2rem;
  cursor: pointer;
  border: {
    top: 0.2rem solid $gray02;
    bottom: 0.2rem solid $gray02;
  }
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 100%;
    height: 0.2rem;
    transform: translateY(-50%);
    background: $gray02;
  }
}
</style>
