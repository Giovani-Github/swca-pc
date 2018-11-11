<!-- 首页文章管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'articleAdmin'}">
          <Icon type="ios-navigate"></Icon>
          文章管理
        </BreadcrumbItem>
        
        <Tooltip style="float: right" content="鼠标放到表格中的文字时会出现提示" placement="left">
          <Icon style="font-size: 20px" type="ios-help-circle"/>
        </Tooltip>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>
      <p slot="title">文章列表</p>
      <Table highlight-row border :columns="articleColumns" :data="articleList"></Table>
    </Card>

    <Modal v-model="contentModal" fullscreen title="查看大图">
      <div v-html="content"></div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="closeContentModal">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "article-admin",
    data() {
      return {
        // 文章详细内容
        content: '',
        // 内容查看框
        contentModal: false,
        spinShow: false,
        // 提交人用户名
        userName: '',
        // 文章列表
        articleList: [],
        articleColumns: [
          {
            align: 'center',
            type: 'index',
            title: '#',
            fixed: 'left',
            width: 60,
          },
          {
            align: 'center',
            title: '文章id',
            width: 100,
            tooltip: true,
            key: 'articleId',
          },
          {
            align: 'center',
            title: '标题',
            width: 180,
            tooltip: true,
            key: 'title',
          },
          {
            align: 'center',
            title: '点赞量',
            width: 100,
            key: 'parise',
          },
          {
            align: 'center',
            title: '阅读量',
            width: 100,
            key: 'reading',
          },
          {
            align: 'center',
            title: '内容',
            width: 120,
            key: 'content',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  ghost: 'true'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showContent(params.row.content);
                  }
                }
              }, '查看内容');
            }
          },
          {
            align: 'center',
            title:
              '提交人ID',
            width:
              100,
            key:
              'userId',
            render:
              (h, params) => {
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
            title:
              '提交时间',
            width:
              170,
            key:
              'submitTime',
            render:
              (h, params) => {
                return h('p', new Date(params.row.submitTime).toLocaleString())
              }
          },
          {
            align: 'center',
            title:
              '发布时间',
            width:
              170,
            key:
              'submitTime',

            render:
              (h, params) => {
                if (params.row.publishTime !== "" && params.row.publishTime !== undefined) {
                  return h('p', new Date(params.row.publishTime).toLocaleString())
                } else {
                  return h('span', "未发布")
                }

              }
          },
          {
            align: 'center',
            title:
              '状态',
            width:
              120,
            key:
              'state',
            tooltip:
              true,
            render:
              (h, params) => {
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
          }
          ,
          {
            title: '操作',
            key:
              'action',
            align:
              'center',
            width:
              150,
            render:
              (h, params) => {
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
                        this.checkArticle(params.row.articleId)
                      }
                    }
                  }, '通过'),
                  h('Poptip', {
                    props: {
                      confirm: true,
                      title: '是否删除？',
                    },
                    style: {
                      textAlign: 'left',
                    },
                    on: {
                      'on-ok': (event) => {
                        this.deletArticle(params.row.articleId);
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
       * 删除文章
       */
      deletArticle(articleId) {
        this.spinShow = true;
        this.$api.indexAdmin.deleteArticle(articleId).then(
          res => {
            this.spinShow = false;
            // 刷新
            this.findAllArticle();
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      },

      /**
       * 审核通过
       */
      checkArticle(articleId) {
        this.spinShow = true;
        this.$api.indexAdmin.checkArticle(articleId).then(
          res => {
            this.spinShow = false;
            // 刷新
            this.findAllArticle();
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      },
      /**
       * 关闭查看内容模态框
       */
      closeContentModal() {
        this.contentModal = false;
      }
      ,

      /**
       * 查看内容
       * @param userId
       */
      showContent(content) {
        this.content = content;
        this.contentModal = true;
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
       * 获取所有文章
       */
      findAllArticle() {
        this.spinShow = true;
        this.$api.indexAdmin.findAllAritcle().then(
          res => {
            this.articleList = res.data[0];
            console.log(this.articleList);
            this.spinShow = false;
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      }
    }
    ,
    created() {
      // 设置当前侧边栏选择项是3-3
      this.$store.commit('setAdminMenuActive', '3-3');
      this.findAllArticle();
    }
  }
</script>

<style scoped>

</style>
