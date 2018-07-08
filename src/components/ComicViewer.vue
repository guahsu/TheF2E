<template lang="pug">
  #ComicViewer
    header Comiccomic
    .index
      .top
        .cover
        .info
          .info-title {{ title }}
          .info-desc(v-for="(info, index) in infos", :key="index")
            span.key {{ info.key }}
            span.value {{ info.value }}
          .info-summary Summary
            .info-summary-content {{ summary }}
      .bottom
        .chapters
          .chapters-label All Chapters
          .chapters-content
            .chapters-content-list(v-for="(chapter, index) in chapters", :key="index")
              | Chapter {{ index + 1}}: {{ chapter }}
    hr
    .comic
      .top
        .title
          | {{ title }}
          i.fas.fa-caret-right
        select.chapters
          option(v-for="(chapter, index) in chapters", :key="index", :value="index") {{ `Chapter ${index + 1}` }}
        select.page
          option(v-for="page in 10", :key="page", :value="page") {{ page }}
        .set
          i.fas.fa-sun
          el-switch(v-model='light', active-color='#000000', inactive-color='#000000')
          i.fas.fa-moon
      .middle
        .prev
          i.fas.fa-chevron-left
        img.image(src="@/assets/week5_storyboard.png")
        .next
          i.fas.fa-chevron-right
      .bottom
        .previewList
          img.preview(v-for="(page, index) in 12", src="@/assets/week5_storyboard.png", :class="{ 'active': index === 3 }")
</template>

<script>
export default {
  name: 'comicViewer',
  data() {
    return {
      title: 'MY HEXSCHOOL',
      infos: [
        { key: 'Genres', value: 'Fusce/vehicula/dolor' },
        { key: 'Author', value: 'Namae Shiranai' },
        { key: 'Status', value: 'Ongoing' },
        { key: 'Rate', value: 4 }
      ],
      summary: `If your banker breaks, you snap; if your apothecary by mistake sends you poison in your pills, you die. 

      Therefore, I say, I saw that this situation of mine was the precise situation of every mortal that has this Siamese connexion with a plurality of other mortals. 
      `,
      chapters: ['The F2E Challenge Start!', 'Todo List is Going Crazy!'],
      light: false
    }
  }
}
</script>

<style lang="scss">
#ComicViewer {
  padding-bottom: 90px;
  width: 100%;
  background-color: #f2f2f2;
  color: #000;

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700,700i,900');

  hr {
    margin: 30px;
  }
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  .el-switch__core {
    border-radius: 0 !important;
    &::after {
      border-radius: 0 !important;
    }
  }
  header {
    margin-bottom: 30px;
    padding: 19px 0px;
    background: #000000;
    color: #50ff44;
    font-weight: 900;
    font-style: italic;
    font-size: 36px;
  }
  .index {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top {
      display: flex;
      justify-content: center;
      .cover {
        width: 300px;
        height: 440px;
        border: 4px solid #000;
        background-image: url('~@/assets/week5_cover.png');
        background-size: 100%;
      }
      .info {
        width: 400px;
        &-title {
          margin-bottom: 8px;
          padding: 8px 21px;
          background-color: #000;
          color: #ffffff;
          font-weight: 700;
          font-size: 36px;
        }
        &-desc {
          display: flex;
          justify-content: flex-start;
          padding: 6px 24px;
          .key {
            width: 80px;
            color: #000000;
            text-align: left;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
          }
          .value {
            color: #000000;
            font-size: 16px;
            line-height: 24px;
          }
        }
        &-summary {
          padding: 10px 24px;
          color: #000000;
          text-align: left;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          &-content {
            margin-top: 8px;
            white-space: pre-line;
            font-weight: 400;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      .chapters {
        width: 700px;
        &-label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 44px;
          background-color: #000;
          color: #ffffff;
          font-weight: 700;
          font-size: 24px;
        }
        &-content {
          padding: 12px 0;
          width: 100%;
          border: solid 4px #000;
          text-align: left;
          &-list {
            padding: 8px 24px 8px 24px;
            color: #000000;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            cursor: pointer;
            &:hover {
              background-color: #000;
              color: #fff;
            }
          }
          &-list:last-child {
            &::after {
              margin-left: 20px;
              padding: 2px 12px;
              background: #50ff44;
              color: #000;
              content: 'NEW';
            }
          }
        }
      }
    }
  }
  .comic {
    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0;
      .title {
        color: #000;
        font-size: 20px;
        .fa-caret-right {
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .chapters,
      .page {
        margin-left: 10px;
        border: 2px solid #000;
      }
      .set {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 280px;
        font-size: 18px;
        .el-switch {
          margin: 0 5px;
        }
      }
    }
    .middle {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      .prev,
      .next {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        height: 900px;
        font-size: 40px;
        cursor: pointer;
        &:hover {
          background-color: #50ff44;
        }
      }
      .image {
        width: 700px;
        height: 900px;
        background-color: #000;
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      .previewList {
        display: flex;
        overflow-x: scroll;
        width: 700px;
      }
      .preview {
        margin: 5px;
        width: 80px;
        height: 120px;
        opacity: 0.7;
        cursor: pointer;
      }
      .active {
        border: 3px solid #000;
      }
    }
  }
}
</style>
