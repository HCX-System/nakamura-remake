<template>
  <div class="courses-list">
    <section class="jumbotron text-center">
      <div class="container">
        <h3>オンライン講座　コース一覧</h3>
        <p class="lead text-muted">
          学習するコースの「学習する」ボタンをクリックするとe-ラーニング動画の視聴と教材のダウンロードができます。
        </p>
      </div>
    </section>
    <div class="album py-5 bg-light">
      <div class="container">
        <div v-if="courses.length > 0" class="row">
          <div v-for="course in courses" :key="course.id" class="col-12 col-md-6 col-xl-4">
            <div class="card mb-4 shadow-sm">
              <a v-on:click="linkCategory(course.id)" class="cursor-point">
                <img v-bind:src="course.img_url" class="card-img-top" aria-label="Placeholder: Thumbnail">
              </a>
              <div class="card-body">
                <div class="card-text">
                  <a v-on:click="linkCategory(course.id)" class="cursor-point"><i class="material-symbols-outlined mb-48">menu_book</i>{{course.name}}</a>
                  <span class="text-volume">全{{course.total}}回</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <small>講師:{{course.instructor_name}}</small>
                  </div>
                  <button class="btn btn-outline-primary btn-sm"  v-on:click="linkCategory(course.id)"><i class="material-symbols-outlined">edit</i>学習する</button>
                </div>
              </div>
            </div>
          </div><!--class="col-md-4"-->
        </div><!--class="row"-->
        <div v-else>
          データ読込中です
        </div>
      </div><!--class="container"-->
    </div><!--class="album"-->
  </div><!--class="courses-list"-->
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      courses:[]
    }
  },
  
  mounted() {
    this.getCourses();
  },

  methods: {
    async getCourses() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      try {
        const response = await axios.get('courses/', { headers });
        this.courses = response.data;
        console.log(this.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    linkCategory(cid){
      this.$router.push({path: `/contents/${cid}`})
    },
  },

};
</script>