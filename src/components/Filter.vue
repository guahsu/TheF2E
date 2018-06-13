<template lang="pug">
  #filter
    .header
      .logo HaveFun
      .search
        i.el-icon-search
        input(type="text", placeholder="Explore your own activites")
    .container
      .aside
        .filter.location
          .title Location
          select
            option(v-for="(option, index) in options" :key="index" :value="option.value") {{ option.name }}
        .filter.date
          .title Date
          .from
            | from
            input.input(type="date")
          .to
            | to
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
        .card
          .card-img
          .card-info
            .title Kogi Cosby sweater ethical.
            .desc Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. Curabitur fermentum suscipit est, tincidunt mattis lorem luctus id. Donec eget massa a diam condimentum pretium. Aliquam erat volutpat. Integer ut tincidunt orci. Etiam tristique, elit ut consectetur iaculis, metus lectus mattis justo, vel mollis eros neque quis augue. Sed lobortis ultrices lacus, a placerat metus rutrum sit amet. Aenean ut suscipit justo.
            //-
              .organizer Ethan Foster
              .tag Entertainment
              .location Kaohsiung City
              .date
</template>

<script>
export default {
  name: 'filter',
  data () {
    return {
      dataList: [],
      options: [{ name: 'location1', value: 1 }, { name: 'location2', value: 2 }, { name: 'location3', value: 3 }],
      categories: [
        { name: 'All', checked: false },
        { name: 'Entertainment', checked: false },
        { name: 'Food', checked: false },
        { name: 'Learning', checked: false },
        { name: 'Outdoors', checked: false }
      ]
    }
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
  height: 100vh;
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
    flex: 8;
    padding: 42px 0;
    height: 100%;
    text-align-last: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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
      transition: 0.3s;
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
        .title {
          margin-bottom: 16px;
          color: #522678;
          font-weight: 900;
          font-size: 24px;
        }
        .desc {
          overflow: hidden;
          height: 50px;
          text-align-last: left;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
      &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
