

# swca-pc

> 汕尾职业技术学院计算机协会网站pc端

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 构建方式

使用`vue-cli`快速构建项目，可参考[基于vue-cli快速构建](https://www.jianshu.com/p/2769efeaa10a)

> vue init webpack swca-pc

## 目录结构

参考[优雅的 Vue 项目目录结构设计](https://juejin.im/entry/5abd80fa518825558a06b7ce)  `采用这种`

且参考[Vue项目目录架构](https://segmentfault.com/a/1190000015612346)

### src目录结构

- api 目录，用来存放网络处理相关代码
- assets 目录用来存放一些图片、文件等资源
- common 目录用来存放项目中的公共资源
- components 目录用来存放模块、组件相关代码
  - admin 后台管理相关
  - user 用户模块
  - utils 工具模块
    - repair 维修
- router 目录用来存放路由配置
- store 目录用来存放 vuex 配置
- iview 按需引入iview组件

## 所用技术

* vue
* axios
* iview
* jwt



