<template lang="pug">
  #SkillTree
    .head
      .moon
        img(src="~@/assets/week9/img_illustration.png")
      .title
        span 介面設計師轉職之路
        span UI Designer Road Map
    .road
      .skill(
        v-for="(skill, index) in skills"
        @click="toggleSkill(index)"
        @mouseover="hoverIndex = index"
        @mouseleave="hoverIndex = null"
        :class="{ active: skill.active }"
        :key="index"
        )
        img(:src="skill.img")
    .info
      .info-content(:class="{ open: hoverIndex !== null }")
        .info-content-message(v-if="hoverIndex !== null")
          img.info-content-img(:src="skills[hoverIndex].img")
          span {{ skills[hoverIndex].info }}
      img.monocat(src="~@/assets/week9/img_monocat.png")
    img.hexcat(src="~@/assets/week9/img_hexcat.png")
    img.rocket(src="~@/assets/week9/img_rocket.png")
</template>

<script>
import blade1 from '../assets/week9/img_blade-1.png'
import meat from '../assets/week9/img_meat.png'
export default {
  name: 'SkillTree',
  data() {
    return {
      blade1,
      meat,
      hoverIndex: null,
      skills: [
        {
          name: '設計規範',
          level: 0,
          img: blade1,
          active: false,
          info: 'UI設計跟平面設計最大的不同是，因為具有功能、要被操作且須遵守規範，雖然難啃但不失為初心者必備武器。'
        },
        {
          name: '爬梳乾貨',
          level: 1,
          img: meat,
          active: false,
          info: '這行沒什麼大學科系可選擇，與IT產業相同的是需仰賴大量的閱讀與自學，不管是新手村或職業都是。'
        }
      ]
    }
  },
  methods: {
    toggleSkill(index) {
      this.skills[index].active = !this.skills[index].active
    }
  }
}
</script>

<style lang="scss">
#SkillTree {
  position: relative;
  width: 100vw;
  height: 1000px;
  // height: 100vh;
  background-image: url('~@/assets/week9/bg.png'), linear-gradient(#301a3b, #10030a);
  // background-attachment: fixed;
  background-position: bottom;
  // background-size: cover;
  background-repeat: no-repeat;
  * {
    box-sizing: border-box;
  }
  .info {
    .monocat {
      position: absolute;
      top: 70vh;
      left: 15vw;
      height: 30vh;
    }
    &-content {
      position: absolute;
      top: 75vh;
      left: 20vw;
      overflow: hidden;
      min-height: 100px;
      width: 0vw;
      border: solid 5px #5791ff;
      border-radius: 20px;
      background-color: #fff;
      text-align: left;
      letter-spacing: 1px;
      font-weight: 500;
      font-size: 3vh;
      line-height: 1.5;
      opacity: 0;
      transition: 0.5s;
      &-message {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      &-img {
        padding: 20px;
      }
      &.open {
        padding: 20px 40px 20px 70px;
        min-height: 100px;
        width: 60vw;
        opacity: 1;
      }
    }
  }
  .road {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20vh;
    margin-bottom: 20vh;
    .skill {
      display: inline-block;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 110px;
      width: 100px;
      height: 100px;
      border: solid 8px #5791ff;
      border-radius: 40px;
      background-color: #0e467f;
      filter: grayscale(1);
      cursor: pointer;
      transition: 0.5s;
      transform: scale(0.95);

      user-select: none;
      &.active {
        filter: grayscale(0);
        filter: drop-shadow(0px 0px 5px #fff);
        transform: scale(1);
      }
      &.active::before {
        background-color: #fff;
        filter: drop-shadow(0px 0px 5px #fff);
      }
      &.active::after {
        border-left-color: #fff;
        filter: drop-shadow(0px 0px 5px #fff);
      }
      &::before {
        position: absolute;
        top: 50%;
        left: 110%;
        width: 80px;
        height: 20px;
        background-color: #bec5d0;
        content: '';
        transform: translateY(-50%);
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 200%;
        border-width: 20px 0 20px 30px;
        border-style: solid;
        border-color: transparent transparent transparent #bec5d0;
        content: '';
        transform: translateY(-50%);
      }
    }
  }
  .head {
    display: flex;
    align-items: center;
    margin-top: 5vh;
    margin-left: 5vw;
    .moon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10vh;
      height: 10vh;
      filter: sepia(0.5);
      &::after,
      &::before {
        position: absolute;
        z-index: -1;
        width: 110%;
        height: 110%;
        border-radius: 100%;
        background-color: #efbeab;
        content: '';
        opacity: 0.2;
      }
      &::before {
        width: 130%;
        height: 130%;
        background-color: #efbeab;
      }
    }
    .title {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      span {
        margin-left: 2vw;
        color: #fff;
        text-shadow: 0px 3px 7px #0093ff;
        letter-spacing: 2px;
        font-weight: 900;
        font-size: 8vh;
      }
      span:last-child {
        letter-spacing: 1px;
        font-size: 6.5vh;
      }
    }
  }
  .hexcat {
    position: absolute;
    bottom: 15vh;
    left: 5vw;
    height: 25vh;
  }
  .rocket {
    position: absolute;
    right: 10vw;
    bottom: 0vh;
    height: 50vh;
  }
}
</style>
