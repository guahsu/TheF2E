<template lang="pug">
  #AdminOrder
    el-tabs.container(v-model="activeName")
      //-
      el-tab-pane(label="HOME", name="home")
        el-row.title(:gutter="10")
          el-col(:sm="18")
            h2 OVERVIEW
          el-col(:sm="6")
            | 2016/06/06
        el-row(:gutter="20")
          el-col(:sm="8")
            el-card.card(shadow="never")
              .card-icon
                i.fas.fa-hand-holding-usd
                | TOTAL REVENUE
              .card-value.card-value--revenue
                | 54,540
          el-col(:sm="8")
            el-card.card(shadow="never")
              .card-icon
                i.fas.fa-boxes
                | TOTAL COST
              .card-value.card-value--cost
                | 12,660
          el-col(:sm="8")
            el-card.card(shadow="never")
              .card-icon
                i.fas.fa-money-bill-alt
                | TOTAL NET INCOME
              .card-value.card-value--income
                | 41,880
        el-row(:gutter="20")
          el-col
            el-card.card(shadow="never")
              #lineChart
        el-row(:gutter="20")
          el-col(:sm="12")
            el-card.card(shadow="never")
              h2 Transaction Website
              .card-website
                span
                  i.fab.fa-facebook
                span.name Facebook.com
                span.value 45,836
                span.up
                  i.fas.fa-arrow-up
                  | 20%
              .card-website
                span
                  i.fab.fa-google
                span.name Google.com
                span.value 23,582
                span.up
                  i.fas.fa-arrow-up
                  | 12%
              .card-website
                span
                  i.fab.fa-reddit
                span.name Reddit.com
                span.value 2,489
                span.down
                  i.fas.fa-arrow-down
                  | 15%
              .card-website
                span
                  i.fab.fa-wordpress
                span.name Wordpress.com
                span.value 1,057
                span.down
                  i.fas.fa-arrow-down
                  | 30%
          el-col(:sm="12")
            el-card.card(shadow="never")
              h2 Latest Orders
              .card-latestOrder
                img.img(src="https://fakeimg.pl/100x100/")
                .info
                  .row
                    .name
                      | VinTage T-shirt
                  .row
                    span.time
                      i.fas.fa-clock
                      | 2018/6/13  13:42
                    span.total
                      | Total
                  .row
                    span.user
                      i.fas.fa-male
                      | Belle Willis
                    span.amount
                      | 3,200
              .card-latestOrder
                img.img(src="https://fakeimg.pl/100x100/")
                .info
                  .row
                    .name
                      | VinTage T-shirt
                  .row
                    span.time
                      i.fas.fa-clock
                      | 2018/6/13  13:42
                    span.total
                      | Total
                  .row
                    span.user
                      i.fas.fa-male
                      | Belle Willis
                    span.amount
                      | 3,200
              .card-latestOrder
                img.img(src="https://fakeimg.pl/100x100/")
                .info
                  .row
                    .name
                      | VinTage T-shirt
                  .row
                    span.time
                      i.fas.fa-clock
                      | 2018/6/13  13:42
                    span.total
                      | Total
                  .row
                    span.user
                      i.fas.fa-male
                      | Belle Willis
                    span.amount
                      | 3,200
      //-
      el-tab-pane(label="ORDERS", name="orders")
      el-tab-pane(label="PRODUCT", name="produce")
</template>

<script>
import Highcharts from 'highcharts'
export default {
  name: 'adminOrder',
  data() {
    return {
      activeName: 'home',
      tableData6: [
        {
          id: '12987121',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    }
  },
  mounted() {
    this.buildChart()
  },
  methods: {
    buildChart() {
      Highcharts.chart('lineChart', {
        chart: {
          height: 400
        },
        title: {
          text: 'Activity'
        },
        yAxis: {
          title: ' '
        },
        series: [
          {
            data: [4393, 5250, 5717, 6965, 9703, 11993, 13713, 15417]
          },
          {
            data: [2491, 2406, 2974, 11993, 13713, 15417, 17417, 19417]
          },
          {
            data: [1174, 3444, 5678, 9873, 8654, 6533, 4255, 3938]
          }
        ],
        colors: ['#7ED321', '#4A90E2', '#D0021B'],
        credits: {
          enabled: false
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#AdminOrder {
  * {
    box-sizing: border-box;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 50px;
  width: 100%;
  background: #f2f2f2;
  h2 {
    margin: 0;
  }
  .el-tabs {
    &__item {
      width: 150px;
      text-align: center;
      font-size: 20px;
    }
  }
  .container {
    padding: 20px;
    max-width: 1000px;
    width: 100%;
    text-align: left;
  }
  .title {
    display: flex;
    align-items: flex-end;
    margin: 20px 0;
  }
  .el-card__body {
    width: 100%;
    h2 {
      margin-bottom: 20px;
    }
  }
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px 30px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 0 10px 5px #ebebeb;
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      svg {
        margin-right: 8px;
        font-size: 25px;
      }
    }
    &-value {
      margin-top: 20px;
      text-align: center;
      font-size: 36px;
      &--revenue {
        color: #7ed321;
      }
      &--cost {
        color: #d0021b;
      }
      &--income {
        color: #4a90e2;
      }
    }
    &-website:not(:last-child) {
      padding-bottom: 8px;
      border-bottom: 1px solid #ebebeb;
      margin-bottom: 24px;
    }
    &-website {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span {
        margin: 0 10px 14px 0;
        &.name {
          flex: 4;
          color: #9b9b9b;
          font-size: 16px;
        }
        &.value {
          margin-right: 20px;
          flex: 2;
          color: #000000;
          text-align: right;
          font-size: 20px;
        }
        &.up {
          flex: 2;
          color: #7ed321;
          font-size: 16px;
        }
        &.down {
          flex: 2;
          color: #d0021b;
          font-size: 16px;
        }
        svg {
          margin-right: 5px;
          font-size: 45px;
          &.fa-arrow {
            &-up,
            &-down {
              font-size: 18px;
            }
          }
        }
      }
    }
    &-latestOrder:not(:last-child) {
      padding-bottom: 8px;
      border-bottom: 1px solid #ebebeb;
    }
    &-latestOrder {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 8px;
      .img {
        width: 100px;
        height: 100px;
        background-color: #333;
      }
      .info {
        width: 60%;
        margin-left: 20px;
        font-size: 16px;
        color: #9b9b9b;
        .row {
          position: relative;
          width: 100%;
          margin-bottom: 8px;
        }
        .name {
          font-size: 20px;
          color: #000000;
          font-weight: 900;
        }
        .time {
          svg {
            font-size: 14px;
            margin-right: 8px;
            color: #757575;
          }
        }
        .user {
          svg {
            font-size: 14px;
            margin-left: 4px;
            margin-right: 12px;
            color: #757575;
          }
        }
        .total {
          position: absolute;
          right: 0;
          font-size: 14px;
          color: #000000;
        }
        .amount {
          position: absolute;
          right: 0;
          font-size: 20px;
          font-weight: 900;
          color: #000000;
        }
      }
    }
  }
}
</style>
