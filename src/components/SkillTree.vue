<template lang="pug">
  #SkillTree
    .head
      .moon
        img(src="~@/assets/week9/img_illustration.png")
      .title
        span 介面設計師轉職之路
        span UI Designer Road Map
    .road
      .column(
        v-for="(skills, index) in columnGroup"
        :key="index"
        )
        .skill(
          v-for="(skill, index) in skills"
          @click="toggleActive(skill)"
          @mouseover="hoverId = skill.id"
          @mouseleave="hoverId = null"
          :class="[{ active: activeSkillIds.includes(skill.id) }, `row${skill.row}`, `arrow-${skill.arrowStyle}`, `position-${skill.position}`]"
          :key="index"
          )
          img(:src="skill.img")
    .info
      .info-content(:class="{ open: hoverId !== null }")
        .info-content-message(v-if="hoverId !== null")
          img.info-content-img(:src="hoverInfo.img")
          .info-content-data
            span.info-content-name {{ hoverInfo.name }}
            span {{ hoverInfo.info }}
      img.monocat(src="~@/assets/week9/img_monocat.png")
    img.hexcat(src="~@/assets/week9/img_hexcat.png")
    img.rocket(src="~@/assets/week9/img_rocket.png")
</template>

<script>
import blade1 from '../assets/week9/img_blade-1.png'
import meat from '../assets/week9/img_meat.png'
import shield from '../assets/week9/img_shield.png'
import hat from '../assets/week9/img_hat.png'
import horn from '../assets/week9/img_horn.png'
import hammer from '../assets/week9/img_hammer.png'
export default {
  name: 'SkillTree',
  data() {
    return {
      hoverId: null,
      activeSkillIds: [],
      skills: [
        {
          id: 1,
          name: '設計規範',
          requirement: { type: 'or', ids: [] },
          nextIds: [2, 6],
          img: blade1,
          info: 'UI設計跟平面設計最大的不同是，因為具有功能、要被操作且須遵守規範，雖然難啃但不失為初心者必備武器。',
          column: 1,
          position: '',
          arrowStyle: 'right-long'
        },
        {
          id: 2,
          name: '爬梳乾貨',
          requirement: { type: 'or', ids: [1] },
          nextIds: [6],
          img: meat,
          info: '這行沒什麼大學科系可選擇，與IT產業相同的是需仰賴大量的閱讀與自學，不管是新手村或職業都是。',
          column: 3,
          position: '',
          arrowStyle: 'right'
        },
        {
          id: 3,
          name: 'UX思維',
          requirement: { type: 'or', ids: [] },
          nextIds: [4, 5, 6],
          img: shield,
          info: '使用者體驗(User Experience)是指一個人使用一個特定產品或系統或服務時的行為、情緒與態度。',
          column: 1,
          position: '',
          arrowStyle: 'right'
        },
        {
          id: 4,
          name: '設計思考',
          requirement: { type: 'or', ids: [3] },
          nextIds: [5, 6],
          img: hat,
          info: '使用者體驗(User Experience)是指一個人使用一個特定產品或系統或服務時的行為、情緒與態度。',
          column: 2,
          position: 'end',
          arrowStyle: 'right'
        },
        {
          id: 5,
          name: '心理學',
          requirement: { type: 'or', ids: [4] },
          nextIds: [6],
          img: horn,
          info:
            '線框稿中的元素應該是非常精簡的，通常設計師只會使用方框、線和灰階的底圖 (來表現不同的階層)。某些內容在初期還未確定或實作時，可先利用方框或假文字來表示，例如:圖片、影片與文字等等。',
          column: 3,
          position: '',
          arrowStyle: 'right'
        },
        {
          id: 6,
          name: '線框稿',
          requirement: { type: 'or', ids: [2, 5] },
          nextIds: [],
          img: hammer,
          info:
            '線框稿中的元素應該是非常精簡的，通常設計師只會使用方框、線和灰階的底圖 (來表現不同的階層)。某些內容在初期還未確定或實作時，可先利用方框或假文字來表示，例如:圖片、影片與文字等等。',
          column: 4,
          position: 'center',
          arrowStyle: ''
        }
      ]
    }
  },
  computed: {
    hoverInfo() {
      return this.skills.find(skill => skill.id === this.hoverId)
    },
    columnGroup() {
      // 笨方法草稿, @TODO:改reduce
      const column1 = this.skills.filter(skill => skill.column === 1)
      const column2 = this.skills.filter(skill => skill.column === 2)
      const column3 = this.skills.filter(skill => skill.column === 3)
      const column4 = this.skills.filter(skill => skill.column === 4)
      return [column1, column2, column3, column4]
    }
  },
  methods: {
    check(target) {
      const skillReg = target.requirement.type === 'or'
        ? new RegExp(`${target.requirement.ids.join('|')}`, 'g')
        : new RegExp(`${target.requirement.ids.map(id => `(?=.*${id})`).join('')}.*`, 'g')
      return this.activeSkillIds.join().match(skillReg)
    },
    removeActiveSkill(id) {
      const index = this.activeSkillIds.indexOf(id)
      if (index !== -1) {
        this.activeSkillIds.splice(index, 1)
      }
    },
    toggleActive(target) {
      if (this.activeSkillIds.includes(target.id)) {
        this.removeActiveSkill(target.id)
        target.nextIds.forEach(id => {
          const skill = this.skills.find(skill => skill.id === id)
          !this.check(skill) && this.removeActiveSkill(skill.id)
        })
      } else if (this.check(target)) {
        this.activeSkillIds.push(target.id)
      }
    }
  }
}
</script>

<style lang="scss">
#SkillTree {
  position: relative;
  overflow: auto;
  min-height: 1000px;
  width: 100vw;
  background-image: url('~@/assets/week9/bg.png'), linear-gradient(#301a3b, #10030a);
  background-position: bottom;
  background-repeat: no-repeat;
  @mixin arrow($direction, $size) {
    @if $direction == 'right' {
      &::before {
        position: absolute;
        top: 50%;
        left: 110%;
        width: 70px * $size;
        height: 20px;
        background-color: #bec5d0;
        content: '';
        transform: translateY(-50%);
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 70px * $size + 90px;
        border-width: 20px 0 20px 30px;
        border-style: solid;
        border-color: transparent transparent transparent #bec5d0;
        content: '';
        transform: translateY(-50%);
      }
    }
  }
  * {
    box-sizing: border-box;
  }
  .info {
    .monocat {
      position: absolute;
      top: 85vh;
      left: 15vw;
      height: 30vh;
    }
    &-content {
      position: absolute;
      top: 85vh;
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
      &-data {
        display: flex;
        flex-direction: column;
      }

      &-name {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 4.5vh;
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
    margin-top: 10vh;
    margin-bottom: 20vh;
    .column {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-between;
      height: 230px;
    }
    .skill {
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
      transform: scale(1);

      user-select: none;
      &.arrow {
        &-right {
          @include arrow(right, 1);
        }
        &-right-long {
          @include arrow(right, 4);
        }
      }
      &.active {
        z-index: 2;
        filter: grayscale(0);
        filter: drop-shadow(0px 0px 5px #fff);
        transform: scale(1.01);
      }
      &.active::before {
        background-color: #fff;
        filter: drop-shadow(0px 0px 5px #fff);
      }
      &.active::after {
        border-left-color: #fff;
        filter: drop-shadow(0px 0px 5px #fff);
      }
      &.row2 {
        position: absolute;
        margin-top: 300px;
      }
      &.position {
        &-center {
          margin: auto;
        }
        &-end {
          margin-top: auto;
        }
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
