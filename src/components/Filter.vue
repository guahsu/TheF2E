<template lang="pug">
  #filter(v-loading="stageData.length === 0")
    .header
      .logo HaveFun
      .search
        i.el-icon-search
        input(v-model="keyword", type="text", placeholder="search keyword from url")
    .container
      .aside
        .filter.location
          .title Stage
          select(v-model="selectedStage")
            option(v-for="(stage, index) in stageList" :key="index" :value="stage.value") {{ stage.name }}
        .filter.date
          .title Date
          .from from
            input.input(v-model="startDate", type="date")
          .to to
            input.input(v-model="endDate", type="date")
        .filter.tags
          .title Tags
          .checkbox(v-for="(tag, index) in tagData", :key="index")
            span(v-show='tag.checked')
              i.checkbox--checked.fas.fa-check-square
            span(v-show='!tag.checked')
              i.checkbox--unchecked.fas.fa-square
            input(:id="tag.name" v-model='tag.checked', type='checkbox')
            label(:for="tag.name") {{ tag.name }}
        a.guahsu(href="https://github.com/guahsu/TheF2E", target="_blank") https://github.com/guahsu/TheF2E
      .content
        .info
          | Showing
          span.resultCnt {{ ` ${dataList.length} ` }}
          | results by ...
        .tags
          .tag(v-for="(tag, index) in tagData" v-if="tag.checked") {{ tag.name }}
            i.remove.el-icon-circle-close-outline(@click="removeTag(index)")
        .card(v-for="(data, index) in dataList" :key="index")
          // img.card-img(:src="data.Picture1")
          .card-info
            .row
              a.title(:href="data.url", target="_blank") {{ data.url }}
            .row
              span.icon
                i.far.fa-calendar-alt
                | {{ data.uploadTime }}
            .row
              span.icon
                i.fas.fa-tags
                .tag(v-for="(tag, index) in data.tags", :key="index") {{ tag }}
</template>

<script>
import axios from 'axios'

