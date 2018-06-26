
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
        img(src="@/assets/week4_pattern.svg")
        img(src="@/assets/week4_pattern.svg")
</template>

scr

<style lang="scss">
#ProductGallery {
  display: grid;
  max-width: 940px;

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700i,900');
  grid-template: repeat(20, 100px) / repeat(8, 120px);
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
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
    position: relative;
    background-color: rgba(219, 22, 22, 0.3);
    background-image: url('~@/assets/week4_1.jpeg');
    background-position: 50%;
    background-size: cover;
    grid-row: 3/7;
    grid-column: 1/5;
    &-no {
      position: absolute;
      bottom: -50px;
      font-weight: 900;
      font-size: 48px;
    }
    &-border {
      position: absolute;
      top: -50px;
      right: -60px;
      z-index: -20;
      width: 240px;
      height: 200px;
      border: 20px solid #50e3c2;
    }
    &-pattern {
      position: absolute;
      bottom: -50px;
      left: 60px;
    }
    &-title {
      position: absolute;
      top: 0;
      font-weight: 900;
      font-size: 48px;
      line-height: 75%;
      &::after {
        position: absolute;
        top: -75%;
        left: 0;
        z-index: -15;
        overflow: hidden;
        height: 25%;
        color: rgba(0, 0, 0, 0.1);
        content: attr(data-one-title);
      }
      &::before {
        position: absolute;
        top: -50%;
        z-index: -10;
        overflow: hidden;
        height: 50%;
        color: rgba(0, 0, 0, 0.3);
        content: attr(data-one-title);
      }
    }
    &-subtitle {
      position: absolute;
      right: -24px;
      bottom: -24px;
      font-weight: 700;
      font-style: italic;
      font-size: 24px;

      writing-mode: vertical-rl;
    }
  }
}
</style>
