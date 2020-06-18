"use strict";
const fs = require("fs");
const csv = require("csvtojson");
const Fuse = require("fuse.js");

async function updateShops() {
  const shops = await csv().fromFile(`${__dirname}/shops_updated.csv`);

  const shops_reformat = [];

  for (let i = 0; i < shops.length; i++) {
    let shop_reformat = {};

    shop_reformat["@id"] = "https://to-go.yokohama/shop/" + i;
    shop_reformat["@context"] = "http://schema.org";
    shop_reformat["@type"] = "Restaurant";
    shop_reformat["name"] = shops[i]["店舗名(正式名称)"];

    if (shops[i]["店舗住所・区名"] && shops[i]["店舗住所・区以降"]) {
      shop_reformat["address"] = {
        "@type": "PostalAddress",
        addressLocality: shops[i]["店舗住所・区名"],
        streetAddress:
          shops[i]["店舗住所・区以降"] + shops[i]["店舗住所・建物名称など"]
      };
    } else if (shops[i]["店舗住所・区名"]) {
      shop_reformat["address"] = {
        "@type": "PostalAddress",
        addressLocality: shops[i]["店舗住所・区名"]
      };
    } else if (shops[i]["店舗住所・区以降"]) {
      shop_reformat["address"] = {
        "@type": "PostalAddress",
        streetAddress:
          shops[i]["店舗住所・区以降"] + shops[i]["店舗住所・建物名称など"]
      };
    }

    if (shops[i]["店舗の電話番号"]) {
      shop_reformat["telephone"] = shops[i]["店舗の電話番号"];
    }

    if (shops[i]["地図上の座標（緯度・経度）"].indexOf(",") > -1) {
      const latitude_longitude = shops[i]["地図上の座標（緯度・経度）"].split(
        ","
      );
      shop_reformat["latitude"] = Number(latitude_longitude[0].trim());
      shop_reformat["longitude"] = Number(latitude_longitude[1].trim());
    }

    if (shops[i]["カバー画像URL"]) {
      shop_reformat["image"] = shops[i]["カバー画像URL"];
    }

    if (shops[i]["提供時間等"]) {
      shop_reformat["openingHour"] = shops[i]["提供時間等"];
    }

    if (shops[i]["店舗ウェブサイトURL"]) {
      shop_reformat["url"] = shops[i]["店舗ウェブサイトURL"];
    }

    if (shops[i]["料理のジャンル"]) {
      shop_reformat["servesCuisine"] = shops[i]["料理のジャンル"]
        .split(",")
        .map(v => v.trim());
    }

    if (shops[i]["商店会"]) {
      shop_reformat["areaServed"] = shops[i]["商店会"];
    }

    if (
      shops[i]["対応サービス"] &&
      shops[i]["対応サービス"].indexOf(",") > -1
    ) {
      let offers = shops[i]["対応サービス"].split(",");
      shop_reformat["makesOffer"] = [
        {
          "@type": "Offer",
          name: offers[0]
        },
        {
          "@type": "Offer",
          name: offers[1]
        }
      ];
    } else if (shops[i]["対応サービス"]) {
      shop_reformat["makesOffer"] = [
        {
          "@type": "Offer",
          name: shops[i]["対応サービス"]
        }
      ];
    }

    if (
      shops[i]["サービスの提供条件等"] ||
      shops[i]["【メニュー１】メニュー名"] ||
      shops[i]["【メニュー2】メニュー名"] ||
      shops[i]["【メニュー3】メニュー名"]
    ) {
      if (shops[i]["サービスの提供条件等"]) {
        shop_reformat["hasMenu"] = {
          "@type": "Menu",
          description: shops[i]["サービスの提供条件等"]
        };
      } else {
        shop_reformat["hasMenu"] = {
          "@type": "Menu"
        };
      }
      if (
        shops[i]["【メニュー１】メニュー名"] ||
        shops[i]["【メニュー2】メニュー名"] ||
        shops[i]["【メニュー3】メニュー名"]
      ) {
        shop_reformat["hasMenu"]["hasMenuItem"] = [];
        if (shops[i]["【メニュー１】メニュー名"]) {
          shop_reformat["hasMenu"]["hasMenuItem"].push({
            "@type": "MenuItem",
            name: shops[i]["【メニュー１】メニュー名"],
            price: shops[i]["【メニュー１】税込み価格"]
          });
        }
        if (shops[i]["【メニュー2】メニュー名"]) {
          shop_reformat["hasMenu"]["hasMenuItem"].push({
            "@type": "MenuItem",
            name: shops[i]["【メニュー2】メニュー名"],
            price: shops[i]["【メニュー2】税込み価格"]
          });
        }
        if (shops[i]["【メニュー3】メニュー名"]) {
          shop_reformat["hasMenu"]["hasMenuItem"].push({
            "@type": "MenuItem",
            name: shops[i]["【メニュー3】メニュー名"],
            price: shops[i]["【メニュー3】税込み価格"]
          });
        }
      }
    }

    if (shops[i]["大まかな緯度経度"].indexOf(",") > -1) {
      const latitude_longitude = shops[i]["大まかな緯度経度"].split(
        ","
      );
      shop_reformat["address_latitude"] = Number(latitude_longitude[0].trim());
      shop_reformat["address_longitude"] = Number(latitude_longitude[1].trim());
    }

    shops_reformat.push(shop_reformat);
  }

  const json = fs.readFileSync(`${__dirname}/takeoutmap.json`);
  const points = JSON.parse(json).features;

  // 店名であいまい検索
  const fuse = new Fuse(points, {
    keys: ["properties.name"],
    threshold: 0.8
  });

  shops_reformat.forEach(v => {
    const fuzzyFound = fuse.search(v.name);
    if (fuzzyFound.length > 0) {
      // あいまい検索で見つかった結果で最もスコアの良かったお店を採用
      const thisShop = fuzzyFound[0].item;
      v.image = thisShop.properties.gx_media_links;
    }
  });

  fs.writeFile(
    "./public/data/shops.json",
    JSON.stringify(shops_reformat, null, ' '),
    "utf8",
    function(err) {
      if (err) {
        console.log("An error occurred while writing JSON File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    }
  );
}

updateShops();
