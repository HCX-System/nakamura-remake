<template>
  <div class="contents container">
    <div class="contents-title">
      <h2 class="title d-flex align-items-center p-3 my-3 rounded shadow-sm">
        <router-link to="/courses-list">コース一覧&emsp;</router-link>
        >&emsp;{{contentDetails.cname}}
      </h2>
    </div>
    <div class="my-3 p-3 highlight rounded shadow-sm">
      <h6 class="border-bottom border-gray pb-2 mb-0">{{contentDetails.cname}}</h6>
      <div v-html = contentDetails.info_text></div>
    </div>
    <div class="album py-5">
      <div class="container">
        <div v-if="contents.length > 0" class="row">
          <div v-for="content in contents" :key="content.id" class="col-12 col-md-6 col-xl-4">
            <div class="card mb-4 shadow-sm">
              <div class="poster">
                <img v-bind:src="`${s3Url}/${content.contents_id}/content1_thum.jpg`" aria-label="Placeholder: Thumbnail">
              </div>
              <div class="card-body">
                <div>
                  <a class="btn btn-block btn-primary" v-on:click="linkContent(content.contents_id,content.cname)">視聴する</a>
                </div>
                <div class="title">{{ content.contents_title }}<br>({{ formatVideoLength(content.video_length) }})</div>
                <hr>
                <div class="summary">
                  <b>教材</b>　～{{ content.cname }}～
                </div>
                <div v-for="i in 4" :key="i" class="fileBox" v-if="content[`doc${i}`]">
                  <a v-bind:href="`${s3Url}/${content.contents_id}/${content[`doc${i}`]}`">
                    <img v-bind:src="`../img/note.png`" alt="icon">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props:['cid'],

  data(){
    return {
      contents:[],
      contentDetails:[],
      s3Url:process.env.MIX_S3_URL
    };
  },

  mounted(){
    console.log('Category ID:', this.cid);
    this.getContents();
  },

  methods: {
    //表示コンテンツ内容取得
    async getContents(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };

      const userId = this.$store.getters.user.user_id
      const categoryId = this.cid

      try {
        const response = await axios.get('contents/',{headers, params:{user_id:userId, category_id:categoryId}});
        this.contents = response.data;
        // console.log(this.contents);
        this.contentDetails = this.contents[0];
      } catch (error) {
        console.error('Error fetching data:',error);
      } 
    },

    //時間変換
    formatVideoLength(seconds){
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}時間${minutes}分${secs}秒`;
    },

    // コンテントページに飛ぶ
    linkContent(contents_id,cname){
      // console.log('Navigating to content with:', { contents_id: contents_id, cid: this.cid, cname: cname });
      this.$router.push({
        name:'content',
        params: { contents_id: contents_id, cid: this.cid, cname: cname}
      },)
    },
  }
};
</script>