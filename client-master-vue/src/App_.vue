<template>
  <v-app id="inspire">          
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >          
      <v-list dense>               
          <li><v-flex xs12>
        <v-img
          :src="require('./assets/logo_company.png')"
          class="my-3"
          contain
          height="90"
        ></v-img>
      </v-flex></li>      
          <v-divider></v-divider>
          <li><router-link @click.native="sayHello" to="/" >
            <v-list-tile @click="">            
              <v-list-tile-action>
                <v-icon>books</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Mapping Data</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native="sayHello" to="/listdata" >
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>view_list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>List Data</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native="sayHello" to="/lepasdata" >
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>delete_forever</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Lepas Data</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native="sayHello" to="/listdata" >
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Production Monitoring System</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <!-- <Mapping/> -->
      <router-view></router-view>
    </v-content>
    <v-footer :inset="footer.inset" color="indigo" app>
       <span class="px-3 white--text">&copy; {{ new Date().getFullYear() }} Divisi Sistem Informasi Manajemen PT Pindad (Persero)</span>
    </v-footer>
     
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
