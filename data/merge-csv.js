"use strict";
const csv = require("csvtojson");
const { createObjectCsvWriter } = require("csv-writer");
const enrichment = require("imi-enrichment-address")
const output = `${__dirname}/shops_updated.csv`;
const csvWriter = createObjectCsvWriter({
  path: output,
  header: [
    { id: "timestamp", title: "Timestamp" },
    {
      id: "caution",
      title:
        "登録するにあたり、以下の内容についてお読みいただき、ご了解いただけたらチェックしてください。ご了承いただけない場合は、そのままこの画面を閉じてください。（画面を閉じた場合、登録情報は反映されません。）"
    },
    { id: "mail", title: "メールアドレス（非公開）" },
    { id: "name", title: "店舗名(正式名称)" },
    { id: "area", title: "店舗住所・区名" },
    { id: "group", title: "商店会" },
    { id: "address1", title: "店舗住所・区以降" },
    { id: "address2", title: "店舗住所・建物名称など" },
    { id: "longLat", title: "地図上の座標（緯度・経度）" },
    { id: "phone", title: "店舗の電話番号" },
    { id: "holiday", title: "定休日" },
    { id: "businessDay", title: "営業日備考" },
    { id: "shopHour", title: "提供時間等" },
    { id: "url", title: "店舗ウェブサイトURL" },
    { id: "sns", title: "店舗SNS" },
    { id: "genre", title: "料理のジャンル" },
    { id: "service", title: "対応サービス" },
    { id: "condition", title: "サービスの提供条件等" },
    { id: "menu1", title: "【メニュー１】メニュー名" },
    { id: "menuprice1", title: "【メニュー１】税込み価格" },
    { id: "menu2", title: "【メニュー2】メニュー名" },
    { id: "menuprice2", title: "【メニュー2】税込み価格" },
    { id: "menu3", title: "【メニュー3】メニュー名" },
    { id: "menuprice3", title: "【メニュー3】税込み価格" },
    { id: "othermenu", title: "その他のメニュー" },
    { id: "introduction", title: "お店の紹介" },
    { id: "imageUrl", title: "カバー画像URL" },
    { id: "memo", title: "通信欄" },
    { id: "roughlongLat", title: "大まかな緯度経度" }
  ],
  encoding: "utf8",
  append: false
});

