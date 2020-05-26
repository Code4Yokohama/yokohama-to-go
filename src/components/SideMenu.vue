<template>
  <div class="side_menu" @click="$emit('closeMenu')">
    <nav class="side_menu__inner">
      <div class="side_menu__close_button" />
      <div class="side_menu__heading">
        <router-link :to="{ name: 'Home' }" title="TOPページに移動します">
          <img
            src="/images/white_logo.svg"
            alt="テイクアウトとデリバリー情報"
          />
        </router-link>
        <p v-if="$route.name === 'area_index'" class="district">
          {{ $route.params["name"] }}
        </p>
      </div>
      <div v-if="isMobile" class="side_menu__section display">
        <div class="display_icon" @click="handleDisplay('map')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
            />
          </svg>
          <p>一覧表示</p>
        </div>
        <div class="display_icon" @click="handleDisplay('list')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
            />
          </svg>
          <p>地図表示</p>
        </div>
      </div>
      <section class="side_menu__section information">
        <h3 class="section_heading">情報掲載は無料です</h3>
        <router-link
          :to="{ name: 'published' }"
          title="情報掲載についてに移動します"
          class="square_button"
          >情報掲載方法</router-link
        >
      </section>
      <section class="side_menu__section other_area">
        <h3 class="section_heading">エリア</h3>
        <router-link
          v-for="(point, i) in area"
          :key="i"
          :to="{ name: 'area_index', params: { name: point } }"
          :title="'エリア：' + point + 'に移動します'"
        >
          {{ point }}
        </router-link>
      </section>
      <section class="side_menu__section share">
        <h3 class="section_heading">シェア</h3>
        <div class="icons">
          <a
            :href="facebookUrl"
            target="_blank"
            title="Facebookでこのサイトをシェアします（新規ウィンドウで開きます）"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
              />
            </svg>
          </a>
          <a
            :href="twitterUrl"
            target="_blank"
            title="Twitterでこのサイトをシェアします（新規ウィンドウで開きます）"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
              />
            </svg>
          </a>
        </div>
      </section>
      <section class="side_menu__section about">
        <h3 class="section_heading">このサイトについて</h3>
        <div class="text">
          <p>
            このサイトは地域経済に対するCOVID-19の影響を少しでも緩和させることを目的として、地域の商店会、コード・フォー・ヨコハマ、その他の有志によって公開運営されています。
          </p>
          <p>
            掲載情報は情報提供者から提供されたものです。Code for
            YOKOHAMAでは情報の正確さや各店舗のサービス内容の品質等保証いたしません。ご利用の際は各自の責任でお願いします。
          </p>
          <p>
            サイトに不備、情報の間違いなど見つけた方はメールにてご連絡ください。
          </p>
          <p>ご連絡先メールアドレス：info@code4.yokohama</p>
        </div>
      </section>
      <section class="supported">
        <p class="text">Supported by</p>
        <a
          href="https://code4.yokohama/"
          target="_blank"
          title="code for YOKOHAMAのホームページを新規ウィンドウで開きます"
        >
          <img
            src="/images/code_for_yokohama_logo.png"
            alt="code for YOKOHAMA"
          />
        </a>
      </section>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  data: () => ({
    area: [
      "青葉区",
      "神奈川区",
      "金沢区",
      "中区",
      "戸塚区",
      "鶴見区",
      "港北区",
      "保土ケ谷区",
      "西区",
      "南区",
      "磯子区",
      "栄区",
      "港南区",
      "都筑区",
      "瀬谷区",
      "旭区",
      "泉区",
      "緑区"
    ],
    twitterUrl: "",
    facebookUrl: "",
    isMobile: false
  }),
  created() {
    if (window.innerWidth <= 767) {
      this.isMobile = true;
    }

    this.twitterUrl =
      "https://twitter.com/intent/tweet?url=" +
      encodeURIComponent(location.origin);

    this.facebookUrl =
      "https://www.facebook.com/dialog/share?app_id=" +
      process.env.VUE_APP_FACEBOOK_APP_ID +
      "&display=popup&href=" +
      encodeURIComponent(location.origin);
  },
  methods: {
    handleDisplay(type) {
      this.$store.dispatch("setDisplayType", type);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.side_menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  .section_heading {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 2.4rem;
  }
  &__inner {
    position: relative;
    width: 18.5%;
    height: 100%;
    color: $white;
    padding: 7.8rem 5rem;
    text-align: center;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.65);
  }
  &__close_button {
    position: absolute;
    top: 3.7rem;
    left: 2rem;
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    transform: rotate(45deg);
    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      background: $white;
    }
    &:before {
      width: 100%;
      height: 0.2rem;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    &:after {
      width: 0.2rem;
      height: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &__heading {
    margin: 0 0 3.3rem;
    .district {
      font-size: 2.8rem;
      margin: 3.7rem 0 0;
    }
  }
  &__section {
    margin: 0 0 4.4rem;
    &.information {
      .section_heading {
        margin: 0 0 2.6rem;
      }
      .square_button {
        display: block;
        color: $white;
        line-height: 4rem;
        border: 0.1rem solid $gray02;
      }
    }
    &.other_area {
      .section_heading {
        margin: 0 0 1.8rem;
      }
      a {
        display: block;
        color: $white;
        line-height: 2.4rem;
      }
    }
    &.share {
      .section_heading {
        margin: 0 0 2.2rem;
      }
      .icons {
        a {
          display: inline-block;
          margin: 0 1.7rem;
          vertical-align: middle;
          path {
            fill: $white;
          }
        }
      }
    }
    &.about {
      .section_heading {
        margin: 0 0 2.6rem;
      }
      .text {
        text-align: left;
        p {
          margin-bottom: 1.5rem;
        }
      }
    }
  }
  .supported {
    .text {
      margin: 0 0 2.4rem;
    }
  }
  @include mediaMobile {
    &__inner {
      width: 100%;
    }
    &__heading {
      margin: 0 0 4.7rem;
      img {
        width: 64.7%;
      }
    }
    &__section {
      &.display {
        display: flex;
        justify-content: center;
        .display_icon {
          margin: 0 1.5rem;
          text-align: center;
        }
        svg {
          display: block;
          margin: 0 auto 3rem;
        }
      }
    }
  }
  @include mediaTablet {
    &__inner {
      width: 50%;
    }
    &__heading {
      img {
        width: 64.7%;
      }
    }
  }
  @include mediaPc {
    &__inner {
      min-width: 35.7rem;
    }
  }
}
</style>
