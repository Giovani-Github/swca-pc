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
      <p slot="title">多条件搜索</p>
      <Row>
        <Col span="10">
          标题：
          <Input v-model="articleInfo.title" placeholder="输入标题" style="width: 360px"/>
        </Col>
        <Col span="7">
          提交人id：
          <Input v-model="articleInfo.userId" placeholder="输入提交人id" style="width: 200px"/>
        </Col>
        <Col span="7">
          文章id：
          <Input v-model="articleInfo.articleId" placeholder="输入文章id" style="width: 200px"/>
        </Col>

      </Row>
      <Row style="margin-top: 20px">
        <Col span="6">
          类型：
          <RadioGroup v-model="articleInfo.type" type="button" size="large">
            <Radio label="2">全部</Radio>
            <Radio label="0">普通</Radio>
            <Radio label="1">教程</Radio>
          </RadioGroup>
        </Col>
        <Col span="6">
          状态：
          <RadioGroup v-model="articleInfo.state" type="button" size="large">
            <Radio label="3">全部</Radio>
            <Radio label="1">已审核</Radio>
            <Radio label="0">未审核</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style="float: right; margin-top: 20px">
            <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          </div>
        </Col>
      </Row>
    </Card>
    <Card style="margin-top: 20px">
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>
      <p slot="title">文章列表</p>
      <Table highlight-row border :columns="articleColumns" :data="articleList"></Table>

      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="articleTotal" :page-size="pageSize" @on-change="pageChange"></Page>
        </div>
        <div style="margin: 10px">
          <Icon style="font-size: 18px; color:#2d8cf0; margin-right: 6px" type="md-contacts"/>
          文章总数：{{articleTotal}}
        </div>
      </div>
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
        // 多条件搜索
        articleInfo: {
          title: '',
          userId: '',
          articleId: '',
          type: '',
          state: ''
        },
        // 当前页码
        pageNum: 1,
        // 每页条数
        pageSize: 6,
        // 文章总数
        articleTotal: 1,
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
            width: 200,
            tooltip: true,
            key: 'title',
          },
          {
            align: 'center',
            title: '类型',
            width: 120,
            tooltip: true,
            key: 'type',
            render: (h, params) => {
              if (params.row.type == 0) {
                return h("Badge", {
                  props: {
                    text: "普通",
                    type: "normal"
                  },
                })
              } else {
                return h("Badge", {
                  props: {
                    text: "教程",
                    type: "success"
                  },
                })
              }
            }
          },
          {
            align: 'center',
            title: '点赞量',
            width: 100,
            key: 'parise',
            render: (h, params) => {

              return h("Badge", {
                props: {
                  text: params.row.parise + "",
                  type: "warning"
                },
              })
            }
          },
          {
            align: 'center',
            title: '阅读量',
            width: 100,
            key: 'reading',
            render: (h, params) => {

              return h("Badge", {
                props: {
                  text: params.row.reading + "",
                  type: "primary"
                },
              })
            }
          },
          {
            align: 'center',
            title: '内容',
            width: 150,
            key: 'content',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  ghost: true
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
              200,
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
              200,
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
            title: '状态',
            width: 160,
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
              160,
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
      // 多条件搜索
      search: function () {
        this.findAllArticle();
      },

      /**
       * 页码改变
       * @param orderId
       */
      pageChange: function (currentPageNum) {
        this.pageNum = currentPageNum;
        this.findAllArticle();
      },

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
        this.$api.indexAdmin.findAllAritcle({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          // 多条件搜索
          title: this.articleInfo.title,
          userId: this.articleInfo.userId,
          articleId: this.articleInfo.articleId,
          type: this.articleInfo.type,
          state: this.articleInfo.state,
        }).then(
          res => {

            this.articleTotal = res.data[0].total;
            this.articleList = res.data[0].list;
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
