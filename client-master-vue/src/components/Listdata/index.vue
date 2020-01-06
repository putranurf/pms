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
          :src="require('../../assets/logo_company.png')"
          class="my-3"
          contain
          height="90"
        ></v-img>
      </v-flex></li>                
          <v-divider></v-divider>
          <li><router-link @click.native=" " to="/" >
            <v-list-tile @click="">            
              <v-list-tile-action>
                <v-icon>lock</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Locking Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native=" " to="/listdata" >
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>view_list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>List Data Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native=" " to="/lepasdata" >
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>delete_forever</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Unlocking Data Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link></li>
          <v-divider></v-divider>
          <li><router-link @click.native=" " to="/logout" >
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
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="primary" v-model="nama_login_user" to="/profil"><v-icon large>person</v-icon> {{nama_login_user.nama_lengkap}}</v-btn>     
      </v-toolbar-items>         
    </v-toolbar>
    <!-- <v-content> -->
      <template>
  <v-container
    id="grid"
    fluid
    grid-list-sm
    tag="section"
  >
  <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    <v-layout row wrap>
      <!-- <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex> -->
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex>
            <v-card flat>
              <v-card-text>                
               
                    <v-card-title>
                    List Data
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="peti"
                    :search="search"
                    >
                    <template v-slot:items="props">
                        <td>{{ props.item.id_peti }}</td>
                        <td>{{ props.item.nomor_pd }}</td>
                        <td>{{ props.item.kode_mat }}</td>     
                        <td>{{ props.item.desc_mat }}</td>     
                        <td>{{ props.item.qty }}</td>     
                        <td>
                            <router-link class="btn btn-primary" v-bind:to="'/listdata/detail/'+props.item.id_peti">
                            <v-btn color="primary" fab small dark>
                              <v-icon>search</v-icon>
                            </v-btn>
                            </router-link>
                            <!-- <router-link class="btn btn-primary" v-bind:to="'/listdata/edit/'+props.item.id">
                            <v-btn color="primary" fab small dark>
                              <v-icon>edit</v-icon>
                            </v-btn>
                            </router-link> -->
                            <!-- <router-link class="btn btn-primary" > -->
                            <!-- <v-btn color="primary" fab small dark v-on:click="deletePeti(props.item.id_peti)">
                              <v-icon>delete</v-icon>
                            </v-btn> -->
                            <!-- </router-link> -->
                            <!-- <v-btn color="red" fab small dark>
                              <v-icon>delete</v-icon>
                            </v-btn> -->
                        </td> 
                    </template>
                    
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </template>
                    </v-data-table>
               
              </v-card-text>
            </v-card>
          </v-flex>          
        </v-layout>
      </v-flex>      
    </v-layout>
  </v-container>
</template>
    <!-- </v-content> -->
    <v-footer :inset="footer.inset" color="indigo" app>
       <span class="px-3 white--text">&copy; {{ new Date().getFullYear() }} Divisi Sistem Informasi Manajemen PT Pindad (Persero)</span>
    </v-footer>
     
  </v-app>
</template>  

<script>

import http from "../../http-common.js"
import router from '../../router'

  export default {
    data () {
      return {
         drawer: null,
         nama_login_user: {},
      footer: {
        inset: true
      },
        search: '',        
        headers: [
          { text: 'Kode Peti', value: 'id_peti' },
          { text: 'Nomor PD', value: 'nomor_pd' },
          { text: 'Kode Material', value: 'kode_mat' },          
          { text: 'Deskripsi Material', value: 'desc_mat' },    
          { text: 'Quantity', value: 'qty' },    
          { text: 'Detail', value: 'detail' },    
        ],
        peti: [], 
        breadcumbs: [
        {
          text: 'Home',
        },
        {
          text: 'List Data Lot',
        },        
        ]       
      }
    },
    
    dialog: false,
    methods: {
      /* eslint-disable no-console */
      retrievePeti() {
        http
          .get("/getPeti")
          .then(response => {
            this.peti = response.data; // JSON are parsed automatically.
            // console.log(this.peti[0].name);               
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrievePeti();
      },
      edit: function (event) {
        // `this` inside methods points to the Vue instance
        alert('Hello ' + this.name + '!')
        // `event` is the native DOM event
        if (event) {
          alert(event.target.tagName)
        }
      },
      deletePeti(e){
         var data = {
            id_peti: e,
           
          };
        http
        .post("/postDelete", data)
        .then(response => {
          // console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        window.location.reload()
      }
    },
    mounted() {
      if(!localStorage.getItem('user')){
        router.push('/auth')
      } 
      this.nama_login_user = JSON.parse(localStorage.getItem("user"))
      this.retrievePeti();
      
    }
  }
</script>