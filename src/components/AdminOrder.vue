<template lang="pug">
  #AdminOrder
    el-tabs.container(v-model="activeName")
      //-
      el-tab-pane(label="HOME", name="home")
        el-row.title(:gutter="0")
          el-col(:sm="11")
            h2 OVERVIEW
          el-col(:sm="9")
            el-date-picker(v-model="homeDateRange", type="daterange", range-separator="to", start-placeholder="start date", end-placeholder="end date")
          el-col(:sm="4")
            el-select(v-model="homeDateType", placeholder="請選擇")
              el-option(v-for="item in homeDateTypes", :key="item.value", :label="item.label", :value="item.value")
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
      el-tab-pane#orders(label="ORDERS", name="orders")
        el-row.title(:gutter="0")
          el-col(:sm="24")
            h2 Ordrrs
        el-row.order-table
          el-col(:sm="24")
            el-table(:data="orderData", style="width: 100%", :stripe="true", header-cell-class-name="order-table-head")
              el-table-column(label="Customer", width="140", align="center")
                template(slot-scope="scope")
                  i.far.fa-check-square
                  span(style="margin-left: 10px") {{ scope.row.customerName }}
              el-table-column(label="Product List", width="160")
                template(slot-scope="scope")
                  table.order-table-products
                    template(v-for="data in scope.row.productList")
                      tr
                        td.order-table-products-name(colspan="2") {{ data.name }}
                        td
                      tr
                        td.order-table-products-price(colspan="2") ${{ data.price.toLocaleString() }}
                        td.order-table-products-count {{ data.qty.toLocaleString() }}
              el-table-column(label="Total", prop="total", width="100", align="right")
                template(slot-scope="scope") ${{ scope.row.total.toLocaleString() }}
              el-table-column(label="Add to Cart", prop="addTime", width="110")
              el-table-column(label="Check-out", prop="checkoutTime", width="110")
              el-table-column(label="Address", prop="address", width="220")
              el-table-column(label="status", align="center", width="100")
                template(slot-scope="scope")
                  el-select(v-model="orderStatus", placeholder="請選擇")
                    el-option(v-for="item in orderStatusType", :key="item.value", :label="item.label", :value="item.value")
          el-col(:sm="24").page
            el-pagination(layout="prev, pager, next", :total="50", background)
      //-
      el-tab-pane#products(label="PRODUCT", name="product")
        el-row.title(:gutter="0")
          el-col(:sm="18")
            h2 Products
          el-col.buttons(:sm="6")
            el-button(type='primary', @click="dialogTableVisible = true") Add Product
        el-row.product-table
          el-col(:sm="24")
            el-table(:data="productData", style="width: 100%", :stripe="true", header-cell-class-name="product-table-head")
              el-table-column(label="Product", width="260", align="center")
                .product-table-name(slot-scope="scope")
                  i.far.fa-check-square
                  img(:src="scope.row.image")
                  span(style="margin-left: 10px") {{ scope.row.productName }}
              el-table-column(label="Original", prop="total", width="100", align="right")
                template(slot-scope="scope") ${{ scope.row.originPrice.toLocaleString() }}
              el-table-column(label="Discount", prop="total", width="100", align="right")
                template(slot-scope="scope") ${{ scope.row.discountPrice.toLocaleString() }}
              el-table-column(label="Size / Color / Inventory", width="400", align="center")
                template(slot-scope="scope")
                  table.product-table-info
                    template(v-for="data in scope.row.options")
                      tr
                        td.product-table-info-size
                          span {{ data.size }}
                        td.product-table-info-color
                          div(v-for="(color, index) in data.color" :key="index")
                            | {{ color }}
                        td.product-table-info-inventory
                          div(v-for="(value, index) in data.inventory" :key="index")
                            | {{ value }}
              el-table-column(label="status", align="center", width="100")
                template(slot-scope="scope")
                  el-select(v-model="orderStatus", placeholder="請選擇")
                    el-option(v-for="item in orderStatusType", :key="item.value", :label="item.label", :value="item.value")
          el-col(:sm="24").page
            el-pagination(layout="prev, pager, next", :total="50", background)
        <el-dialog title="Add New Product" custom-class="product-add" :visible.sync="dialogTableVisible">
          el-row(:gutter="30")
            el-col.upload-area(:sm="10")
              .upload-area-file
                i.fas.fa-cloud-upload-alt
                span Drag an image or click here to upload…
              el-row(:gutter="8").upload-area-images
                el-col(:sm="8")
                  img(src="https://fakeimg.pl/120x120/")
                el-col(:sm="8")
                  img(src="https://fakeimg.pl/120x120/")
                el-col(:sm="8")
                  img(src="https://fakeimg.pl/120x120/")
                el-col(:sm="8")
                  img(src="https://fakeimg.pl/120x120/")
                el-col(:sm="8")
                  img(src="https://fakeimg.pl/120x120/")
            el-col.info-area(:sm="14")
              .info-area-title Product Discription
              el-input.info-area-name(v-model='input', placeholder='product name')
              el-input.info-area-desc(type='textarea', :rows='5', placeholder='product desc', v-model='textarea')
              .info-area-title Price
              el-row(:gutter="8").info-area-prices
                el-col(:sm="12")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Original
                el-col(:sm="12")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Discount
              .info-area-title Specification
              el-row(:gutter="8").info-area-specs
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Size
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Color
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Inventory
              el-row(:gutter="8").info-area-specs
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Size
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Color
                el-col(:sm="8")
                  el-input(placeholder='0', v-model='input3')
                    template(slot='prepend') Inventory
              el-row
                el-col(:sm="24")
                el-button.info-area-specs-add(type='primary') ADD NEW SPECIFICATION
              .info-area-buttons
                  el-button(type='text') SAVE DRAFT
                  el-button(type='primary') PUBLISH
        </el-dialog>
