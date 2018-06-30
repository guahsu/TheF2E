<template lang="pug">
  el-container#Index
    el-header.header
      h1.title 六角學院 TheF2E 前端挑戰
      h2.subtitle 目前參賽人數：{{ singUpTotal }}
    el-main.main
      el-tabs(v-model="activeName")
        el-tab-pane(label="作品列表", name="first", v-loading="tagList.length === 0 || dataLoading")
          .filter
            el-row(:gutter="10")
              el-col(:xs="24", :md="8")
                | 挑戰題目：
                el-select.selector(v-model="selectedStage", placeholder="選擇挑戰題目")
                  el-option(
                    v-for="stage in stageList",
                    :key="stage.value",
                    :label="stage.label",
                    :value="stage.value"
                  )
              el-col(:xs="24", :md="8")
                | 上傳日期：
                el-date-picker.date-picker(
                  v-model="dateRange",
                  type="daterange",
                  range-separator="-",
                  value-format="yyyy-M-dd"
                  start-placeholder="起始日期",
                  end-placeholder="結束日期"
                  :picker-options="datePickerOptions"
                )
              el-col(:xs="24", :md="8")
                | 網址搜尋：
                el-input.keyword(v-model="keyword", placeholder="輸入關鍵字")
            el-row(:gutter="10")
              el-col(:xs="24", :offset="0")
                el-checkbox-group(v-model="selectedTags")
                  el-checkbox(v-for="(tag, index) in tagList", :key="index", :label="tag")
          .codeList
            el-row(:gutter="10")
              | 共有 {{ filterData.length }} 筆資料
              el-col(:xs="24")
                el-card.card(shadow="hover", v-for="(code, index) in codeList", :key="index")
                  .img(v-if="checkImage(code.url)")
                    i.el-icon-loading
                    img(:src="getImage(code.url)", onerror="this.onerror=null;this.src='https://s3-us-west-2.amazonaws.com/m.cdpn.io/default-project-screenshot-small.png'")
                  .info
                    .row
                      span.icon.date
                        i.far.fa-calendar-alt
                        | {{ code.uploadTime }}
                    .row
                      span.icon
                        i.fas.fa-link
                        a.link(:href="code.url", target="_blank") {{ code.url }}
                    .row
                      span.icon
                        i.fas.fa-tags
                        .tag(v-for="(tag, index) in code.tags", :key="index", :class="{'acitve' : selectedTagsRegexp && tag.match(selectedTagsRegexp) }")
                          | {{ tag }}
            el-pagination(
              background="",
              layout="prev, pager, next",
              @size-change="handleSizeChange",
              @current-change="handleCurrentChange",
              :current-page.sync="currentPage",
              :pager-count="4",
              :total="filterData.length")
        el-tab-pane(label="參賽查詢", name="second")
          .filter
            el-form(ref="searchForm", :rules="rules", :model="searchForm", :inline="true", @submit.prevent="onSubmit")
              el-form-item(label="參賽信箱", prop="email")
                el-input.email(v-model="searchForm.email")
              el-form-item
                el-button(type="primary", @click="submitForm('searchForm')") 查詢
          .profileList(v-loading="!profile")
            el-alert(v-if="profile === 'no-data'" type="warning", title="查無作品提交紀錄，請重新查詢", center, show-icon)
            template(v-if="profile !== 'no-data' && profile && profile.length")
              h3 {{ searchForm.email }}
              el-card.card(shadow="hover", v-for="(item, index) in profile", :key="index")
                h3 {{ getStageName(item.stage) }}
                .row
                  span.icon.date
                    | {{ item.uploadTime }}
                .row
                  span.icon
                    a.link(:href="item.url", target="_blank") {{ item.url }}
                .row
                  span.icon
                    .tag.profile-tag(v-for="(tag, index) in item.tags", :key="index") {{ tag }}
    el-footer.guahsu
      | Create By GuaHsu
      br
      | (
      a(href="https://github.com/guahsu/TheF2E", target="_blank") https://github.com/guahsu/TheF2E
      | )
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data() {
    return {
      dataLoading: true,
      datePickerOptions: {
        disabledDate(date) {
          return date > new Date()
        }
      },

      activeName: 'first',
      singUpTotal: null,
      // CodeList
      dataList: [],
      tagList: [],
      stageList: [
        {
          value: 1,
          label: '1 - TodoList'
        },
        {
          value: 2,
          label: '2 - Filter'
        },
        {
          value: 3,
          label: '3 - Admin Order'
        },
        {
          value: 4,
          label: '4 - Product Gallery'
        }
      ],
      currentPage: 1,
      selectedStage: 1,
      selectedTags: [],
      dateRange: [],
      keyword: '',

      // Profile
      searchForm: { email: '' },
      rules: {
        email: [{ type: 'email', required: true, message: '請輸入正確的email', trigger: 'change' }]
      },
      profile: []
    }
  },
  computed: {
    codeList() {
      const startPage = this.currentPage * 10 - 10
      const endPage = this.currentPage * 10 - 1
      return this.filterData.slice(startPage, endPage)
    },
    filterData() {
      if (this.dataList) {
        const keywordReg = new RegExp(this.keyword ? this.keyword.replace(/\\/g, '') : `.*`, 'gi')
        const tagReg = new RegExp(
          this.selectedTags ? `${this.selectedTags.map(item => `(?=.*${item})`).join('')}.*` : `.*`,
          'gi'
        )
        return this.dataList.filter(data => {
          return (
            data.url.match(keywordReg) &&
            data.tags.join().match(tagReg) &&
            data.timeStamp > new Date((this.dateRange && this.dateRange[0]) || '2018-01-01').getTime() &&
            data.timeStamp < new Date((this.dateRange && this.dateRange[1]) || '2019-01-01').getTime()
          )
        })
      }
    },
    selectedTagsRegexp() {
      return `${this.selectedTags.join('|')}`
    }
  },
  watch: {
    selectedStage() {
      this.dataList = []
      this.getData()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.currentPage = val
    },
    //
    getStageName(id) {
      const stage = this.stageList.find(stage => stage.value === id)
      return stage.label
    },
    // Apis
    getData() {
      this.dataLoading = true
      return axios
        .get('https://www.thef2e.com/api/codeList', {
          params: {
            stage: this.selectedStage
          }
        })
        .then(res => {
          this.dataList = res.data.sort((a, b) => a.timeStamp - b.timeStamp).map(item => {
            return {
              tags: item.tag.split(',').sort((a, b) => a.localeCompare(b)),
              timeStamp: item.timeStamp,
              uploadTime: new Date(item.timeStamp).toLocaleString(),
              url: item.url
            }
          })
          this.dataLoading = false
        })
        .catch(err => console.log(err))
    },
    getTag() {
      return axios
        .get('https://www.thef2e.com/api/tagList')
        .then(res => {
          this.tagList = res.data.sort((a, b) => a.localeCompare(b))
        })
        .catch(err => console.log(err))
    },
    getSingUpTotal() {
      return axios
        .get('https://www.thef2e.com/api/signUpTotal')
        .then(res => {
          this.singUpTotal = res.data.total
        })
        .catch(err => console.log(err))
    },
    getProfile() {
      return axios
        .post('https://www.thef2e.com/api/stageCheck', { email: this.searchForm.email })
        .then(res => {
          this.profile = res.data.length
            ? res.data.map(item => {
              return {
                stage: item.stage,
                tags: item.tag.split(',').sort((a, b) => a.localeCompare(b)),
                uploadTime: new Date(item.timeStamp).toLocaleString(),
                url: item.url
              }
            })
            : 'no-data'
        })
        .catch(err => console.log(err))
    },
    checkImage(url) {
      return url.match(/(?=.*codepen\.io)(.*\/pen|.*\/full|.*\/details)/gi)
    },
    getImage(url) {
      return `${url.replace(/\?editor.*/gi, '').replace(/\/full|\/details/gi, '/pen')}/image/small.png`
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.profile = null
          this.getProfile()
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    this.getSingUpTotal()
    this.getData()
    this.getTag()
  }
}
</script>

