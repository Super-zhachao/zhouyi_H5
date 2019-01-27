<template>
  <div class="page-bg dog-bg">
    <div class="page">
      <!--加载动画开始-->
      <div class="loading page-base" style="z-index: 1000">
        <div class="loading-left"></div>
        <div class="loadind-right"></div>
        <div class="page-base loading-progress"></div>
        <div class="progress-wall"><span>0%</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getWxAuthUrl, getUserInfo} from '../../api.js'
  import store from '../../store.js'

  export default {
    name: "index",
    created() {
      // 检测是否有code
      if (!this.$route.query.code) {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          // 跳转到微信授权页面
          this.$http.post(getWxAuthUrl)
            .then(function (response) {
              if (response.body.code === 200) {
                window.location.href = response.header.url
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        // 如果有code 获取用户信息
        this.login()
      }
    },
    methods: {
      login() {
        // 通过cookie获取用户信息
        this.$http.post(getUserInfo)
          .then(function (response) {
            if (response.body.code === 200) {
              this.$store.commit('setUserInfo', response.header.UserInfoVo);
              //回到首页
              this.$router.push({
                path: '/',
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../index/index";
</style>