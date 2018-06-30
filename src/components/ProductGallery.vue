
<template lang="pug">
  #ProductGallery
    .head
      .head-logo CCCLOTHES
      .head-title MEN'S TOPS
    .one
      .one-no 01
      .one-title(data-one-title="LINEN BLAZER") LINEN BLAZER
      .one-subtitle Men's outfit
      .one-border
      .one-pattern
    .two
      .two-no 02
      .two-title(data-two-title="FREELIFT") FREELIFT
      .two-subtitle Men's basics
      .two-square
      .two-border
    .three
      .three-no 03
      .three-title(data-three-title="SUPER SKINNY") SUPER SKINNY
      .three-subtitle Men's pattern shirts
      .three-square
      .three-border
    .four
      .four-no 04
      .four-title(data-four-title="DENIM") DENIM
      .four-subtitle Men's cadual
      .four-border
      .four-pattern
    .five
      .five-pattern
      .five-no 05
      .five-title(data-five-title="SWEATSHIRTS") SWEATSHIRTS
      .five-subtitle Men's jacket
      .five-border
    .six
      .six-no 06
      .six-title(data-six-title="VINTAGE DENIM") VINTAGE DENIM
      .six-subtitle Men's classic
      .six-square
      .six-border
    .seven
      .seven-no 07
      .seven-title(data-seven-title="EDITION") EDITION
      .seven-subtitle Men's shirts
      .seven-square
      .seven-border

</template>

