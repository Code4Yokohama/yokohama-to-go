<template>
  <section class="published">
    <div class="published__heading">
      <img
        src="/images/top_logo.png"
        alt="ロゴ画像：テイクアウトとデリバリー情報"
        class="position_image"
      />
      <h2 class="heading">情報掲載は無料です</h2>
    </div>
    <div class="published__text">
      <p>
        YOKOHAMA to
        GO（to-go.yokohama）への情報掲載を募集しています。情報提供フォームより必要事項をご記入の上、お申込ください。<br />なお、他者による推薦は現在のところうけつけておりません。オーナー、店主、店スタッフの方など当事者が登録してください。当事者からの依頼による代理の方も登録していただけます。
      </p>
      <p>
        商店会加入・非加入は問いません。また掲載料など登録料はかかりません。
      </p>

      <h3>画像の登録について</h3>

      <p>
        画像は1点掲載可能です。横幅：900px、高さ：600pxでご用意いただくときれいに表示できます。<br />テイクアウトメニューや店舗の画像などをご用意の上、ダウンロード可能なURLをフォームに入力いただくか、次の宛先にメールで送付してください。<br />画像送付先メールアドレス：info@code4.yokohama
      </p>

      <h3>登録情報の取り扱いについて</h3>
      <p>提携商店会が独自に運営する情報サイトにも情報が掲載されます。</p>
      <p>
        登録情報は写真も含めてオープンデーターとして公開されます。<br />第三者による自由な利用を無条件で許可できる内容のみとしてください。
      </p>
      <p>
        登録情報に不備がある場合、横浜市内に事業の実態がない場合、取得している営業許可の範囲をこえるメニュー（提供できないメニュー）や、公序良俗に反する記述などがある場合には、予告なく内容修正、掲載見送り、削除を行う場合があります。
      </p>
    </div>
    <a
      href="https://forms.gle/tc9fE2BMC8sf9hK27"
      target="_blank"
      title="情報提供フォームを新規ウィンドウで開きます"
      class="square_button"
    >
      情報提供フォーム
    </a>
    <div class="published__text">
      <h2 class="published__text__heading">提携商店会</h2>

      <p class="published__text__description">
        YOKOHAMA to go では横浜市内の商店会と提携を進めています。
      </p>

      <ul class="published__text__bnrs">
        <li>
          <a
            href="https://sites.google.com/view/takeout-aoba/"
            target="_blank"
            title="テイクアウト青葉台！のウェブサイトを新規ウィンドウで開きます"
          >
            <img src="/images/bnr_aoba.jpg" alt="青葉台" />
          </a>
        </li>
        <li>
          <a
            href="https://sites.google.com/view/takeoutazamino/"
            target="_blank"
            title="テイクアウトあざみ野！のウェブサイトを新規ウィンドウで開きます"
          >
            <img src="/images/bnr_azamino.jpg" alt="あざみ野" />
          </a>
        </li>
        <li>
          <a
            href="https://sites.google.com/view/takeoutichifuji/"
            target="_blank"
            title="テイクアウトあざみ野！のウェブサイトを新規ウィンドウで開きます"
          >
            <img src="/images/bnr_ichifuji.jpg" alt="市が尾＆藤が丘" />
          </a>
        </li>
        <li>
          <a
            href="https://sites.google.com/view/takeouttamaplaza/"
            target="_blank"
            title="たまプラーザ！のウェブサイトを新規ウィンドウで開きます"
          >
            <img src="/images/bnr_tamapla.jpg" alt="たまプラーザ" />
          </a>
        </li>
        <li>
          <a
            href="https://sites.google.com/view/takeoutnarakamoshida/"
            target="_blank"
            title="テイクアウト奈良＆鴨志田！のウェブサイトを新規ウィンドウで開きます"
          >
            <img src="/images/bnr_narakamo.jpg" alt="奈良＆鴨志田" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "Index"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.published {
  position: relative;
  width: 50%;
  margin: 0 auto;
  &__heading {
    position: relative;
    z-index: 20;
    width: 52%;
    margin: 0 auto 5.3rem;
    .position_image {
      margin: 0 0 7.1rem;
    }
    .heading {
      font-size: 2.4rem;
      text-align: center;
    }
  }
  &__text {
    margin: 0 0 5.2rem;
    &__heading {
      text-align: center;
      font-size: 2rem;
      margin: 8rem auto 4rem auto;
    }
    &__description {
      text-align: center;
    }
    &__bnrs {
      list-style-type: none;
      margin: 2rem 0;
      padding: 0;
      li {
        display: inline-block;
        padding: 0 1rem;
        width: 20%;
        height: auto;
      }
    }
  }
  h3 {
    margin: 4rem 0 2rem 0;
  }
  .square_button {
    display: block;
    width: 35%;
    min-width: 34.5rem;
    font-size: 1.8rem;
    color: $mainColor;
    margin: 0 auto 2rem auto;
    line-height: 6rem;
    text-align: center;
    border: 0.1rem solid $mainColor;
  }
  @include mediaMobile {
    width: 100%;
    padding: 0 1.5rem;
    &__heading {
      width: 61.8%;
      margin: 0 auto 4.1rem;
      .position_image {
        margin: 0 0 2.9rem;
      }
      .heading {
        font-size: 1.8rem;
      }
    }
    .square_button {
      width: 100%;
      min-width: initial;
      font-size: 1.4rem;
      line-height: 4rem;
    }
  }
  @include mediaTablet {
    padding: 0 0 3rem;
    &__heading {
      width: 70%;
      .position_image {
        margin: 0 0 2.9rem;
      }
    }
  }
  @include mediaPc {
    min-width: 96rem;
  }
}
</style>
