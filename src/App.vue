<template>
  <v-app>
<!--    <div-->
<!--        class="d-flex flex-row align-center ma-2 "-->
<!--    >-->
<!--      <v-img-->
<!--          alt="Vuetify Logo"-->
<!--          class="shrink mr-2"-->
<!--          contain-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
<!--          transition="scale-transition"-->
<!--          width="40"-->
<!--      />-->
<!--      <span style="font-size: 24px">待办日历</span>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--          v-for="(link,item) in links"-->
<!--          :key="item"-->
<!--          text-->
<!--          @click="submit(link.path)"-->
<!--      >-->
<!--        {{ link.name }}-->
<!--      </v-btn>-->

<!--      <v-spacer></v-spacer>-->
<!--    </div>-->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import router from '@/router/index.js'

export default {
  name: 'App',
  data: () => ({
    links: []
  }),
  methods:{
    init(){
      this.links = router.options.routes;
      this.$router.push({path: '/calendar'},()=>{},()=>{});
    },
    submit(path){
      this.$router.push({path: path});
    }
  },
  created(){
    this.init();
  }
};
</script>
