<template>
  <div class="footer">
    <div style="padding: 0px 30px 10px 30px">
      <Card :bordered="false" class="info-card">
        <div class="info-text">
          <p>
            协会简介：汕尾职业技术学院计算机协会（原电脑爱好者联盟）成立于2006年，是隶属于电脑硬件，软件知识的一个服务团体。社团成立至今，我们不断地从各方面推出丰富多彩的活动，为我院的同学提供了义务维修。
            协会本着“掌握电脑知识，为校友服务”的宗旨，积极的组织同学在课余时间学习计算机知识。
          </p>
          <br>
          <p>
            技术部：主要负责每周会员的义务授课，帮会员上门维修电脑（非会员不提供上门服务，并且会员优先维修），以及组织部门内部计算机软硬件方面基础培训.
          </p>
          <p>
            秘书部：主要负责协会内部的上传下达，协会活动签到.
          </p>
          <p>
            宣传部：主要负责制作协会活动宣传单以及海报和组织部门内部进行制图软件基本培训.
          </p>
          <p>
            文娱部：主要负责协会文娱活动及联谊活动的组织及策划.
          </p>
          <p>
            电竞部：主要负责组织协会内部各类计算机竞赛活动，以及举办电子竞技比赛（目前已举办三届校内英雄联盟大赛，两届校内王者荣耀大赛）.
          </p>

        </div>
      </Card>
    </div>
    <div class="layout-footer-center">
      <span>
        &copy; 2018 <a href="www.swca.cn">swca</a> All rights reserved.
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footer-sw"
  }
</script>

<style scoped lang='less'>
  @import "../common/less/global";

  .info-text {
    padding: 20px;
  }

  // 协会信息卡片
  .info-card {
    .full-center;
  }

  .layout-footer-center {
    color: @footer-font-color;
    height: 100px; /*高度可由内容撑开*/
    background-color: @primary-color;
    margin-top: -50px;
    .full-center;
  }

  span {
    margin-top: 40px;
  }

  a {
    color: @footer-font-color;
  }
</style>
