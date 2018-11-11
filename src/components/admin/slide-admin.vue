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
        <Tooltip style="float: right" content="鼠标放到表格中的文字时会出现提示" placement="left">
          <Icon style="font-size: 20px" type="ios-help-circle"/>
        </Tooltip>
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

    <Modal v-model="bigImgModal" fullscreen title="查看大图">
      <div style="text-align:center">
        <img :src="bigImgAddres" alt="" width="1024px">
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="closeBigImg">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "slide-admin",
    data() {
      return {
        // 大图地址
        bigImgAddres: '',
        // 查看大图对话框
        bigImgModal: false,
        // 文章标题
        articleTitle: '',
        // 轮播图提交者的userName
        userName: '',
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
          },
          {
            align: 'center',
            title: '轮播图id',
            tooltip: true,
            key: 'slideId',
          },
          {
            align: 'center',
            title: '图片',
            key: 'addres',
            width: 200,
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: '点击查看大图',
                }
              }, [
                h('img', {
                    attrs: {
                      src: params.row.addres,
                    },
                    style:
                      {
                        width: '160px',
                        marginTop: '6px'
                      },
                    on: {
                      click: () => {
                        this.imgClick(params.row.addres);
                      }
                    }
                  },
                )
              ]);
            }
          },
          {
            align: 'center',
            title: '提交人ID',
            key: 'userId',
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  content: this.userName,
                },
                on: {
                  // Tooltip显示时调用
                  'on-popper-show': (event) => {
                    this.getUserName(params.row.userId);
                  }
                }
              }, params.row.userId);
            }
          },
          {
            align: 'center',
            title: '提交时间',
            width: 170,
            key: 'submitTime',
            render: (h, params) => {
              return h('p', new Date(params.row.submitTime).toLocaleString())
            }
          },
          {
            align: 'center',
            title: '关联文章id',
            tooltip: true,
            key: 'articleId',
            render: (h, params) => {
              if (params.row.articleId === 0) {
                return h('span', "未关联文章");
              }

              return h('Tooltip', {
                props: {
                  content: this.userName,
                },
                on: {
                  // Tooltip显示时调用
                  'on-popper-show': (event) => {
                    this.getAritcleTitle(params.row.articleId);
                  }
                }
              }, params.row.articleId);
            }
          },

          {
            align: 'center',
            title: '状态',
            key: 'state',
            tooltip: true,
            render: (h, params) => {
              if (params.row.state === 0) {
                return h('Badge', {
                  props: {
                    status: 'warning',
                    text: '未审核',
                  }
                });
              }
              if (params.row.state === 1) {
                return h('Badge', {
                  props: {
                    status: 'processing',
                    text: '已审核',
                  }
                });
              }
              if (params.row.state === 2) {
                return h('Badge', {
                  props: {
                    status: 'error',
                    text: '已删除',
                  }
                });
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
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
                      this.checkSlide(params.row.slideId)
                    }
                  }
                }, '通过'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '是否删除？',
                  },
                  style: {
                    textAlign: 'left'
                  },
                  on: {
                    'on-ok': (event) => {
                      this.deletSlide(params.row.slideId);
                    },
                  }
                }, [

                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.success(params.row.orderId)
                      }
                    }
                  }, '删除')
                ]),

              ]);
            }
          }
        ],
      }
    },
    methods: {

      /**
       * 审核通过
       */
      checkSlide(slideId) {
        this.spinShow = true;
        this.$api.indexAdmin.checkSlide(slideId).then(
          res => {
            this.spinShow = false;
            // 刷新
            this.findAllSlideImg();
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      },

      /**
       * 删除轮播图
       */
      deletSlide(slideId) {
        this.spinShow = true;
        this.$api.indexAdmin.deleteSlide(slideId).then(
          res => {
            this.spinShow = false;
            // 刷新
            this.findAllSlideImg();
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      },
      /**
       * 关闭大图
       */
      closeBigImg: function () {
        this.bigImgModal = false;
      },

      /**
       * 图片被点击
       * @param addres 图片地址
       */
      imgClick(addres) {
        this.bigImgModal = true;
        this.bigImgAddres = addres;
      },
      /**
       * 获取文章标题
       * @param articleId
       */
      getAritcleTitle(articleId) {
        this.$api.indexAdmin.getArticleTitleByArticleId(articleId).then(
          res => {
            this.articleTitle = res.data.articleTitle;
          }
        );
      }
      ,

      /**
       * 获取用户名
       * @param userId
       */
      getUserName(userId) {
        this.$api.user.getUserNameByUserId(userId).then(
          res => {
            this.userName = res.data.userName;
          }
        );
      }
      ,

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
            // 刷新
            this.findAllSlideImg();
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
