<template>
  <div class="home">
    <div
      class="home__left"
      :class="$store.state.displayType === 'list' ? 'hide' : ''"
    >
      <div class="page_heading">
        <router-link :to="{ name: 'Home' }" title="TOPページに移動します">
          <main-banner-svg />
        </router-link>
        <h1 class="heading">{{ headerTitle }}</h1>
      </div>
      <search-item v-if="showSearch" />
      <div class="inner">
        <div
          v-for="shop in filteredShops"
          :id="trimURI(shop['@id'])"
          :key="shop['@id']"
          class="shop_wrapper"
          @click="handleShopPoint(shop.name)"
        >
          <shop-item :shop="shop" />
        </div>
      </div>
    </div>
    <div v-if="$store.state.displayType === 'list'" class="home__right">
      <GmapMap
        v-if="currentLocation"
        ref="mapRef"
        :center="currentLocation"
        :zoom="12"
        :options="{ draggableCursor: 'default' }"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          v-for="(shop, index) in mapPins"
          :key="index"
          :position="{
            lat: Number(shop.latitude),
            lng: Number(shop.longitude)
          }"
          :icon="{
            url: '/images/active_pin.png',
            scaledSize: { width: 50, height: 50, f: 'px', b: 'px' }
          }"
          :z-index="shop.zindex"
          :animation="shop.animation"
          @click="toggleInfoWindow(shop, index)"
        />
        <GmapInfoWindow
          :position="infoWindowPosition"
          :opened="infoWindowOpen"
          :options="{
            pixelOffset: {
              width: 0,
              height: -43 // ピンの高さ分
            }
          }"
          @closeclick="infoWindowOpen = false"
        >
          <router-link
            :to="{ name: 'shop_show', params: { name: shopName } }"
            class="map_window_inner"
          >
            {{ shopName }}
          </router-link>
        </GmapInfoWindow>
      </GmapMap>
      <div v-if="notMapData" class="not_map_pin">{{ notMapData }}</div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from "vue-scrollto";
import ShopItem from "../components/ShopItem";
import SearchItem from "../components/SearchItem";
import MainBannerSvg from "../components/MainBannerSvg";

