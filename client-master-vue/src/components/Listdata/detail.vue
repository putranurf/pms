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
                    v-model="id_peti"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('id_peti')"
                    label="Kode Peti"
                    data-vv-name="id_peti"                                            
                    box
                    readonly
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="nomor_pd"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('nomor_pd')"
                    label="Nomor PD"
                    data-vv-name="nomor_pd"
                    box
                    readonly
                    required
                  ></v-text-field> 
                   <v-text-field
                    v-model="kode_mat"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('kode_mat')"
                    label="Kode Material"
                    data-vv-name="kode_mat"
                    box
                    readonly
                    required
                  ></v-text-field>                 
                  <v-text-field
                    v-model="desc_mat"
                    v-validate="'required|max:100'"
                    :counter="100"
                    :error-messages="errors.collect('desc_mat')"
                    label="Deskripsi Material"
                    data-vv-name="desc_mat"
                    box
                    readonly
                    required
                  ></v-text-field>  
                  <v-text-field
                    v-model="qty"
                    v-validate="'required|max:4'"
                    :counter="4"
                    :error-messages="errors.collect('qty')"
                    label="Quantity"
                    data-vv-name="qty"
                    box
                    readonly
                    required
                  ></v-text-field>
                  <!-- <v-btn @click="submit" v-on:click="updateCustomer" >submit</v-btn>
                  <v-btn @click="clear">clear</v-btn> -->
                </form>

              </v-card-text>
            </v-card>
          </v-flex>         
        </v-layout>
      </v-flex>
    </v-layout>    
    <v-data-table
        :headers="headers"
        :items="list"
        :items-per-page="10"
        class="elevation-1"
    >
        <template v-slot:items="props">
            <td>{{ props.item.nomor_routing }}</td>
            <td>{{ props.item.nama_routing }}</td>
        </template>
    </v-data-table>
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
  import http from "../../http-common.js";
  import router from '../../router'
  
  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
    //   detail: {
    //     id: 0,
    //     name: "",
    //     age: '',
    //     active: false
    //   },
    //   items: [
    //     'Aktif',
    //     'Tidak Aktif',
    //   ],
    //   checkbox: null,
    //   dictionary: {
    //     attributes: {
    //       email: 'E-mail Address'
    //       // custom attributes
    //     },
    //     custom: {
    //       name: {
    //         required: () => 'Name can not be empty',
    //         max: 'The name field may not be greater than 10 characters'
    //         // custom messages
    //       },
    //       age: {
    //         required: () => 'Age can not be empty',
    //         max: 'The age field may not be greater than 2 numbers'
    //         // custom messages
    //       },
    //       select: {
    //         required: 'Select field is required'
    //       }
    //     }
    //   },
    // pagination: {
    //     rowsPerPage: 100
    // },
     drawer: null,
      footer: {
        inset: true
      },
      nama_login_user: {},
       id_peti: null,   
       nomor_pd: null,   
       kode_mat: null,
       desc_mat: null,
       qty: null,
       nomor_routing: null,
       nama_routing: null,
       headers: [          
          { text: 'Nomor Routing', value: 'nomor_routing' },
          { text: 'Nama Routing', value: 'nama_routing' },
        ],
        list: []
    }),

    mounted () {
      // if(!localStorage.getItem('user')){
      //   router.push('/auth')
      // } 
      // this.nama_login_user = JSON.parse(localStorage.getItem("user"))
      this.$validator.localize('en', this.dictionary)
      var currentUrl = window.location.href
      var uri = currentUrl.split("/")    
      http.get('/getPetiDetail/'+uri[5]+'')
      .then(response => (this.id_peti   = response.data[0].id_peti,
                         this.nomor_pd = response.data[0].nomor_pd,
                         this.kode_mat = response.data[0].kode_mat,
                         this.desc_mat = response.data[0].desc_mat,
                         this.qty = response.data[0].qty,
                         this.nomor_routing = response.data[0].nomor_routing,
                         this.nama_routing = response.data[0].nama_routing,
                         this.list = response.data))
      

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
    //   updateCustomer() {
    //       var data = {
    //         id: this.id_senjata,
    //         name: this.nama_senjata,
    //         age: this.umur_senjata          
    //       };
    //       console.log(data);
    //       http
    //         .put("/update", data)
    //         .then(response => {
    //           this.customer.id = response.data.id;
    //           this.customer.name = response.data.name;
    //           this.customer.age = response.data.age;
    //           console.log(response.data);
    //         })
    //         .catch(e => {
    //           console.log(e);
    //         });
    
    //       this.submitted = true;
    //     },
        // newCustomer() {
        //   this.submitted = false;
        //   this.customer = {};
        // }
    }
  }
</script>