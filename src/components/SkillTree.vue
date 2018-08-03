<template lang="pug">
  #SkillTree
    .head
      .moon
        img(src="~@/assets/week9/img_illustration@2x.png")
      .title
        span 介面設計師轉職之路
        span UI Designer Road Map
    .road
      .skill(
        v-for="(skill, index) in skills"
        @click="toggleActive(skill)"
        @mouseover="hoverId = skill.id"
        @mouseleave="hoverId = null"
        :class="['arrow', `arrow-${skill.arrowStyle}`, { active: activeSkillIds.includes(skill.id) }]"
        :style="`left: ${skill.x}px; top: ${skill.y}px`"
        :key="index"
        )
        img.skill-img(:src="require(`@/assets/week9/img_${skill.img}@2x.png`)")
        span.skill-name {{ skill.name }}
    .info
      .info-content(:class="{ open: hoverId !== null }")
        .info-content-message(v-if="hoverId !== null")
          img.info-content-img(:src="require(`@/assets/week9/img_${hoverInfo.img}@2x.png`)")
          .info-content-data
            span.info-content-name {{ hoverInfo.name }}
            span.info-content-info {{ hoverInfo.info }}
      img.monocat(src="@/assets/week9/img_monocat@2x.png")
    .footer
      img.hexcat(src="@/assets/week9/img_hexcat@2x.png")
      img.rocket(src="@/assets/week9/img_rocket@2x.png")
</template>

<script>
import skills from '../assets/week9/skills.json'
export default {
  name: 'SkillTree',
  data() {
    return {
      skills,
      hoverId: null,
      activeSkillIds: []
    }
  },
  computed: {
    hoverInfo() {
      return this.skills.find(skill => skill.id === this.hoverId)
    }
  },
  methods: {
    check(target) {
      const skillReg =
        target.requirement.type === 'or'
          ? new RegExp(`${target.requirement.ids.join('|')}`, 'g')
          : new RegExp(`${target.requirement.ids.map(id => `(?=.*${id})`).join('')}.*`, 'g')
      return this.activeSkillIds.join().match(skillReg)
    },
    removeActiveSkill(id) {
      const index = this.activeSkillIds.indexOf(id)
      index !== -1 && this.activeSkillIds.splice(index, 1)
    },
    toggleActive(target) {
      if (this.activeSkillIds.includes(target.id)) {
        this.removeActiveSkill(target.id)
        target.nextIds.forEach(id => {
          const skill = this.skills.find(skill => skill.id === id)
          !this.check(skill) && this.removeActiveSkill(skill.id)
        })
      } else {
        this.check(target) && this.activeSkillIds.push(target.id)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  min-width: 1400px;
}
#SkillTree {
  * {
    box-sizing: border-box;
    user-select: none;
  }
  position: relative;
  overflow: auto;
  min-width: 1400px;
  min-height: 1000px;
  background-image: url('~@/assets/week9/bg.png'), linear-gradient(#301a3b, #10030a);
  background-position: bottom;
  background-repeat: no-repeat;
  @mixin arrow($direction, $line-style) {
    &::after {
      position: absolute;
      top: 50%;
      left: 120%;
      color: #fff;
      font-weight: 900;
      font-size: 60px;
      transform: translateY(-50%);

      -webkit-text-stroke-width: 10px;
      -webkit-text-stroke-color: #fff;
    }
    &::before {
      position: absolute;
      top: 45%;
      left: 180%;
      color: #fff;
      font-weight: 900;
      font-size: 80px;
      transform: translateY(-50%);

      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #fff;
    }
    //─ ┌
    @if $direction == 'right' {
      &::before {
        content: '\▸\fe0e';
      }
      &::after {
        content: '\─\fe0e';
      }
      @if $line-style == 'long' {
        &::before {
          left: 430%;
          content: '\▸\fe0e';
        }
        &::after {
          content: '\─\fe0e';
          font-size: 280px;

          -webkit-text-stroke-width: 1px;
        }
      }
      @if $line-style == 'down' {
        &::before {
          top: 50%;
          left: 240%;
          content: '\▸\fe0e';
          transform: rotate(90deg);
        }
        &::after {
          content: '\─\┐\fe0e';
          font-size: 80px;
        }
      }
      @if $line-style == 'up' {
        &::before {
          top: -50%;
          left: 230%;
          content: '\▸\fe0e';
          transform: rotate(-90deg);
        }
        &::after {
          content: '\─\┘\fe0e';
          font-size: 80px;
        }
      }
    }
  }
  .info {
    position: relative;
    .monocat {
      position: absolute;
      left: 120px;
      height: 250px;
    }
    &-content {
      position: absolute;
      top: 50px;
      left: 200px;
      min-height: 100px;
      border: solid 5px #5791ff;
      border-radius: 20px;
      background-color: #fff;
      text-align: left;
      letter-spacing: 1px;
      font-weight: 500;
      font-size: 3vh;
      line-height: 1.5;
      opacity: 0;
      transition: 1.5s;
      &-message {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      &-data {
        display: flex;
        flex-direction: column;
      }
      &-name {
        margin-bottom: 5px;
        color: #505050;
        font-weight: 600;
        font-size: 30px;
      }
      &-info {
        color: #7b7b7b;
        font-size: 20px;
      }
      &-img {
        padding: 20px;
        width: 150px;
        height: 150px;
      }
      &.open {
        padding: 20px 40px 20px 70px;
        min-height: 100px;
        width: 80%;
        opacity: 1;
      }
    }
  }
  .road {
    position: relative;
    margin-left: -200px;
    height: 650px;
    transform: scale(0.7);
    .skill {
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 105px;
      height: 105px;
      border: solid 10px #5791ff;
      border-radius: 40px;
      background-color: #0e467f;
      filter: grayscale(1);
      cursor: pointer;
      transition: 0.5s;
      transform: scale(1);

      user-select: none;
      &-name {
        position: absolute;
        bottom: -50%;
        width: 100px;
        color: #fff;
        font-weight: 600;
        font-size: 24px;
      }
      &-img {
        transform: scale(0.45);
      }
      &.arrow {
        &-right {
          @include arrow(right, '');
          &-long {
            @include arrow(right, 'long');
          }
          &-up {
            @include arrow(right, 'up');
          }
          &-down {
            @include arrow(right, 'down');
          }
        }
      }
      &.active {
        z-index: 2;
        filter: grayscale(0);
        filter: drop-shadow(0px 0px 3px #fff);
        transform: scale(1.01);
      }
      &.active::before {
        filter: drop-shadow(0px 0px 3px #fff);
      }
      &.active::after {
        border-left-color: #fff;
        filter: drop-shadow(0px 0px 3px #fff);
      }
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    .moon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      width: 150px;
      height: 150px;
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
        font-size: 80px;
      }
      span:last-child {
        letter-spacing: 1px;
        font-size: 65px;
      }
    }
  }
  .footer {
    position: relative;
    margin-top: 400px;
    .hexcat {
      position: absolute;
      top: 100px;
      left: 70px;
      width: 200px;
    }
    .rocket {
      position: absolute;
      top: 0;
      right: 100px;
      height: 400px;
    }
  }
}
</style>
