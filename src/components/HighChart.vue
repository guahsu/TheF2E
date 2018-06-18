<template>
  <div class="highChart"></div>
</template>

<script>
import Highcharts from 'highcharts'
// import loadExporting from 'highcharts/modules/exporting'
// loadExporting(Highcharts)

export default {
  props: ['chartType', 'options', 'chartData'],
  name: 'highChart',
  data() {
    return {
      styles: {},
      highChart: null
    }
  },
  watch: {
    options() {
      this.initChart()
    },
    styles() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      Highcharts.setOptions({
        global: {
          useUTC: false
        },
        // 基礎尺寸
        chart: {
          spacing: [20, 20, 20, 20],
          // width: this.styles.width || 255,
          height: this.styles.height || 255,
          style: {
            margin: 'auto',
            fontSize: this.styles.baseSize || '10px'
          }
        },
        // 圖表標題
        title: {
          text: '讀取中...',
          style: {
            color: '#666',
            fontWeight: '600',
            fontSize: this.styles.titleSize || '16px'
          }
        },
        xAxis: {
          title: {
            text: ''
          },
          // X軸標籤文字
          labels: {
            style: {
              fontWeight: '600',
              fontSize: '1.2em'
            }
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          // Y軸標籤文字
          labels: {
            style: {
              fontWeight: '600',
              fontSize: '1.2em'
            }
          }
        },
        plotOptions: {
          series: {
            pointPadding: 0,
            animation: true,
            // 圖表中資料文字
            dataLabels: {
              style: {
                fontSize: '1.2em'
              }
            }
          }
        },
        legend: {
          y: -10,
          // 圖表數值標示
          itemStyle: {
            fontSize: '1.2em',
            fontWeight: '600',
            fontStyle: 'normal',
            textOverflow: 'ellipsis'
          }
        },
        tooltip: {
          // 內距
          padding: 16,
          // 滑鼠提示標題
          headerFormat: '<span style="font-size: 1.2em">{point.key}</span><br/>',
          // 滑鼠提示內容
          style: {
            fontSize: '1.2em'
          }
        },
        // logo
        credits: {
          enabled: false
        }
        //
        // lang: {
        //   thousandsSep: ',',
        //   downloadPNG: '下載成PNG',
        //   downloadJPEG: '下載成JPEG',
        //   downloadPDF: '下載成PDF',
        //   downloadSVG: '下載成SVG'
        // }
        //
        // exporting: {
        //   enabled: true,
        //   buttons: {
        //     contextButton: {
        //       align: 'right',
        //       y: -5,
        //       x: 10,
        //       menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        //     }
        //   }
        // }
      })
      this.highChart = new Highcharts.chart(this.$el, this.options)
    }
  }
}
</script>

<style lang="scss">
.highcharts-root {
  width: 100%;
  height: 100%;
}
</style>
