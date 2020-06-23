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
          v-for="shop in currentShops"
          :id="trimURI(shop['@id'])"
          :key="shop['@id']"
          class="shop_wrapper"
          @click="handleShopPoint(shop)"
        >
          <shop-item :shop="shop" />
        </div>
      </div>
    </div>
    <div v-if="$store.state.displayType === 'list'" class="home__right">
      <GmapMap
        v-if="center"
        ref="mapRef"
        :center="center"
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
          :z-index="shop.zIndex"
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
      <div v-if="showNotice" class="not_map_pin">
        {{ `${clickedShop.name}の地図情報はありません` }}
      </div>
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
    center: { lat: 35.465943, lng: 139.622356 }, // 横浜駅
    shops: [],
    infoWindowPosition: {
      lat: 0,
      lng: 0
    },
    infoWindowOpen: false,
    shopName: "",
    currentShopId: "",
    isMobile: false,
    clickedShop: {},
    mapPins: null,
    currentShops: [],
    showNotice: false,
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
      if (target) {
        if (this.$route.name === "area_index") {
          return this.shops.filter(v => {
            return v.address && v.address.addressLocality === target;
          });
        } else if (this.$route.name === "area_served_index") {
          return this.shops.filter(v => {
            return v.areaServed === target;
          });
        }
      }
      return this.shops;
    },
    filteredShopsForMap: function() {
      return this.filteredShops.filter(v => {
        return v.latitude && v.longitude;
      });
    },
    keyword() {
      return this.$store.state.keyword;
    }
  },
  watch: {
    keyword(val) {
      let searchShops = [];
      let searchShopsMap = [];
      if (!val) {
        searchShopsMap = this.filteredShopsForMap;
        searchShops = this.filteredShops;
      } else {
        searchShopsMap = this.filteredShopsForMap.filter(v => {
          return v.name.indexOf(val) > -1;
        });
        searchShops = this.filteredShops.filter(v => {
          return v.name.indexOf(val) > -1;
        });
      }
      this.currentShops = searchShops;
      this.mapPins = searchShopsMap;
    },
    $route: {
      handler: function() {
        this.mapPins = this.filteredShopsForMap;
        this.currentShops = this.filteredShops;
        if (this.$route.name === "Home") {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            },
            () => {
              const firstShop = this.filteredShops.find(v => v.latitude);
              if (firstShop && firstShop.latitude) {
                this.center = {
                  lat: Number(firstShop.latitude),
                  lng: Number(firstShop.longitude)
                };
              }
            }
          );
        }
        if (this.$route.params.area) {
          const getArea = this.areaCenter[this.$route.params.area];
          this.center = {
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

    this.mapPins = this.filteredShopsForMap;
    this.currentShops = this.filteredShops;

    // sort shops
    const sortByDistance = require("sort-by-distance");
    let address_origin = {
      address_latitude: this.center.lat,
      address_longitude: this.center.lng
    };
    const address_option = {
      yName: "address_latitude",
      xName: "address_longitude"
    };
    const origin = {
      latitude: this.center.lat,
      longitude: this.center.lng
    };
    const option = {
      yName: "latitude",
      xName: "longitude"
    };
    this.currentShops = sortByDistance(
      address_origin,
      this.currentShops,
      address_option
    ).splice(0, 100);
    this.mapPins = sortByDistance(
      origin,
      this.filteredShopsForMap,
      option
    ).splice(0, 100);

    // sort shops when move map
    setTimeout(() => {
      this.$refs.mapRef.$on("center_changed", e => {
        let address_origin = {
          address_latitude: e.lat(),
          address_longitude: e.lng()
        };
        const origin = {
          latitude: e.lat(),
          longitude: e.lng()
        };
        this.currentShops = sortByDistance(
          address_origin,
          this.currentShops,
          address_option
        ).splice(0, 100);
        this.mapPins = sortByDistance(
          origin,
          this.filteredShopsForMap,
          option
        ).splice(0, 100);
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
    handleShopPoint(shop) {
      let centerPoint = null;
      this.shops.forEach(v => {
        if (v["@id"] === shop["@id"]) {
          const clickedShop = v;
          if (!clickedShop.latitude && !clickedShop.longitude) {
            centerPoint = {
              lat: Number(clickedShop.address_latitude),
              lng: Number(clickedShop.address_longitude)
            };
            if (this.showNotice) {
              this.showNotice = false;
            }
            this.showNotice = true;
          } else {
            clickedShop.animation = 1;
            clickedShop.zIndex = 100;
            centerPoint = {
              lat: clickedShop.latitude,
              lng: clickedShop.longitude
            };
          }
          if (this.showNotice) {
            setTimeout(() => {
              this.showNotice = false;
            }, 5000);
          }
          this.clickedShop = clickedShop;
          setTimeout(() => {
            this.mapPins.forEach((v2, i) => {
              if (v2["@id"] === clickedShop["@id"]) {
                this.$set(this.mapPins, i, Object.assign(v2, { animation: 0 }));
              }
            });
          }, 1400);
        } else {
          v.zIndex = null;
          v.animation = null;
        }
      });
      this.center = centerPoint;
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
      border-radius: 0.4rem;
      background: $white;
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