<style lang="scss">
#ProductGallery {
  display: grid;
  max-width: 940px;
  color: #000000;

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700i,900');
  grid-template: repeat(20, 100px) / repeat(8, 120px);
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  @mixin grid-box($image, $row-start, $row-end, $column-start, $column-end) {
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url($image);
    background-position: 50%;
    background-size: cover;
    grid-row: #{$row-start} / #{$row-end};
    grid-column: #{$column-start} / #{$column-end};
  }

  @mixin grid-box-no($top: 0, $left: 0) {
    position: absolute;
    top: $top;
    left: $left;
    font-weight: 900;
    font-size: 48px;
  }

  @mixin grid-box-title($attr, $top: 0, $left: 0, $deg: 0deg) {
    position: absolute;
    top: $top;
    left: $left;
    font-weight: 900;
    font-size: 48px;
    line-height: 75%;
    transform: rotate($deg);
    transform-origin: 0 0;
    white-space: nowrap;
    &::after {
      position: absolute;
      top: -75%;
      left: 0;
      z-index: -15;
      overflow: hidden;
      height: 25%;
      color: rgba(0, 0, 0, 0.1);
      content: attr($attr);
    }
    &::before {
      position: absolute;
      top: -50%;
      z-index: -10;
      overflow: hidden;
      height: 50%;
      color: rgba(0, 0, 0, 0.3);
      content: attr($attr);
    }
  }

  @mixin grid-box-subtitle($top: unset, $left: unset, $deg: 0deg) {
    position: absolute;
    top: $top;
    left: $left;
    font-weight: 700;
    font-style: italic;
    font-size: 24px;
    transform: rotate($deg);
    transform-origin: 0 0;
    white-space: nowrap;
  }

  @mixin grid-box-square($top: 0, $left: 0, $width: 240px, $height: 200px) {
    position: absolute;
    top: $top;
    left: $left;
    z-index: -20;
    width: $width;
    height: $height;
    background-color: #50e3c2;
  }

  @mixin grid-box-border($top: 0, $left: 0, $width: 240px, $height: 200px) {
    position: absolute;
    top: $top;
    left: $left;
    z-index: -25;
    width: $width;
    height: $height;
    border: 20px solid #50e3c2;
  }

  @mixin grid-box-pattern($top: 0, $left: 0, $width: 240px, $height: 100px) {
    position: absolute;
    top: $top;
    left: $left;
    width: $width;
    height: $height;
    background: url('~@/assets/week4_pattern.svg');
  }

  .head {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    grid-row: 1;
    grid-column: 3/7;
    &-logo {
      position: absolute;
      top: 0;
      padding: 2px 10px;
      background-color: #000000;
      color: #ffffff;
      font-size: 20px;
    }
    &-title {
      position: absolute;
      bottom: 0;
      font-weight: 900;
      font-size: 72px;
      line-height: 75%;
    }
  }
  .one {
    @include grid-box('~@/assets/week4_1.jpeg', 3, 7, 1, 5);
    &-no {
      @include grid-box-no(400px);
    }
    &-title {
      @include grid-box-title(data-one-title);
    }
    &-subtitle {
      @include grid-box-subtitle(300px, 505px, 90deg);
    }
    &-border {
      @include grid-box-border(-50px, 300px, 240px, 200px);
    }
    &-pattern {
      @include grid-box-pattern(350px, 60px, 240px, 100px);
    }
  }
  .two {
    @include grid-box('~@/assets/week4_2.jpeg', 4, 6, 6, 8);
    &-no {
      @include grid-box-no(-120px, 300px);
    }
    &-title {
      @include grid-box-title(data-two-title, 230px, 120px);
    }
    &-subtitle {
      @include grid-box-subtitle(-25px, -15px, vertical-rl);
    }
    &-square {
      @include grid-box-square(-60px, 60px);
    }
    &-border {
      @include grid-box-border(-120px, 120px);
    }
  }
  .three {
    @include grid-box('~@/assets/week4_3.jpeg', 9, 11, 1, 5);
    &-no {
      @include grid-box-no(200px, 480px);
    }
    &-title {
      @include grid-box-title(data-three-title, -40px, 145px);
    }
    &-subtitle {
      @include grid-box-subtitle(200px, 30px);
    }
    &-square {
      @include grid-box-square(-50px, 0px, 240px, 50px);
    }
    &-border {
      @include grid-box-border(50px, 300px);
    }
  }
  .four {
    @include grid-box('~@/assets/week4_4.jpeg', 9, 13, 7, 9);
    &-no {
      @include grid-box-no(350px, -60px);
    }
    &-title {
      @include grid-box-title(data-four-title, 150px, -40px, -90deg);
    }
    &-subtitle {
      @include grid-box-subtitle(-140px, 195px, 90deg);
    }
    &-border {
      @include grid-box-border(-100px, -60px);
    }
    &-pattern {
      @include grid-box-pattern(350px, 0px);
    }
  }
  .five {
    @include grid-box('~@/assets/week4_5.jpeg', 13, 15, 3, 5);
    &-no {
      @include grid-box-no(150px, -120px);
    }
    &-title {
      @include grid-box-title(data-five-title, 50px, -240px);
    }
    &-subtitle {
      @include grid-box-subtitle(0px, 245px);
    }
    &-border {
      @include grid-box-border(150px, -120px, 240px, 100px);
    }
    &-pattern {
      @include grid-box-pattern(-50px, -180px);
    }
  }
  .six {
    @include grid-box('~@/assets/week4_6.jpeg', 15, 19, 5, 9);
    &-no {
      @include grid-box-no(150px, -60px);
    }
    &-title {
      @include grid-box-title(data-six-title, -40px, 120px);
    }
    &-subtitle {
      @include grid-box-subtitle(400px, 180px);
    }
    &-square {
      @include grid-box-square(200px, -60px, 60px, 200px);
    }
    &-border {
      @include grid-box-border(350px, 0px, 480px, 100px);
    }
  }
  .seven {
    @include grid-box('~@/assets/week4_7.jpeg', 17, 21, 1, 3);
    &-no {
      @include grid-box-no(350px, 300px);
    }
    &-title {
      @include grid-box-title(data-seven-title, 0px, 280px, 90deg);
    }
    &-subtitle {
      @include grid-box-subtitle(-25px, 0px);
    }
    &-square {
      @include grid-box-square(200px, 240px, 120px, 200px);
    }
    &-border {
      @include grid-box-border(-50px, 50px, 240px, 300px);
    }
  }
}
</style>
