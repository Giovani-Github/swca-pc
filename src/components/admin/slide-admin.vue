<!-- 首页轮播图管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'slideAdmin'}">
          <Icon type="ios-navigate"></Icon>
          轮播图管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      <Row>
        <Col span="8">
          <Upload
            :before-upload="handleUpload"
            action="">
            <Button icon="ios-cloud-upload-outline">选择要上传的轮播图</Button>

          </Upload>

          <div v-if="file !== null">
            <p style="margin-top: 10px; margin-bottom: 10px">
              上传的文件名: {{ file.name }}
            </p>
            <Button type="primary" ghost @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '上传' }}
            </Button>
          </div>
        </Col>
        <Col span="8">

        <span style="margin-left: 20px">
            关联文章：
            <Select v-model="articleId" style="width: 250px" clearable>
              <Option v-for="article in articleList" :value="article.articleId" :key="article.articleId">
                {{article.title }}
              </Option>
            </Select>
          </span>
        </Col>
      </Row>
    </Card>

    <Card style="margin-top: 20px">
      <p slot="title">轮播图列表</p>
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>

      <Table highlight-row border :columns="slideColumns" :data="slideLsit"></Table>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "slide-admin",
    data() {
      return {
        // 轮播图列表
        slideLsit: [],
        // 关联文章的id，如果为0，则表示没有与文章关联
        articleId: 0,
        // 加载中是否显示
        spinShow: false,

        // 文章列表
        articleList:
          [
            {
              articleId: 0,
              title: '不关联文章'
            },
            {
              articleId: 1,
              title: '文章标题'
            }
          ],
        file: null,
        loadingStatus: false,

        slideColumns: [
          {
            align: 'center',
            type: 'index',
            title: '#',
            width: 60,
            fixed: 'left'
          },
          {
            align: 'center',
            title: '轮播图id',
            tooltip: true,
            key: 'slideId',
            width: 120,
            fixed: 'left'
          },
          {
            align: 'center',
            title: '提交人ID',
            key: 'userId',
            width: 100,
          },
          {
            align: 'center',
            title: '提交时间',
            key: 'submitTime',
            width: 120,
            render: (h, params) => {
              return h('p', {}, new Date(params.row.submitTime).toLocaleString())
            }
          },
          {
            align: 'center',
            title: '关联文章id',
            tooltip: true,
            key: 'articleId',
            width: 100
          },
          {
            align: 'center',
            title: '图片',
            key: 'addres',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('img', {
                    attrs: {
                      src: params.row.addres,
                    },
                    style:
                      {
                        width: '200px',
                      }
                  },
                )

              ])
                ;
            }
          },
          {
            align: 'center',
            title: '状态',
            key: 'state',
            tooltip: true,
            width: 100
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.accept(params.row.orderId)
                    }
                  }
                }, '接受'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.success(params.row.orderId)
                    }
                  }
                }, '完成维修')
              ]);
            }
          }
        ],
      }
    },
    methods: {

      /**
       * 上传组件，上传之前调用
       * @param file
       * @returns {boolean}
       */
      handleUpload(file) {
        this.file = file;
        // 表示不继续上传，即不会自动上传
        return false;
      },
      /**
       * 点击上传
       */
      upload() {
        this.loadingStatus = true;

        var params = new FormData();

        params.append('file', this.file);
        // 关联文章的id，如果为0，则表示没有与文章关联
        params.append('articleId', this.articleId);

        this.$api.indexAdmin.uploadSlideImg(params).then(
          res => {
            this.loadingStatus = false;
            this.$Message.success('上传成功')
          }
        ).catch(
          error => {
            this.loadingStatus = false;
          }
        );
      }
      ,
      /**
       * 获取所有轮播图
       */
      findAllSlideImg() {
        this.spinShow = true;
        this.$api.indexAdmin.findAllSlideImg().then(
          res => {
            this.slideLsit = res.data[0];
            console.log(this.slideLsit);
            this.spinShow = false;
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      }

    },
    created() {
      // 设置当前侧边栏选择项是3-1
      this.$store.commit('setAdminMenuActive', '3-1');

      // 获取所有轮播图
      this.findAllSlideImg();
    }
  }
</script>

<style scoped>

</style>
