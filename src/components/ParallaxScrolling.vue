<template lang="pug">
  #ParallaxScrolling
    .page-index(v-show="stage === 1")
      .title RANDOM CARD SUIT
      .subtitle just random card suit :)
      .suits
        .heart
        .spade
        .diamond
        .club
    .page-process(v-show="stage === 2")
      .tip
        | SCROLL DOWN
        br
        | ☟
        br
        | ☟
        br
        | ☟
      .suits
        template(v-for="index in 10")
          .heart(:class="{ 'solid': Math.round(Math.random()) }")
          .spade(:class="{ 'solid': Math.round(Math.random()) }")
          .diamond(:class="{ 'solid': Math.round(Math.random()) }")
          .club(:class="{ 'solid': Math.round(Math.random()) }")
    .page-result(v-show="stage === 3")
      .suit.solid(:class="randomSuit")
      .suitName {{ randomSuit.toUpperCase() }}
      .me
        | Create By GuaHsu ☞ (
        a(href="https://github.com/guahsu/TheF2E", target="_blank") https://github.com/guahsu/TheF2E
        | )
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap/TweenMax'
export default {
  name: 'ParallaxScrolling',
  data() {
    return {
      stage: 1
    }
  },
  computed: {
    randomSuit() {
      const suits = ['heart', 'spade', 'diamond', 'club']
      return suits[Math.floor(Math.random() * suits.length)]
    }
  },
  mounted() {
    setTimeout(() => {
      this.indexAnimation()
    }, 1)
  },
  methods: {
    indexAnimation() {
      const suits = [
        new TimelineMax(),
        new TimelineMax(),
        new TimelineMax(),
        new TimelineMax({
          onComplete: () => {
            this.stage = 2
            this.processAnimation()
          }
        })
      ]
      const offset = 400
      const color = {
        black: '#262c39',
        red: '#bd0922'
      }
      const suitConfig = [
        {
          name: 'heart',
          x: [`-=${offset}`, `+=${offset}`],
          color: color.red
        },
        {
          name: 'spade',
          y: [`-=${offset}`, `+=${offset}`],
          color: color.black
        },
        {
          name: 'diamond',
          y: [`+=${offset}`, `-=${offset}`],
          color: color.red
        },
        {
          name: 'club',
          x: [`+=${offset}`, `-=${offset}`],
          color: color.black
        }
      ]
      suits.forEach((suit, index) => {
        suit
          .set(`.page-index .${suitConfig[index].name}`, {
            x: suitConfig[index].x ? suitConfig[index].x[0] : '',
            y: suitConfig[index].y ? suitConfig[index].y[0] : '',
            '-webkit-text-stroke-color': suitConfig[index].color
          })
          .to(`.page-index .${suitConfig[index].name}`, 2, {
            x: suitConfig[index].x ? suitConfig[index].x[1] : '',
            y: suitConfig[index].y ? suitConfig[index].y[1] : ''
          })
          .to('.page-index .spade', 1, {
            scale: '1'
          })
          .to(`.page-index .${suitConfig[index].name}`, 0.5 + index, {
            className: '+=solid',
            color: suitConfig[index].color,
            scale: '1.3'
          })
          .to(`.page-index .${suitConfig[index].name}`, 1, {
            position: 'absolute',
            scale: '30'
          })
          .to(`.page-index .${suitConfig[index].name}`, 0, {
            width: '100vw',
            height: '100vh',
            backgroundColor: suitConfig[index].color
          })
        if (index === suits.length - 1) {
          suit
            .to(`.page-index > div`, 0.5, {
              color: '#cbcbcb'
            })
            .to(`.page-index > div`, 0.5, {
              opacity: '0'
            })
        }
      })
    },
    processAnimation() {
      let tipTimeline = new TimelineMax({ repeat: -1 })
      tipTimeline.set(`.page-process .tip`, {
        y: '-=15vh',
        opacity: '0.8'
      })
      tipTimeline.to(`.page-process .tip`, 1, {
        y: '+=15vh',
        opacity: '1'
      })
      tipTimeline.to(`.page-process .tip`, 1, {
        y: '-=15vh',
        opacity: '0.8'
      })
      let timelines = []
      for (let i = 0; i <= 40; i++) {
        timelines.push(new TimelineMax())
      }
      timelines.forEach((timeline, index) => {
        const windowHeight = window.innerHeight
        const startPosition = Math.random() * (windowHeight * 3) + windowHeight
        const endPosition = Math.random() * (windowHeight * 3) + startPosition
        timeline
          .set(`.page-process .suits > div:nth-child(${index})`, {
            y: `+=${startPosition}`
          })
          .to(`.page-process .suits > div:nth-child(${index})`, 1, {
            y: `-=${endPosition}`,
            fontSize: `${Math.random() * 15}vw`
          })
        if (index === timelines.length - 1) {
          timeline
            .to(`.page-process > div`, 1, {
              color: '#cbcbcb'
            })
            .to(`.page-process > div`, 1, {
              opacity: '0'
            })
        }
        timeline.pause()
      })

      let progress = 0
      window.addEventListener('scroll', () => {
        let pageHeight = document.querySelector('#app').clientHeight - window.innerHeight
        let currentY = window.scrollY
        progress = currentY / pageHeight
        timelines.forEach(timeline => {
          timeline.progress(progress)
          timeline.pause()
        })
        if (progress > 0.95) {
          this.stage = 3
          this.resultAnimation()
        }
      })
    },
    resultAnimation() {
      let timeline = new TimelineMax()
      timeline
        .to(`.page-result`, 1, {
          backgroundColor: this.randomSuit.match(/heart|diamond/) ? '#262c39' : '#bd0922'
        })
        .to(`.page-result .suitName`, 1, {
          opacity: '1'
        })
        .to(`.page-result .suit`, 1, {
          fontSize: '100vh'
        })
        .to(`.page-result .me`, 1, {
          opacity: '1',
          backgroundColor: this.randomSuit.match(/heart|diamond/) ? '#bd0922' : '#262c39'
        })
    }
  }
}
</script>

