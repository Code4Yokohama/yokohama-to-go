<template>
  <button class="return_button" @click="returnPage">
    戻る
  </button>
</template>

<script>
export default {
  name: "ReturnButton",
  methods: {
    returnPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.return_button {
  font-size: 1.6rem;
  color: $gray02;
  cursor: pointer;
  padding: 0;
  margin: 0 0 3rem;
  border: none;
  background: none;
  &:before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
    border: {
      bottom: 0.1rem solid $gray02;
      left: 0.1rem solid $gray02;
    }
  }
  @include mediaMobile {
    margin: 0 1.5rem 3rem;
  }
}
</style>
