<template>
  <div class="shop_show">
    <div class="shop_show__inner">
      <return-button />
      <shop-item v-bind="shop" />
    </div>
    <div class="shop_show__map">
      <GmapMap
        v-if="currentLocation"
        ref="mapRef"
        :center="currentLocation"
        :zoom="14"
        :options="{ draggableCursor: 'default' }"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          :position="{
            lat: Number(shop.latitude),
            lng: Number(shop.longitude)
          }"
          :icon="{
            url: '/images/active_pin.png',
            scaledSize: { width: 50, height: 50, f: 'px', b: 'px' }
          }"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import ShopItem from "@/components/ShopItem";
import ReturnButton from "@/components/ReturnButton";
export default {
  name: "Show",
  components: {
    ReturnButton,
    ShopItem
  },
  data: () => ({
    shop: [],
    currentLocation: null
  }),
  async created() {
    let shops = await this.$http.get("data/shops.json");
    if (shops) {
      this.shop = shops.data.find(
        shop => shop.name === this.$route.params["name"]
      );
    }
    this.currentLocation = {
      lat: this.shop.latitude,
      lng: this.shop.longitude
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
.shop_show {
  .shop {
    margin: 0 0 4rem;
  }
}
</style>
<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.shop_show {
  padding: 7.1rem 0 0;
  overflow-y: auto;
  &__inner {
    width: 50%;
    margin: 0 auto;
  }
  &__map {
    height: 40rem;
  }
  @include mediaMobile {
    &__inner {
      width: 100%;
    }
  }
}
</style>
