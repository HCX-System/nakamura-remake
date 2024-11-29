<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
    <h5 class="mr-md-auto font-weight-normal">
      <img src="https://www.b-channel.jp/nakamura-remake/public/img/nakamura-logo.jpg" alt="ロゴ">
    </h5>
    <div class="my-2 my-md-0 mr-md-3 login-name">ようこそ！{{user.login_id}}さん</div>
    <a v-on:click="logout()" class="btn btn-primary btn-sm">ログアウト</a>
  </div>
</template>
    
<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Topbar",
    computed: {
      ...mapGetters(["user"]),
    },
    
    mounted(){
      console.log(this.user);
    },

    methods: {
      logout(){
        localStorage.removeItem("token");
        this.$store.dispatch("user",null);
        this.$router.push("/login");
      }
    },
  };
</script>