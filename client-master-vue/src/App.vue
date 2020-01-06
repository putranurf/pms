<template>
  <v-app id="inspire">              
    <v-content>      
      <router-view></router-view>
    </v-content>    
  </v-app>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: 'App',  
  data () {
    return {
      drawer: null,
      footer: {
        inset: true
      }
    }
  },
  props: {
      source: String
    },  
      methods: {
    sayHello() {
      console.log('hello world');
    }
  },
  
  
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
li a {
    text-decoration: none;
    color:rgba(0,0,0,.87);
}
</style>
