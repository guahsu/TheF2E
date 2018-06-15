<template lang="pug">
  #filter
    .header
      .logo HaveFun
      .search
        i.el-icon-search
        input(v-model="keyword", type="text", placeholder="Explore your own activites")
    .container
      .aside
        .filter.location
          .title Location
          select
            option(v-for="(option, index) in options" :key="index" :value="option.value") {{ option.name }}
        .filter.date
          .title Date
          .from from
            input.input(type="date")
          .to to
            input.input(type="date")
        .filter.categories
          .title Categories
          .checkbox(v-for="(category, index) in categories", :key="index")
            input(:id="category.name", type="checkbox", model="category.checked")
            label.select(:for="category.name") {{ category.name }}
      .content
        .info
          | Showing
          span.resultCnt {{ ` ${dataList.length} ` }}
          | results by ...
        .tags
          .tag(v-for="(tag, index) in categories") {{ tag.name }}
            i.remove.el-icon-circle-close-outline
        .card(v-for="(data, index) in dataList" :key="index")
          img.card-img(:src="data.Picture1")
          .card-info
            .row.title {{ data.Name }}
            .row.desc {{ data.Description }}
            .row
              span.phone
                i.fas.fa-phone
                | {{ data.Tel }}
              span.location
                i.fas.fa-map-marker-alt
                | {{ data.Add }}
            .row
              span.date
                i.far.fa-calendar-alt
                | {{ data.Opentime }}
            //-
              i.fas.fa-map-marker-alt
              .tag Entertainment
              .location Kaohsiung City
              .date
</template>

<script>
import axios from 'axios'

export default {
  name: 'filter',
  data () {
    return {
      dataList: [],
      keyword: '',
      options: [{ name: 'location1', value: 1 }, { name: 'location2', value: 2 }, { name: 'location3', value: 3 }],
      categories: [
        { name: 'All', checked: false },
        { name: 'Entertainment', checked: false },
        { name: 'Food', checked: false },
        { name: 'Learning', checked: false },
        { name: 'Outdoors', checked: false }
      ]
    }
  },
  watch: {
    keyword () {
      this.getData()
    }
  },
  methods: {
    getData () {
      return axios
        .get('https://data.kcg.gov.tw/api/action/datastore_search', {
          params: {
            resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
            q: this.keyword,
            limit: 5
          }
        })
        .then(res => {
          this.dataList = res.data.result.records
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss">
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
  width: 100%;
  // background-color: #333;
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
    .filter {
      padding: 24px 40px;
      width: 300px;
      border-bottom: 1px solid #d7d7d7;
      background-color: #ebebeb;
      text-align-last: left;
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
      &.categories {
        border-bottom: none;
        .checkbox {
          font-weight: 500;
          input {
            margin-right: 6px;
            margin-bottom: 11px;
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
    text-align-last: left;
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
      &-img {
        width: 220px;
        height: 220px;
        background: #333;
      }
      &-info {
        padding: 24px 20px;
        width: 560px;
        height: 220px;
        background-color: #fff;
        .row {
          margin-bottom: 16px;
        }
        .title {
          color: #522678;
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
          margin-left: 20px;
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
        .location,
        .date,
        .phone {
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
