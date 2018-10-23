<!-- 维修订单管理 -->
<template>
  <div>
    <Table highlight-row width="100%" border :columns="columns2" :data="data3"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "repair-admin",
    data() {
      return {
        columns2: [
          {
            align: 'center',
            type: 'index',
            title: '#',
            width: 60,
            fixed: 'left'
          },
          {
            align: 'center',
            title: 'Name',
            key: 'name',
            width: 100,
            fixed: 'left'
          },
          {
            align: 'center',
            title: 'Age',
            key: 'age',
            width: 100
          },
          {
            align: 'center',
            title: 'Province',
            key: 'province',
            width: 100
          },
          {
            align: 'center',
            title: 'City',
            key: 'city',
            width: 100
          },
          {
            align: 'center',
            title: 'Address',
            key: 'address',
            width: 200
          },
          {
            align: 'center',
            title: 'Postcode',
            key: 'zip',
            width: 100
          },
          {
            align: 'center',
            title: 'Postcode',
            key: 'zip',
            width: 100
          },
          {
            align: 'center',
            title: 'Postcode',
            key: 'zip',
            width: 100
          },
          {
            align: 'center',
            title: 'Postcode',
            key: 'zip',
            width: 100
          },
          {
            title: 'Action',
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
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        data3: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            province: 'America',
            city: 'New York',
            zip: 100000
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'Washington, D.C. No. 1 Lake Park',
            province: 'America',
            city: 'Washington, D.C.',
            zip: 100000
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            province: 'Australian',
            city: 'Sydney',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
          ,
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }

        ]
      }
    }
  }
</script>

<style scoped>

</style>
