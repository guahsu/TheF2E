<template lang="pug">

</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'CanvasGame',
  data() {
    return {}
  },
  mounted() {
    // 我根本不知道怎麼在vue裡面組織pixi ：）全部寫在monted測試
    let app = new PIXI.Application({ antialias: true, resolution: 2 })
    // resolution = 2 for retina, autoresize ＆ resize 避免畫布變兩倍大
    app.renderer.autoResize = true
    app.renderer.resize(800, 600)
    // # => 0x
    app.renderer.backgroundColor = 0x001d2e
    // 把app塞到這個 component 裡面
    this.$el.appendChild(app.view)
    // 畫兩個圈圈當背景
    let backgroundCircle = new PIXI.Graphics()
    backgroundCircle.beginFill(0x001d2e)
    backgroundCircle.lineStyle(2, 0x7a7c7d, 1)
    backgroundCircle.drawCircle(400, 300, 240)
    backgroundCircle.lineStyle(2, 0xcbd4d8, 1)
    backgroundCircle.drawCircle(400, 300, 150)
    backgroundCircle.endFill()
    app.stage.addChild(backgroundCircle)
    // 畫一個方形
    let rectangle = new PIXI.Graphics()
    rectangle.beginFill(0xe7465d)
    rectangle.drawRect(60, 180, 64, 64)
    rectangle.endFill()
    app.stage.addChild(rectangle)
    // 畫一個圓形
    let circle = new PIXI.Graphics()
    circle.beginFill(0xf5af5f)
    circle.drawCircle(700, 100, 50)
    circle.endFill()
    app.stage.addChild(circle)
    // 畫一個三角型
    let triangle = new PIXI.Graphics()
    triangle.beginFill(0x3676bb)
    triangle.drawPolygon([-32, 64, 32, 64, 0, 0])
    triangle.endFill()
    triangle.x = 580
    triangle.y = 400
    app.stage.addChild(triangle)
    // 開始按鈕
    let ellipse = new PIXI.Graphics()
    ellipse.beginFill(0x001d2e)
    ellipse.lineStyle(2, 0xffffff, 1)
    ellipse.drawRoundedRect(325, 325, 150, 40, 15)
    ellipse.endFill()
    app.stage.addChild(ellipse)
    // 說明文字
    let style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 16, fill: 'white' })
    let message = new PIXI.Text(
      '你身負著一週要完成一個canvas遊戲的任務\n卻發現自己是第一次研究好像無法做完\n一起來學習如何完成吧，按下Start開始',
      style
    )
    message.position.set(20, 520)
    app.stage.addChild(message)
    // Ahhh
    let ah = new PIXI.Text('啊啊啊啊啊!', style)
    ah.position.set(100, 300)
    app.stage.addChild(ah)
    // Start
    let iDontKnowHowToStartMove = false
    let iDontKnowHowToStart = new PIXI.Text('START!', style)
    iDontKnowHowToStart.position.set(375, 335)
    iDontKnowHowToStart.interactive = true
    iDontKnowHowToStart.buttonMode = true
    iDontKnowHowToStart.on('click', () => {
      iDontKnowHowToStartMove = true
      iDontKnowHowToStart.text = '對不起，其實我不知道如何Start ... QQQQQQQQ'
    })
    app.stage.addChild(iDontKnowHowToStart)
    // 事件
    app.ticker.add(function(delta) {
      circle.rotation += 0.001 * delta
      rectangle.rotation -= 0.1 * delta
      triangle.rotation += 0.03 * delta
      ah.rotation += 0.1 * delta
      if (iDontKnowHowToStartMove) {
        let { x, y } = app.renderer.plugins.interaction.mouse.global
        iDontKnowHowToStart.x = x - 100
        iDontKnowHowToStart.y = y + 50
      }
    })
  }
}
</script>
