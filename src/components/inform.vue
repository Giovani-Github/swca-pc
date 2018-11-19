<!-- 普通文章 -->
<template>
  <div style="padding: 10px">
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{path: `/inform`}">
          <Icon class="icon" type="md-book"/>
          普通文章
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>

    <div style="background-color: white;border: 1px solid #eeeeee; margin-top: 10px">
      <CellGroup>
        <Cell :to="{path: `/articleRead/${informArticle.articleId}`}"
              style="border-bottom: 1px solid #eeeeee; padding: 14px" :key="index"
              v-for="(informArticle, index) in informList">
          <p class="articletitle"><a class="articletitle">{{informArticle.title}}</a></p>
          <Time style="color: rgb(158, 167, 180)" :time="informArticle.publishTime"></Time>
          <span style="margin-left: 6px;color: rgb(158, 167, 180)">
              阅读量：{{informArticle.reading}}
            </span>
          <Icon style="color: #2d8cf0;margin-left: 10px" type="md-heart"/>
          {{informArticle.parise > 0 ? informArticle.parise : 0}}
        </Cell>
      </CellGroup>

    </div>

    <div style="float: right;margin-top: 20px;margin-bottom: 20px">
      <Page :total="informTotal" :page-size="pageSize" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "inform",
    data() {
      return {
        // 教程文章列表
        informList: [],
        // 教程文章总数
        informTotal: 1,
        // 每页条数
        pageSize: 6,
        // 当前页码
        pageNum: 1,
      };
    },
    methods: {
      /**
       * 获取所有教程文章
       */
      getInformList() {

        // 回到页面顶部
        window.scrollTo(0, 0);

        this.$api.indexFront.getAllInform({
          pageNum: this.pageNum,
          pageSize: this.pageSize

        }).then(
          res => {
            console.log(res.data[0]);
            this.informList = res.data[0].list;
            this.informTotal = res.data[0].total;
          }
        )
      },
      /**
       * 页码改变
       */
      pageChange: function (currentPageNum) {
        this.pageNum = currentPageNum;
        this.getInformList();
      },
    },
    created() {
      // 获取所有文章
      this.getInformList();
    }

  }
</script>

<style scoped lang="less">
  .articletitle {
    font-size: 16px;
    font-weight: bold;
    color: rgb(70, 76, 91);

    width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    whitewhite-space: nowrap;
  }

</style>
