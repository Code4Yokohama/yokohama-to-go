<template>
  <article class="shop">
    <h2 class="shop__name">
      <router-link
        v-if="$route.name !== 'shop_show'"
        :to="{ name: 'shop_show', params: { name: name } }"
        :title="name + 'の詳細ページに移動します'"
        class="shop_link"
      >
        {{ name }}
      </router-link>
      <span v-else>{{ name }}</span>
    </h2>
    <div class="shop__tags">
      <div v-if="takeout" class="tag take_out">TAKE OUT</div>
      <div v-if="delivery" class="tag delivery">DELIVERY</div>
    </div>
    <div class="shop__address">{{ address }}</div>
    <div class="shop__time">
      <p v-if="shopHour" class="open">営業時間：{{ shopHour }}</p>
      <p v-if="shopHoliday" class="shopHoliday">休業日：{{ shopHoliday }}</p>
    </div>
    <div class="shop__thumbnail">
      <img
        v-if="images[0]"
        :src="images[0]"
        :alt="'画像：' + name"
        class="image"
      />
      <img
        v-else
        :src="'/images/placeholder' + category + '.png'"
        class="image"
      />
    </div>
    <div class="shop__description">{{ description }}</div>
    <div class="shop__icons">
      <a
        v-if="website"
        :href="website"
        target="_blank"
        class="icon"
        :title="name + 'のホームページを新規ウィンドウで開きます'"
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <p>Website</p>
      </a>
      <div v-if="map" class="icon">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
          />
        </svg>
        <p>Map</p>
      </div>
      <div v-if="phone" class="icon">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
          />
        </svg>
        <a :href="'tel:' + phone">
          {{ reshapePhoneChar(phone) }}
        </a>
      </div>
      <div class="icon share" @click="handleShareModal">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
          />
        </svg>
        <p>Share</p>
      </div>
    </div>
    <div v-if="menu" class="shop__menu">
      <div class="menu_list" :class="!isMenu && menu.length > 50 ? 'hide' : ''">
        {{ menu }}<br />
        {{ discount }}
      </div>
      <div
        v-if="menu.length > 50"
        class="toggle_button"
        :class="isMenu ? 'active' : ''"
        @click="handleMenu"
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.36,10.22L13.16,10C12.38,9.23 12.38,7.97 13.16,7.19L17.5,2.82L18.43,3.74L15.19,7L16.15,7.94L19.39,4.69L20.31,5.61L17.06,8.85L18,9.81L21.26,6.56L22.18,7.5L17.81,11.84C17.03,12.62 15.77,12.62 15,11.84L14.78,11.64L13.41,13Z"
          />
        </svg>
        対象メニューを{{ isMenu ? "隠す" : "もっと見る" }}
      </div>
    </div>
    <div v-if="isShareModal" class="share_modal" @click.self="handleShareModal">
      <div class="share_modal__inner">
        <div class="share_modal__heading">
          <h2>Share</h2>
          <p>「{{ name }}」の情報をみんなにお勧めしましょう！</p>
        </div>
        <div class="share_modal__icons">
          <div class="icon">
            <a @click.prevent="shareFacebook(name)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                />
              </svg>
            </a>
          </div>
          <div class="icon">
            <a @click.prevent="shareTwitter(name)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ShopItem",
  props: {
    name: { type: String, default: "" },
    category: { type: String, default: "2401" },
    takeout: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    address: { type: String, default: "" },
    shopHour: { type: String, default: "" },
    shopHoliday: { type: String, default: "" },
    images: { type: Array, default: () => [] },
    description: { type: String, default: "" },
    website: { type: String, default: "" },
    map: { type: String, default: "" },
    phone: { type: String, default: "" },
    menu: { type: String, default: "" },
    discount: { type: String, default: "" },
    htmlFromGoogleMap: { type: String, default: "" },
    mediaLinkFromGoogleMap: { type: String, default: "" }
  },
  data: () => ({
    isShareModal: false,
    isMenu: false,
    palaceholderNum: "",
    twitterUrl: "",
    facebookUrl: ""
  }),
  created() {
    if (this.$route.name === "shop_show") {
      this.isMenu = true;
    }
  },
  methods: {
    handleMenu() {
      this.isMenu = !this.isMenu;
    },
    handleShareModal() {
      this.isShareModal = !this.isShareModal;
    },
    shareTwitter(name) {
      const url = this.$router.resolve({
        name: "shop_show",
        params: {
          name: name
        }
      }).href;
      const targetUrl =
        "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(location.origin + url);
      window.open(targetUrl, "Twitter", "toolbar=yes");
    },
    reshapePhoneChar(num) {
      const re = num.match(/(045)([0-9]{3})([0-9]{4})/);
      if (re) {
        num = re[1] + "-" + re[2] + "-" + re[3];
      }
      return num;
    },
    shareFacebook(name) {
      const appID = process.env.VUE_APP_FACEBOOK_APP_ID;
      const url = this.$router.resolve({
        name: "shop_show",
        params: {
          name: name
        }
      }).href;
      const targetUrl =
        "https://www.facebook.com/dialog/share?app_id=" +
        appID +
        "&href=" +
        encodeURIComponent(location.origin + url);
      window.open(targetUrl, "Twitter", "toolbar=yes");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.shop {
  margin: 0 0 11.8rem;
  &__name {
    font-size: 2.4rem;
    font-weight: 700;
    padding: 0 0 1rem;
    margin: 0 0 1.5rem;
    border-bottom: 0.1rem solid $gray01;
    a {
      color: $gray02;
    }
  }
  &__tags {
    display: flex;
    margin: 0 0 0.9rem;
    .tag {
      font-size: 1rem;
      font-weight: 700;
      color: $white;
      padding: 0 1.1rem;
      margin: 0 1rem 0 0;
      line-height: 2rem;
      border-radius: 0.3rem;
      &.take_out {
        background: $yellow01;
      }
      &.delivery {
        background: $red01;
      }
    }
  }
  &__time {
    font-size: 1.2rem;
    margin: 0 0 2.5rem;
    .open,
    .shopHoliday {
      display: inline-block;
      vertical-align: middle;
    }
    .open {
      margin: 0 1rem 0 0;
    }
  }
  &__thumbnail {
    position: relative;
    width: 100%;
    padding: 66.8% 0 0;
    margin: 0 0 2.4rem;
    overflow: hidden;
    .image {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }
  &__description {
    margin: 0 0 6rem;
  }
  &__icons {
    display: flex;
    justify-content: center;
    margin: 0 0 2.8rem;
    .icon {
      font-size: 1.2rem;
      color: $mainColor;
      margin: 0 2.5rem 0 0;
      text-align: center;
      p {
        margin: 1.6rem 0 0;
      }
      a {
        display: block;
        color: $mainColor;
        margin: 1.6rem 0 0;
      }
      &.share {
        cursor: pointer;
      }
    }
  }
  &__menu {
    .toggle_button {
      position: relative;
      font-size: 1.2rem;
      color: $mainColor;
      cursor: pointer;
      text-align: center;
      line-height: 3rem;
      border-radius: 1.5rem;
      border: 0.1rem solid $mainColor;
      svg {
        display: inline-block;
        vertical-align: middle;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0.8rem;
        right: 1rem;
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        transform: rotate(45deg);
        border: {
          right: 0.2rem solid $mainColor;
          bottom: 0.2rem solid $mainColor;
        }
      }
      &.active {
        &:after {
          top: 1.2rem;
          border: {
            top: 0.2rem solid $mainColor;
            right: none;
            bottom: none;
            left: 0.2rem solid $mainColor;
          }
        }
      }
    }
    .menu_list {
      position: relative;
      padding: 2rem 1.5rem 1.5rem;
      line-height: 2.4rem;
      overflow-y: hidden;
      &.hide {
        height: 10rem;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255, 255, 255, 0), $white);
        }
      }
    }
  }
  .share_modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    &__inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      padding: 2rem;
      transform: translate(-50%, -50%);
      border-radius: 0.8rem;
      background: $white;
    }
    &__heading {
      margin: 0 0 1.6rem;
      text-align: center;
      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: solid 1px #ccc;
      }
    }
    &__icons {
      display: flex;
      justify-content: center;
      .icon {
        margin: 0 1rem;
        a {
          color: $gray02;
        }
      }
    }
  }
  @include mediaMobile {
    &__name,
    &__tags,
    &__address,
    &__time,
    &__description,
    &__icons,
    &__menu {
      margin: {
        right: 1.5rem;
        left: 1.5rem;
      }
    }
    .share_modal {
      &__inner {
        width: calc(100% - 3rem);
      }
    }
  }
}
</style>
