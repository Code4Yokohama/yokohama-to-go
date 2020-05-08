<template>
  <div class="search">
    <div v-if="isInput" class="search__input">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        />
      </svg>
      <input
        v-model.lazy="keyword"
        type="search"
        class="input"
        placeholder="キーワード"
      />
      <button class="close" @click="handleSearchInput" />
    </div>
    <div class="search__inner" :class="isInput ? 'input_active' : ''">
      <button class="search__icon" @click="handleSearchInput">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
      </button>
      <button v-if="isMobile" class="search__icon">
        <svg
          v-if="$store.state.displayType === 'map'"
          style="width:24px;height:24px"
          viewBox="0 0 24 24"
          @click="handleDisplay('list')"
        >
          <path
            fill="currentColor"
            d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
          />
        </svg>
        <svg
          v-else
          style="width:24px;height:24px"
          viewBox="0 0 24 24"
          @click="handleDisplay('map')"
        >
          <path
            fill="currentColor"
            d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  data: () => ({
    isMap: false,
    isInput: false,
    isMobile: false
  }),
  computed: {
    keyword: {
      get: function() {
        return this.$store.state.keyword;
      },
      set: function(value) {
        this.$store.dispatch("setKeyword", value);
      }
    }
  },
  created() {
    var windowWidth = window.innerWidth;
    if (windowWidth <= 767) {
      this.isMap = true;
      this.isMobile = true;
    }
  },
  methods: {
    handleSearchInput() {
      this.isInput = !this.isInput;
    },
    handleDisplay(type) {
      this.$store.dispatch("setDisplayType", type);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.search {
  position: relative;
  &__inner {
    display: flex;
    align-items: center;
  }
  &__icon {
    position: relative;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    margin: 0 0 0 2.4rem;
    border-radius: 50%;
    border: none;
    background: $gray01;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    path {
      fill: $gray02;
    }
  }
  &__input {
    position: absolute;
    top: calc(100% + 1rem);
    right: -3rem;
    display: flex;
    align-items: center;
    width: 50vw;
    padding: 0 1.7rem;
    background: $gray01;
    .input {
      width: calc(100% - 5rem);
      height: 5rem;
      outline: none;
      border: none;
      background: none;
      -webkit-appearance: textfield;
    }
    .close {
      position: relative;
      width: 1.8rem;
      height: 1.8rem;
      transform: rotate(45deg);
      border: none;
      background: none;
      &:before,
      &:after {
        content: "";
        position: absolute;
        display: block;
        background: $gray02;
      }
      &:before {
        top: 50%;
        left: 0;
        width: 100%;
        height: 0.2rem;
        transform: translateY(-50%);
      }
      &:after {
        top: 0;
        left: 50%;
        width: 0.2rem;
        height: 100%;
        transform: translateX(-50%);
      }
    }
  }
  @include mediaMobile {
    &__inner {
      justify-content: center;
      //height: 5rem;
    }
    &__icon {
      margin: 0 0 0 0.8rem;
    }
  }
}
</style>