</template>

<script>
import Highcharts from 'highcharts'
export default {
  name: 'adminOrder',
  data() {
    return {
      activeName: 'home',
      homeDateRange: ['2018-06-01', '2018-06-20'],
      homeDateType: 'Monthly',
      homeDateTypes: [
        {
          value: 'daily',
          label: 'Daily'
        },
        {
          value: 'weekly',
          label: 'Weelky'
        },
        {
          value: 'Monthly',
          label: 'Monthly'
        },
        {
          value: 'yearly',
          label: 'Yearly'
        },
        {
          value: 'custom',
          label: 'Custom'
        }
      ],
      orderStatus: 'done',
      orderStatusType: [
        {
          value: 'paid',
          label: 'Paid'
        },
        {
          value: 'unpaid',
          label: 'Unpaid'
        },
        {
          value: 'shipping',
          label: 'Shipping'
        },
        {
          value: 'done',
          label: 'Done'
        }
      ],
      orderData: [
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            },
            {
              name: 'Fusce vehicu.',
              price: 800,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        },
        {
          customerName: 'IanMedina',
          productList: [
            {
              name: 'Vestibulum.',
              price: 1400,
              qty: 1
            }
          ],
          total: 2200,
          addTime: '2018-06-08 13:39',
          checkoutTime: '2018-06-08 20:23',
          address: '386 Windler Drives Apt. 358'
        }
      ],
      productData: [
        {
          image: 'https://fakeimg.pl/50x50/',
          productName: 'Mauris non tem.',
          originPrice: 3200,
          discountPrice: 2800,
          options: [
            {
              size: 'L',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'M',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'S',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            }
          ]
        },
        {
          image: 'https://fakeimg.pl/50x50/',
          productName: 'Mauris non tem.',
          originPrice: 3200,
          discountPrice: 2800,
          options: [
            {
              size: 'L',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'M',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'S',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            }
          ]
        },
        {
          image: 'https://fakeimg.pl/50x50/',
          productName: 'Mauris non tem.',
          originPrice: 3200,
          discountPrice: 2800,
          options: [
            {
              size: 'L',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'M',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'S',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            }
          ]
        },
        {
          image: 'https://fakeimg.pl/50x50/',
          productName: 'Mauris non tem.',
          originPrice: 3200,
          discountPrice: 2800,
          options: [
            {
              size: 'L',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'M',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            },
            {
              size: 'S',
              color: ['Gray', 'Black'],
              inventory: [15, 20]
            }
          ]
        }
      ],
      dialogTableVisible: false,
      addInput: ''
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 50px;
  width: 100%;
  background: #f2f2f2;
  * {
    box-sizing: border-box;
  }
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
      margin-bottom: 24px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebebeb;
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
          flex: 2;
          margin-right: 20px;
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
        margin-left: 20px;
        width: 60%;
        color: #9b9b9b;
        font-size: 16px;
        .row {
          position: relative;
          margin-bottom: 8px;
          width: 100%;
        }
        .name {
          color: #000000;
          font-weight: 900;
          font-size: 20px;
        }
        .time {
          svg {
            margin-right: 8px;
            color: #757575;
            font-size: 14px;
          }
        }
        .user {
          svg {
            margin-right: 12px;
            margin-left: 4px;
            color: #757575;
            font-size: 14px;
          }
        }
        .total {
          position: absolute;
          right: 0;
          color: #000000;
          font-size: 14px;
        }
        .amount {
          position: absolute;
          right: 0;
          color: #000000;
          font-weight: 900;
          font-size: 20px;
        }
      }
    }
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td,
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    background: none;
  }
  .page {
    margin: 20px 0;
    text-align: right;
  }
  #orders {
    .order-table {
      &-head {
        color: #000000;
        font-size: 16px;
      }
      &-products {
        width: 100%;
        border: none !important;
        line-height: 0.8;
        tr:nth-child(odd) > td {
          padding-top: 20px;
          border: none !important;
          line-height: 0;
        }
        &-name {
        }
        &-price {
          color: #9b9b9b;
          font-size: 14px;
          line-height: 21px;
        }
      }
    }
  }
  #products {
    .buttons {
      text-align: right;
    }
    .product-add {
      min-width: 400px;
      width: 70%;
      .upload-area {
        &-file {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 8px;
          height: 115px;
          background: #ebebeb;
          color: #757575;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          cursor: pointer;
          svg {
            margin-bottom: 10px;
            font-size: 40px;
          }
        }
        &-images {
          img {
            margin-bottom: 4px;
          }
        }
      }
      .info-area {
        &-title {
          color: #373a3c;
          text-align: left;
          letter-spacing: 0;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        &-name, &-prices, &-specs {
          margin-bottom: 8px;
        }
        &-desc {
          margin-bottom: 20px;
        }
        &-specs-add {
          width: 100%;
          margin-bottom: 40px;
        }
        &-buttons {
          text-align: right;
        }
      }
    }
    .product-table {
      &-head {
        color: #000000;
        font-size: 16px;
      }
      &-name {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 15px;
          width: 50px;
          height: 50px;
        }
      }
      td {
        width: 130px;
      }
    }
  }
}
</style>
