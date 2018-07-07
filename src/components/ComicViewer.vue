<template lang="pug">
  #ComicViewer
    header Comiccomic
    .container
      .top
        .comic-cover
        .comic-info
          .comic-info-title {{ title }}
          .comic-info-desc(v-for="(info, index) in infos", :key="index")
            span.key {{ info.key }}
            span.value {{ info.value }}
          .comic-info-summary Summary
            .comic-info-summary-content {{ summary }}
      .bottom
        .comic-chapters
          .comic-chapters-label All Chapters
          .comic-chapters-content
            .comic-chapters-content-list(v-for="(chapter, index) in chapters", :key="index")
              | Chapter {{ index + 1}}: {{ chapter }}
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
      chapters: ['The F2E Challenge Start!', 'Todo List is Going Crazy!']
    }
  }
}
</script>

<style lang="scss">
#ComicViewer {
  width: 100%;
  background-color: #f2f2f2;
  padding-bottom: 90px;

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700,700i,900');
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
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
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top {
      display: flex;
      justify-content: center;
      .comic-cover {
        width: 300px;
        height: 440px;
        border: 4px solid #000;
        background-image: url('~@/assets/week5_cover.png');
        background-size: 100%;
      }
      .comic-info {
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
      .comic-chapters {
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
            cursor: pointer;
            font-weight: 700;
            padding: 8px 24px 8px 24px;
            color: #000000;
            font-size: 16px;
            line-height: 24px;
            &:hover {
              background-color: #000;
              color: #fff;
            }
          }
          &-list:last-child {
            &::after {
              content: 'NEW';
              margin-left: 20px;
              padding: 2px 12px;
              color: #000;
              background: #50FF44;
            }
          }
        }
      }
    }
  }
}
</style>
