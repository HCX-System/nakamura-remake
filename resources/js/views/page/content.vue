<template>
  <div class="content container">
    <div class="contents-title">
      <h2 class="title d-flex align-items-center p-3 my-3 rounded shadow-sm">
        <router-link to="/courses-list">コース一覧&emsp;</router-link>
        >&emsp;
        <a v-on:click="backCategory()" class="cursor-point">{{ content.project_name }}</a>
        &emsp;>&emsp;{{content.contents_title}} 
      </h2>
    </div>
    <div class="py-5">
      <div class="container">
        <div class="row col-md-10 mx-auto">
          <div class="movie mx-auto">
            <div class="video-js-box">
                <div class="player" id="player">
                    <div class="video-js-box" id="video-js-box">
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div><!-- class=py-5 -->
    <div class="pb-5 text-center">
      <a class="btn btn-primary m-2" v-on:click="backCategory()">{{ content.project_name }}へ戻る</a>
    </div>
  </div><!-- class=content container -->
</template>

<script>
import axios from 'axios'
import playerjs from '../../player.js';
import store from '../../vuex.js'

export default {

  props: {
    contents_id: String, 
    cid: String, 
  },

  data() {
    return {
      content:[],
      s3Url:process.env.MIX_S3_URL,
      contentId:null,
      videoData:[],
      videoURL:null,
      posterURL:null,
      apiURL:null,
      loading:true,
      userId:null,
      session_token:null,
    }
  },
  
  mounted() {
    this.getContent();
    playerjs.setTag();
  },

  beforeDestroy() {
    playerjs.dispose()
  },

  methods: {
    //表示コンテンツ内容取得
    async getContent() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      try {
        const response = await axios.get(`content/${this.contents_id}`, {headers});
        this.content = response.data;
        this.setPrams ();
        this.setPlayer();
      }catch (error) {
        console.error('Error fetching data:',error);
      }
    },

    //カテゴリーに飛ぶ
    backCategory(){
      console.log(this.cid)
      this.$router.push({path: `/contents/${this.cid}`})
    },

    //パラメーター設定
    setPrams (){
      this.userId = this.$store.state.user.user_id;
      this.contentId= this.$route.params.contents_id;
      this.videoURL = `${this.s3Url}/${this.contents_id}/content1_high.mp4`
      this.posterURL = `${this.s3Url}/${this.contents_id}/content1.jpg`
      this.session_token = localStorage.getItem('token');
      this.GenerateSeesionToken()
      this.apiURL = process.env.MIX_WRITELOG_URL
    },

    //プレイヤー設定
    setPlayer(){
      playerjs.init(this.videoURL,this.posterURL,this.userId,this.contentId,this.session_token,this.apiURL)
    },

    //SeesionTokenを作成
    GenerateSeesionToken(){
      var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      var len = 10
      var password = "";
      for(var i=0; i<len; i++){
        password += str.charAt(Math.floor(Math.random() * str.length))
      }
        this.session_token = password
    },

  },
};
</script>