async function updateShopsCSV() {
  const shops = await csv().fromFile(`${__dirname}/shops.csv`);
  const takeOutYokohama = await csv().fromFile(
    `${__dirname}/takeoutyokohama.csv`
  );

  const shopList = shops.map(v => {
    return {
      timestamp: v.Timestamp,
      caution: "",
      mail: "",
      name: v["店舗名(正式名称)"],
      area: v["店舗住所・区名"],
      group: v["商店会"],
      address1: v["店舗住所・区以降"],
      address2: v["店舗住所・建物名称など"],
      longLat: v["地図上の座標（緯度・経度）"],
      phone: v["店舗の電話番号"],
      holiday: v["定休"],
      businessDay: "",
      shopHour: v["提供時間"],
      url: v["店舗ウェブサイトURL"],
      sns: v["店舗SNS"],
      genre: v["料理のジャンル"],
      service: v["対応サービス"],
      condition: v["サービスの提供条件等"],
      menu1: v["【メニュー１】メニュー名"],
      menuprice1: v["【メニュー１】税込み価格"],
      menu2: v["【メニュー2】メニュー名"],
      menuprice2: v["【メニュー2】税込み価格"],
      menu3: v["【メニュー3】メニュー名"],
      menuprice3: v["【メニュー3】税込み価格"],
      othermenu: v["その他のメニュー"],
      introduction: "",
      imageUrl: "",
      memo: ""
    };
  });

  const takeOut = takeOutYokohama.map(v => {
    let service = "";
    if (v["12　テイクアウト（持ち帰り）はできますか＜公開＞"] === "はい") {
      if (v["13-1　デリバリー（宅配・出前）はできますか＜公開＞"] === "はい") {
        service = "テイクアウト,デリバリー";
      } else {
        service = "テイクアウト";
      }
    } else {
      if (v["13-1　デリバリー（宅配・出前）はできますか＜公開＞"] === "はい") {
        service = "デリバリー";
      }
    }
    return {
      timestamp: v["タイムスタンプ"],
      caution: "",
      mail: "",
      name: v["03　店舗名（正式名称）＜公開＞"],
      area: v["04-1　店舗住所・区名＜公開＞"],
      group: "",
      address1: v["04-2　店舗住所・区以降＜公開＞"],
      address2: v["04-3　店舗住所・建物名称など＜公開＞"],
      longLat:
        v[
          "04-4　【任意】店舗の正確な位置（緯度・経度）が分かる方は入力をお願いします＜公開＞"
        ],
      phone: v["05　店舗の電話番号（ハイフンなし）＜公開＞"],
      holiday: v["08　定休日＜公開＞"],
      businessDay: v["07　提供の条件（提供時間・曜日）＜公開＞"],
      shopHour: "",
      url: v["09　店舗　ウェブサイトURL＜公開＞"],
      sns: v["10　店舗　SNS＜公開＞"],
      genre: v["11　料理のジャンル＜公開＞"],
      service: service,
      conditions: v["サービスの提供条件等"],
      menu1: v["15-1a　【メニュー１】メニュー名＜公開＞"],
      menuprice1: v["15-1b　【メニュー１】税込価格＜公開＞"],
      menu2: v["15-2a　【メニュー２】メニュー名＜公開＞"],
      menuprice2: v["15-2b　【メニュー２】税込価格＜公開＞"],
      menu3: v["15-3a　【メニュー３】メニュー名＜公開＞"],
      menuprice3: v["15-3b　【メニュー３】税込価格＜公開＞"],
      othermenu: v["15-4　【メニュー4以降】メニュー名、税込価格＜公開＞"],
      introduction: "",
      imageUrl: "",
      memo: "",
      flag: v["02　新規登録ですか、修正依頼ですか"]
    };
  });

  const target = ["address1", "address2"];

  // スコアの閾値
  const borderscore = 0.7;
  let score = 0;
  let max_score = 0;

  // N gramの処理
  const ngram = (s, t, n) => {
    let i;
    let s_grams = [];
    let t_grams = [];
    let total_check_count = 0;
    let equal_count = 0;
    let equal_flag = 0;

    for (i = 0; i <= s.length - n; i++) {
      s_grams.push(s.substr(i, n).toLowerCase());
    }

    for (i = 0; i <= s.length - n; i++) {
      t_grams.push(t.substr(i, n).toLowerCase());
    }

    s_grams.forEach(function(ws) {
      total_check_count = total_check_count + 1;
      equal_flag = 0;
      t_grams.forEach(function(wt) {
        if (ws === wt) {
          equal_flag = 1;
          equal_count = equal_count + equal_flag;
        }
      });
    });
    return equal_count / total_check_count;
  };

  let tRow = 1;

  console.log("--- takeoutyokohamaの整理 ---");
  takeOut.map(function(o, n) {
    if (o["flag"] === "新規登録") {
      delete o["flag"];
    } else if (o["flag"] === "修正依頼") {
      tRow += 1; // for debug
      max_score = 0;
      takeOut.map(function(t, i) {
        // 店名で闘値を上回るなら修正対象の可能性ありと見て、他の項目をみる
        score = ngram(o["name"], t["name"], 2);
        if (score >= borderscore) {
          target.forEach(function(value) {
            score = ngram(o[value], t[value], 2);
            if (max_score < score) {
              max_score = score;
            }
          });

          if (max_score >= borderscore) {
            if (o["timestamp"] < t["timestamp"]) {
              console.log(
                "[" + n + "]" + o["name"] + "<= [" + i + "]" + t["name"]
              );
              delete t["flag"];
              takeOut.splice(n, 1, t);
              takeOut.splice(i, 1);
            }
          }
        }
      });
    }
  });

  console.log("--- shopsとの比較 ---");
  shopList.map(function(s, i) {
    max_score = 0;
    tRow = 1;
    takeOut.map(function(t, n) {
      // 店名で闘値を上回るなら修正対象の可能性ありと見て、他の項目をみる
      score = ngram(s["name"], t["name"], 2);
      if (score >= borderscore) {
        target.forEach(function(value) {
          score = ngram(s[value], t[value], 2);
          if (max_score < score) {
            max_score = score;
          }
        });

        if (max_score >= borderscore) {
          console.log("[" + i + "]" + s["name"] + "<= [" + n + "]" + t["name"]);
          shopList.splice(i, 1, t);
          t["flag"] = "r";
        }
      }
    });
  });

  console.log("--- shopsとのマージ ---");
  takeOut.map(function(t) {
    if (t["flag"] != "r") {
      tRow += 1;
      shopList.push(t);
    }
  });

  console.log("--- 大まかな緯度経度の付加 ---");
  // ループで実行する処理
  const getEnrichment= (s) => {
    return new Promise(function(resolve, reject) {
      enrichment("神奈川県横浜市" + s["area"] + s["address1"]).then(json => {
        if(json["地理座標"]) {
          s["roughlongLat"] = json["地理座標"]["緯度"] + ',' + json["地理座標"]["経度"];
        }else{
          s["roughlongLat"] = "";
        }
        resolve(s);
      });
    });
  }

  // Promiseの直列処理をループで繰り返す
  let myPromise = Promise.resolve();
  shopList.map(function(s, i) {
    myPromise = myPromise
    .then(getEnrichment.bind(this, s))
  });


  myPromise
  .then( function ( message ) {
    console.log("出力件数：" + shopList.length + "件");
    csvWriter
    .writeRecords(shopList) // returns a promise
      .then(() => {
        console.log("...Done");
      });
  } )
  .catch( function ( reason ) {
    console.log( reason ) ;
  } ) ;

}

updateShopsCSV();
