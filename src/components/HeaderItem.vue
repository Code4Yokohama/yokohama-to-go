<template>
  <header class="header">
    <div class="header__title">
      <router-link :to="{ name: 'Home' }" title="TOPページに移動します">
        <header-logo-svg />
      </router-link>
      <p
        v-if="$route.params['name'] && $route.name !== 'shop_show'"
        class="header__district"
      >
        {{ $route.params["name"] }}
      </p>
    </div>
    <search-item
      v-if="$route.name === 'Home' || $route.name === 'area_index'"
    />
  </header>
</template>

<script>
import SearchItem from "./SearchItem";
import HeaderLogoSvg from "./HeaderLogoSvg";
export default {
  name: "HeaderItem",
  components: {
    HeaderLogoSvg,
    SearchItem
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
@include mediaMobile {
  .header {
    .search {
      display: inline-block;
      &__text {
        display: none;
      }
      &__input {
        width: 100vw;
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.header {
  position: fixed;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 0.1rem solid $gray01;
  background: $white;
  &__district {
    display: inline-block;
    vertical-align: middle;
  }
  &__district {
    font-size: 2rem;
  }
  @include mediaMobile {
    justify-content: flex-end;
    height: 5.1rem;
    &__title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