export default {
  name: 'filter',
  data() {
    return {
      keyword: '',
      startDate: '',
      endDate: '',
      stage: '',
      selectedStage: 1,
      stageList: [{ name: '1-TodoList', value: 1 }, { name: '2-Filter', value: 2 }],
      stageData: [],
      tagData: []
    }
  },
  computed: {
    // loading() {
    //   return Boolean(!this.stageData || !this.tagData)
    // },
    dataList() {
      const keywordReg = new RegExp(this.keyword ? this.keyword.replace(/\\/g, '') : `.*`, 'gi')
      const tagReg = new RegExp(this.selectedTags ? `${this.selectedTags.join('')}.*` : `.*`, 'gi')
      return this.stageData.filter(data => {
        return (
          data.url.match(keywordReg) &&
          data.tags.join().match(tagReg) &&
          data.timeStamp > new Date(this.startDate || '2018-01-01').getTime() &&
          data.timeStamp < new Date(this.endDate || '2019-01-01').getTime()
        )
      })
    },
    selectedTags() {
      return this.tagData.filter(item => item.checked).map(item => `(?=.*${item.name})`)
    }
  },
  watch: {
    selectedStage() {
      this.stageData = []
      this.getData()
    }
  },
  methods: {
    getData() {
      return axios
        .get('https://www.thef2e.com/api/codeList', {
          params: {
            stage: this.selectedStage
          }
        })
        .then(res => {
          this.stageData = res.data.sort((a, b) => a.timeStamp - b.timeStamp).map(item => {
            return {
              tags: item.tag.split(',').sort((a, b) => a.length - b.length),
              timeStamp: item.timeStamp,
              uploadTime: new Date(item.timeStamp).toLocaleString(),
              url: item.url
            }
          })
        })
        .catch(err => console.log(err))
    },
    getTagList() {
      return axios
        .get('https://www.thef2e.com/api/tagList')
        .then(res => {
          this.tagData = res.data.sort((a, b) => a.localeCompare(b)).map(item => {
            return {
              name: item,
              checked: false
            }
          })
        })
        .catch(err => console.log(err))
    },
    removeTag(index) {
      this.tagData[index].checked = false
    }
  },
  mounted() {
    this.getData()
    this.getTagList()
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  outline-width: 0;
}
body {
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
}
#filter {
  min-width: 1200px;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 92px;
  background-color: #7828b4;
  .logo {
    flex: 4;
    // padding: 20px;
    color: #ffffff;
    font-size: 36px;
    font-family: Optima-ExtraBlack;
  }
  .search {
    display: flex;
    align-items: center;
    flex: 8;
    justify-content: flex-start;
    margin-top: 10px;
    padding: 20px;
    i {
      position: absolute;
      color: #ffffff;
      font-size: 20px;
    }
    input {
      padding: 5px 40px;
      width: 388px;
      border: none;
      border-bottom: solid 1px #ffffff;
      background-color: #7828b4;
      color: #ffffff;
      font-size: 20px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-weight: 600;
        font-style: italic;
      }
    }
  }
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: #f2f2f2;
  .aside {
    display: flex;
    align-items: center;
    flex: 4;
    flex-direction: column;
    height: 100%;
    text-align: center;
    .guahsu {
      margin-top: 20px;
      font-weight: 900;
    }
    .filter {
      padding: 24px 40px;
      width: 300px;
      border-bottom: 1px solid #d7d7d7;
      background-color: #ebebeb;
      text-align: left;
      .title {
        margin-bottom: 15px;
        color: #000000;
        font-weight: 600;
        font-size: 20px;
      }
      &.location {
        select {
          padding: 10px;
          width: 100%;
          height: 40px;
          border: none;
          font-weight: 500;
        }
      }
      &.date {
        .from,
        .to {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 15px;
          text-align: right;
          font-weight: 500;
          input {
            margin-left: 10px;
            padding: 10px;
            width: 170px;
            height: 40px;
            border: none;
          }
        }
      }
      &.tags {
        border-bottom: none;
        .checkbox {
          position: relative;
          margin: 5px 0;
          font-weight: 500;
          cursor: pointer;

          user-select: none;
          &--checked {
            color: #7828b4;
          }
          &--unchecked {
            color: #ffffff;
          }
          input {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
          label {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .content {
    display: flex;
    align-items: flex-start;
    flex: 8;
    flex-direction: column;
    justify-content: flex-start;
    padding: 42px 0;
    height: 100%;
    text-align: left;
    .info {
      margin-bottom: 15px;
      font-weight: 500;
      font-size: 24px;
      .resultCnt {
        color: #7828b4;
        font-weight: 600;
        font-size: 28px;
      }
    }
    .tags {
      margin-bottom: 32px;
      user-select: none;
      .tag {
        display: inline-block;
        margin-right: 8px;
        padding: 8px 16px;
        border: 1px solid #7828b4;
        border-radius: 100px;
        color: #7828b4;
        font-weight: 500;
        font-style: italic;
        font-size: 16px;
        cursor: normal;
        transition: 0.25s;
        .remove {
          margin-left: 10px;
          font-size: 14px;
          cursor: pointer;
        }
        &:hover {
          background-color: #7828b4;
          color: #ffffff;
        }
      }
    }
    .card {
      display: flex;
      margin-bottom: 24px;
      transition: 0.35s;
      font-size: 16px;
      &-img {
        width: 220px;
        background: #333;
      }
      &-info {
        padding: 24px 20px 14px 20px;
        width: 780px;
        background-color: #fff;
        .row {
          margin-bottom: 16px;
          overflow: hidden;
        }
        .title {
          color: #522678;
          text-decoration: none;
          font-weight: 900;
          font-size: 24px;
        }
        .desc {
          overflow: hidden;
          height: 50px;
          text-align: left;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
        .tag {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 2px 16px;
          border-radius: 100px;
          background-color: #d7d7d7;
          color: #ffffff;
          font-weight: 600;
          font-style: italic;
          font-size: 16px;
          cursor: normal;
          transition: 0.25s;
        }
        .icon {
          margin-right: 20px;
          color: #9b9b9b;
          font-weight: 500;
          svg {
            margin-right: 7px;
            color: #000000;
            font-weight: 100;
          }
        }
      }
      &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
