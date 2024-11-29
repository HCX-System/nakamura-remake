<template>
  <div class="container" id="dashboard-login">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-5">
                      <img src="https://www.b-channel.jp/nakamura-remake/public/img/svp-cloud-logo.png" width="60%">
                    </h1>
                  </div>
                  <form class="user" @submit.prevent="login">
                    <div class="form-group">
                      <input type="text" id="adminId" v-model="adminId" placeholder="IDを入力してください" class="form-control">
                    </div>
                    <div class="form-group mt-3 mb-4">
                      <input type="password" id="adminPassword" v-model="adminPassword" placeholder="パスワード" class="form-control">
                    </div>
                    <div class="form-group mt-3">
                      <div class="custom-control custom-checkbox small"><input type="checkbox" id="customCheck" class="custom-control-input">
                        <label for="customCheck" class="custom-control-label">次回から自動でログインする</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">ログイン</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!-- <class= container> -->
</template>

<script>
export default {
  name: "DashboardLogin",
  data() {
    return {
        adminId: "",
        adminPassword: "",
        errorMessage: '' ,
        errorCode:null
    };
  },

  methods: {
    async login(){
      try{
        const response = await axios.post("login",{
          login_id:this.adminId,
          login_pw:this.adminPassword,
          loginType: 'admin',
        });
        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user",response.data.user);
        this.$router.push("/admin/dashboard/student")
      } catch(error){
        this.errorMessage = error.response.data.message;
        this.errorCode = error.response.data.code;
        console.log(error)
      }
    },
  },
}

</script>