<style lang="scss">
#ParallaxScrolling {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -150px;
  width: 100vw;
  background-color: #cbcbcb;

  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
  $color-black: #262c39;
  $color-red: #bd0922;
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  @mixin suit($size, $color, $type) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color;
    font-size: $size;
    transition: inherit;

    -webkit-text-stroke-width: 0.5vw;
    -webkit-text-stroke-color: $color;
    &::after {
      color: transparent;
      font-size: inherit;

      -webkit-text-stroke-color: inherit;
      @if $type == 'heart' {
        content: '\2665\fe0e';
      }
      @if $type == 'spade' {
        content: '\2660\fe0e';
      }
      @if $type == 'diamond' {
        content: '\2666\fe0e';
      }
      @if $type == 'club' {
        content: '\2663\fe0e';
      }
    }
    &.solid::after {
      color: inherit;
    }
  }

  .page {
    &-index {
      position: relative;
      display: flex;
      overflow: hidden;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      .title {
        z-index: 1;
        color: #ffffff;
        font-weight: 700;
        font-size: 64px;
      }
      .subtitle {
        z-index: 1;
        color: #ffffff;
        font-weight: 400;
        font-size: 24px;
      }
      .suits {
        position: absolute;
        z-index: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .heart {
          @include suit(15vw, $color-black, 'heart');
        }
        .spade {
          @include suit(15vw, $color-black, 'spade');
        }
        .diamond {
          @include suit(15vw, $color-black, 'diamond');
        }
        .club {
          @include suit(15vw, $color-black, 'club');
        }
      }
    }
    &-process {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 500vh;
      .tip {
        position: absolute;
        top: 10vh;
        font-weight: 500;
        font-size: 15vh;
      }
      .suits {
        position: fixed;
        top: 50vh;
        display: flex;
        .heart {
          @include suit(2.5vw, $color-red, 'heart');
        }
        .spade {
          @include suit(2.5vw, $color-black, 'spade');
        }
        .diamond {
          @include suit(2.5vw, $color-red, 'diamond');
        }
        .club {
          @include suit(2.5vw, $color-black, 'club');
        }
      }
    }
    &-result {
      position: relative;
      display: flex;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      .suitName {
        position: fixed;
        top: 20vh;
        left: 5vw;
        color: #fff;
        font-weight: 900;
        font-size: 20vw;
        opacity: 0;
      }
      .suit {
        position: absolute;
        right: -5%;
        bottom: -30%;
      }
      .heart {
        @include suit(2.5vw, $color-red, 'heart');
      }
      .spade {
        @include suit(2.5vw, $color-black, 'spade');
      }
      .diamond {
        @include suit(2.5vw, $color-red, 'diamond');
      }
      .club {
        @include suit(2.5vw, $color-black, 'club');
      }
      .me {
        position: absolute;
        bottom: 0;
        padding: 10px 20px;
        color: #fff;
        opacity: 0;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
