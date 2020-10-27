<template>
  <div class="social-container">
    <el-alert
      v-if="env === 'production'"
      :closable="false"
      title="线上环境为防止恶意调用，不支持第三方登录演示，请下载源码并运行项目查看功能演示"
      type="warning"
    ></el-alert>
    <el-button type="primary" @click="handleSocialLogin">
      点击进行Github登录
    </el-button>
    <p v-if="data">{{ data }}</p>
  </div>
</template>

<script>
  import { login } from "@/utils/social";

  export default {
    name: "Social",
    components: {},
    data() {
      return {
        loading: null,
        data: null,
        env: process.env.NODE_ENV,
      };
    },
    methods: {
      handleSocialLogin() {
        this.loading = this.$baseLoading();
        login(`https://github.com/login/oauth/authorize`, {
          client_id:
            this.env === "development"
              ? "bb8dfd34f6c6a57367e3"
              : "e104bdc488d009840c4f",
        })
          .then((data) => {
            this.data = data;
            this.$store
              .dispatch("user/socialLogin", data)
              .then(() => {
                // 登录页面使用，取消注释
                // const routerPath =
                //   this.redirect === "/404" || this.redirect === "/401"
                //     ? "/"
                //     : this.redirect;
                // this.$router.push(routerPath).catch(() => {});
                this.loading.close();
              })
              .catch(() => {
                this.loading.close();
              });
          })
          .catch(() => {
            this.$baseMessage("第三方登录失败，未返回令牌", "error");
            this.loading.close();
          });
      },
    },
  };
</script>
