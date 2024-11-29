<template>
  <div class="login-body">
    <div class="form-login">
      <form class="user" @submit.prevent="login">
        <div class="text-center mb-4">
          <img class="mb-4" src="https://www.b-channel.jp/nakamura-remake/public/img/nakamura-logo.jpg" alt="中村調理専門学校ロゴ">
          <h1 class="h4 mb-3 font-weight-normal">オンライン講座　ログイン</h1>
        </div>
        <div v-if="errorMessage" class="error-message">
          <p v-if="errorCode === 411" class="alert alert-success ">ユーザＩＤが間違っています</p>
          <p v-if="errorCode === 412" class="alert alert-success ">パスワードが間違っています</p>
          <p v-if="errorCode === 413" class="alert alert-success ">アカウントのアクセス権限が異なります</p>
          <p v-if="!errorCode" class="alert alert-success r">内部エラーが発生しました。後でもう一度お試しください。</p>
        </div>
        <div class="form-label-group">
          <input type="text" id="loginId" v-model="loginId" class="form-control" placeholder="ログインID" required autofocus>
          <label for="loginId"></label>
        </div>
        <div class="form-label-group">
          <input type="password" id="password" v-model="password" class="form-control" placeholder="パスワード" required>
          <label for="password"></label>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" name="keep" value="keep">
            ログイン状態を保持する
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">オンライン講座にログイン</button>
      </form>
    </div><!-- <class="form-login"> -->
  </div><!-- <class="login-body"> -->
</template>

<script>
export default {
name: "Login",
  data() {
    return {
        loginId: "",
        password: "",
        errorMessage: '' ,
        errorCode:null
    };
  },
  created: function () {
    
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("login", {
            login_id: this.loginId,
            login_pw: this.password,
            loginType: 'user',
        });
        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user", response.data.user);
        this.$router.push("/courses-list");
      } catch (error) {
        this.errorMessage = error.response.data.message; 
        this.errorCode = error.response.data.code;
        console.log(error)
      }
    },
  },
};
</script>