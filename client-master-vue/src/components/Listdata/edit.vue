

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
    </v-toolbar>
    <template>
  <v-container
    id="grid"
    fluid
    grid-list-sm
    tag="section"
  >
    <v-layout row wrap>
      <!-- <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex> -->
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex>
            <v-card flat>
              <v-card-text>                      
                <form>                    
                  <v-text-field
                    v-model="id_senjata"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('id')"
                    label="ID"
                    data-vv-name="id"                                            
                    box
                    readonly
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="nama_senjata"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('name')"
                    label="Nama"
                    data-vv-name="name"
                    required
                  ></v-text-field> 
                   <v-text-field
                    v-model="umur_senjata"
                    v-validate="'required|max:2'"
                    :counter="2"
                    :error-messages="errors.collect('age')"
                    label="Umur"
                    data-vv-name="age"
                    required
                  ></v-text-field>                 
                  <v-btn @click="submit" v-on:click="updateCustomer" >submit</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </form>

              </v-card-text>
            </v-card>
          </v-flex>         
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
    <v-footer :inset="footer.inset" color="indigo" app>
       <span class="px-3 white--text">&copy; {{ new Date().getFullYear() }} Divisi Sistem Informasi Manajemen PT Pindad (Persero)</span>
    </v-footer>
     
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import http from "../../http-common.js"
  import router from '../../router'

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
       drawer: null,
      footer: {
        inset: true
      },
      customer: {
        id: 0,
        name: "",
        age: '',
        active: false
      },
      items: [
        'Aktif',
        'Tidak Aktif',
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          age: {
            required: () => 'Age can not be empty',
            max: 'The age field may not be greater than 2 numbers'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      },
       id_senjata: null,   
       nama_senjata: null,   
       umur_senjata: null
    }),

    mounted () {
      // if(!localStorage.getItem('user')){
      //   router.push('/auth')
      // } 
      this.$validator.localize('en', this.dictionary)
      var currentUrl = window.location.href
      var uri = currentUrl.split("/")      

      http.get('/getPetiDetail/'+uri[6]+'')
      .then(response => (this.id_senjata   = response.data[0].id,
                         this.nama_senjata = response.data[0].name,
                         this.umur_senjata = response.data[0].age))
    },

    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      },
      updateCustomer() {
          var data = {
            id: this.id_senjata,
            name: this.nama_senjata,
            age: this.umur_senjata          
          };
          console.log(data);
          http
            .put("/update", data)
            .then(response => {
              this.customer.id = response.data.id;
              this.customer.name = response.data.name;
              this.customer.age = response.data.age;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
    
          this.submitted = true;
        },
        newCustomer() {
          this.submitted = false;
          this.customer = {};
        }
    }
  }
</script>