<style lang="scss">
#Index {
  max-width: 1140px;
  cursor: default;
  .header {
    margin-bottom: 30px;
    .title {
      display: flex;
      justify-content: center;
      color: #00cd98;
      font-weight: 900;
      font-size: 30px;
    }
    .subtitle {
      font-size: 22px;
    }
  }
  // Tab
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 50%;
      font-size: 18px;
    }
  }
  .el-tabs__content {
    padding: 20px 30px;
  }
  .el-col {
    margin-bottom: 20px;
    text-align: left;
  }
  // CodeList
  .filter {
    .date-picker {
      width: 250px !important;
    }
    .selector {
      width: 250px;
    }
    .keyword {
      width: 250px;
    }
    .el-checkbox-group {
      text-align: left;
      .el-checkbox {
        margin: 4px;
      }
    }
    .el-checkbox__inner {
      display: none;
    }
    .is-checked {
      .el-checkbox__label {
        border: solid 1px #00cd98;
        color: #00cd98;
      }
    }
    .el-checkbox__label {
      padding: 2px 10px;
      border: solid 1px #979aa0;
      border-radius: 5px;
      color: #979aa0;
    }
  }
  .card {
    margin: 10px 0px;
    padding: 10px;
    .el-card__body {
      display: flex;
      align-items: center;
    }
    .row:not(:last-child) {
      overflow: hidden;
      margin-bottom: 16px;
    }
    .img {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      width: 150px;
      height: 100px;
      i {
        color: #00cd98;
      }
      img {
        position: absolute;
        margin-right: 20px;
        width: 150px;
        height: 100px;
      }
    }
    .info {
      width: 100%;
    }
    .link {
      color: #00cd98;
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
    }
    .tag {
      display: inline-block;
      margin-right: 4px;
      margin-bottom: 4px;
      padding: 3px 10px;
      border-radius: 5px;
      background-color: #d7d7d7;
      color: #ffffff;
      font-size: 14px;
      cursor: normal;
      transition: 0.25s;
      &.acitve {
        background-color: #00cd98;
        color: #ffffff;
      }
      &.profile-tag {
        background-color: #00cd98;
        color: #ffffff;
      }
    }
    .icon {
      color: #4d6277;
      font-weight: 400;
      font-size: 14px;
      a {
        color: #4d6277;
        word-wrap: break-word;
        font-weight: 400;
        font-size: 16px;
        &:hover {
          color: #00cd98;
        }
      }
      &.date {
        font-size: 16px;
      }
      svg {
        margin-right: 10px;
        color: #00cd98;
        font-weight: 100;
      }
    }
  }
  // profile
  .profileList {
    margin-top: 20px;
    .email {
      width: 250px;
    }
    .el-card__body {
      flex-direction: column;
    }
  }
  // Footer
  .guahsu {
    padding: 30px 0 100px 0 !important;
    border-top: 1px solid #00cd98;
    font-weight: 900;
    a {
      color: #00cd98;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 720px) {
    .card {
      margin: 10px 0px;
      padding: 10px;
      .el-card__body {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .img {
        margin-right: 0;
        margin-bottom: 20px;
        width: 200px;
        height: 100px;
        img {
          margin-bottom: 20px;
          width: 200px;
          height: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    .header {
      margin-bottom: 20px;
      .title {
        color: #00cd98;
        font-weight: 900;
        font-size: 24px;
      }
      .subtitle {
        font-size: 20px;
      }
    }
    .el-tabs__content {
      padding: 20px 0px;
    }
  }
}
</style>