export default {
  name: "Home",
  components: {
    MainBannerSvg,
    SearchItem,
    ShopItem
  },
  data: () => ({
    showMap: true,
    showSearch: false,
    currentLocation: null,
    shops: [],
    infoWindowPosition: {
      lat: 0,
      lng: 0
    },
    infoWindowOpen: false,
    shopName: "",
    currentShopId: "",
    isMobile: false,
    notMapData: false,
    mapPins: null,
    areaCenter: {
      ["市が尾＆藤が丘"]: {
        lat: 35.545578,
        lng: 139.534954
      },
      ["あざみ野"]: {
        lat: 35.568663,
        lng: 139.553451
      },
      ["奈良＆鴨志田"]: {
        lat: 35.562884,
        lng: 139.490428
      },
      ["青葉台"]: {
        lat: 35.543035,
        lng: 139.51674
      },
      ["たまプラーザ"]: {
        lat: 35.577541,
        lng: 139.558397
      },
      ["青葉区"]: {
        lat: 35.552975,
        lng: 139.536922
      },
      ["神奈川区"]: {
        lat: 35.477414,
        lng: 139.629113
      },
      ["金沢区"]: {
        lat: 35.33814,
        lng: 139.624496
      },
      ["中区"]: {
        lat: 35.444759,
        lng: 139.642172
      },
      ["戸塚区"]: {
        lat: 35.400032,
        lng: 139.533476
      },
      ["鶴見区"]: {
        lat: 35.508482,
        lng: 139.682424
      },
      ["港北区"]: {
        lat: 35.519044,
        lng: 139.633067
      },
      ["保土ヶ谷区"]: {
        lat: 35.460017,
        lng: 139.595996
      },
      ["西区"]: {
        lat: 35.453565,
        lng: 139.616815
      },
      ["南区"]: {
        lat: 35.43441,
        lng: 139.627633
      },
      ["磯子区"]: {
        lat: 35.402424,
        lng: 139.618539
      },
      ["栄区"]: {
        lat: 35.364672,
        lng: 139.553806
      },
      ["港南区"]: {
        lat: 35.400991,
        lng: 139.592535
      },
      ["都筑区"]: {
        lat: 35.544868,
        lng: 139.570612
      },
      ["瀬谷区"]: {
        lat: 35.466246,
        lng: 139.498819
      },
      ["旭区"]: {
        lat: 35.474813,
        lng: 139.544815
      },
      ["泉区"]: {
        lat: 35.417832,
        lng: 139.488696
      },
      ["緑区"]: {
        lat: 35.512396,
        lng: 139.537811
      }
    }
  }),
  computed: {
    headerTitle: function() {
      if (!this.$route.params.area) return "横浜市";
      return this.$route.params.area;
    },
    filteredShops: function() {
      const target = this.$route.params.area;
      let shopsArray = [];
      if (target) {
        if (this.$route.name === "area_index") {
          shopsArray = this.shops.filter(v => {
            return v.address && v.address.addressLocality === target;
          });
        } else if (this.$route.name === "area_served_index") {
          shopsArray = this.shops.filter(v => {
            return v.areaServed === target;
          });
        }
      } else {
        shopsArray = this.shops;
      }
      if (!this.$store.state.keyword) return shopsArray;
      return shopsArray.filter(v => {
        return v.name.indexOf(this.$store.state.keyword) > -1;
      });
    },
    filteredShopsForMap: function() {
      return this.filteredShops.filter(v => {
        return v.latitude && v.longitude;
      });
    }
  },
  watch: {
    $route: {
      handler: function(value) {
        console.log(value);
        this.mapPins = this.filteredShopsForMap;
        console.log("beforeUpdate");
        const firstShop = this.filteredShops.find(v => v.latitude);
        if (this.$route.name === "Home") {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            },
            () => {
              if (firstShop && firstShop.latitude) {
                this.currentLocation = {
                  lat: Number(firstShop.latitude),
                  lng: Number(firstShop.longitude)
                };
              }
            }
          );
        }
        if (this.$route.params.area) {
          let getArea = this.areaCenter[this.$route.params.area];
          this.currentLocation = {
            lat: getArea.lat,
            lng: getArea.lng
          };
        }
      },
      immediate: true
    }
  },
  async created() {
    if (window.innerWidth <= 767) {
      this.showMap = false;
      this.showSearch = true;
      this.isMobile = true;
    } else {
      this.$store.dispatch("setDisplayType", "list");
    }
    const shops = await this.$http.get("data/shops.json");
    this.shops = shops.data;

    const sortByDistance = require("sort-by-distance");
    setTimeout(() => {
      this.$refs.mapRef.$on("center_changed", e => {
        console.log("centerChenged");
        let origin = {
          latitude: e.lat(),
          longitude: e.lng()
        };
        const option = {
          yName: "latitude",
          xName: "longitude"
        };
        this.mapPins = sortByDistance(
          origin,
          this.filteredShopsForMap,
          option
        ).splice(0, 10);
      });
    }, 100);
  },
  methods: {
    trimURI(str) {
      return str.replace(/\/|:|\.|-/gi, "");
    },
    toggleInfoWindow(shop) {
      this.shopName = shop.name;
      this.infoWindowPosition = {
        lat: Number(shop.latitude),
        lng: Number(shop.longitude)
      };

      if (this.currentShopId === shop["@id"]) {
        this.infoWindowOpen = !this.infoWindowOpen;
      } else {
        this.infoWindowOpen = true;
        this.currentShopId = shop["@id"];
        VueScrollTo.scrollTo("#" + this.trimURI(shop["@id"]));
      }
    },
    handleShopPoint(name) {
      this.shops.map(function(v) {
        v.zindex = null;
        v.animation = null;
      });
      let centerPoint = null;
      let notMapData = "";
      this.shops.map(function(shop) {
        if (shop.name === name) {
          if (shop.latitude && shop.longitude) {
            shop.animation = 1;
            shop.zindex = 100;
            centerPoint = {
              lat: shop.latitude,
              lng: shop.longitude
            };
            notMapData = false;
          } else {
            shop.zindex = null;
            shop.animation = null;
            centerPoint = {
              lat: Number(shop.latitude),
              lng: Number(shop.longitude)
            };
            notMapData = shop.name + "の地図情報はありません";
          }
        }
      });
      this.currentLocation = centerPoint;
      this.notMapData = notMapData;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";

@include mediaMobile {
  .home {
    .search {
      margin: 0 0 3.3rem;

      &__inner {
        height: 5rem;

        &.input_active {
          display: none;
        }
      }

      &__input {
        position: static;
        width: 100%;
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";

.home {
  display: flex;

  &__left,
  &__right {
    width: 50%;
  }

  &__left {
    height: 100vh;
    overflow-y: auto;

    .page_heading {
      position: relative;
      z-index: 15;
      width: 100%;
      margin: 0 auto 5.3rem;
      text-align: center;
      background: $white;

      .heading {
        font-size: 3.6rem;
        margin: 7.1rem 0 0;
      }
    }

    .inner {
      margin: 0 auto;
    }

    .shop_wrapper {
      cursor: pointer;
    }
  }

  &__right {
    position: relative;
    height: 100vh;
    padding: 5.1rem 0 0;

    .map_window_inner {
      color: $gray02;
    }

    .not_map_pin {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 2rem;
      transform: translate(-50%, -50%);
      animation-name: fadeOut;
      animation-duration: 5s;
      animation-fill-mode: forwards;
      border-radius: 0.4rem;
      background: $white;
    }
  }

  @keyframes fadeOut {
    0% {
      display: block;
      opacity: 100;
    }
    80% {
      opacity: 100;
    }
    100% {
      display: none;
      opacity: 0;
      z-index: -1;
    }
  }
  @include mediaMobile {
    flex-direction: column;
    &__left {
      width: 100%;
      order: 1;

      .page_heading {
        .heading {
          font-size: 2.8rem;
          margin: 2.1rem 0 0;
        }
      }

      .inner {
        width: 100%;
      }

      &.hide {
        display: none;
      }
    }
    &__right {
      width: 100%;
      order: 0;
      padding: 3.3rem 0 0;
    }
  }
  @include mediaTablet {
    &__left {
      .inner {
        width: 100%;
        padding: 0 1.5rem;
      }
    }
  }
  @include mediaPc {
    &__left {
      .inner {
        width: 62.4%;
      }
    }
  }
}
</style>
