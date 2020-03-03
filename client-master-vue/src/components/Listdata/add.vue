

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <li>
          <v-flex xs12>
            <v-img :src="require('../../assets/logo_company.png')" class="my-3" contain height="90"></v-img>
          </v-flex>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>lock</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Locking Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/listdata">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>view_list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>List Data Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/lepasdata">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>delete_forever</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Unlocking Data Lot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/laporan">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>desktop_windows</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Laporan</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/export">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>cloud_download</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Export</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/logout">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Production Monitoring System</v-toolbar-title>
    </v-toolbar>
    <template>
      <v-container id="grid" fluid grid-list-sm tag="section">
        <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
        <v-layout row wrap>
          <!-- <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex> -->
          <v-flex d-flex xs12 order-xs5>
            <v-layout column>
              <v-flex>
                <v-card flat>
                  <v-card-text>
                    <form>
                      <v-text-field
                        v-model="nomor_routing"
                        v-validate="'required|numeric|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nomor_routing')"
                        label="Nomor Routing"
                        data-vv-name="nomor_routing"       
                        required                 
                      ></v-text-field>
                      <v-text-field
                        v-model="nama_routing"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nama_routing')"
                        label="Nama Routing"
                        data-vv-name="nama_routing"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="work_center"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('work_center')"
                        label="Work Center"
                        data-vv-name="work_center"
                        required
                      ></v-text-field>
                      <v-btn @click="submit" v-on:click="postAddLot">submit</v-btn>
                      <!-- <v-btn @click="clear">clear</v-btn> -->
                    </form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <div class="text-center">
          <v-snackbar
            color="cyan darken-2"
            v-model="snackbar_sukses"
            :timeout="timeout_sukses"
          >{{ text_sukses }}</v-snackbar>
        </div>
        <div class="text-center">
          <v-snackbar
            color="red darken-2"
            v-model="snackbar_gagal"
            :timeout="timeout_gagal"
          >{{ text_gagal }}</v-snackbar>
        </div>
      </v-container>
    </template>
    <v-footer :inset="footer.inset" color="indigo" app>
      <span
        class="px-3 white--text"
      >&copy; {{ new Date().getFullYear() }} Divisi Sistem Informasi Manajemen PT Pindad (Persero)</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import http from "../../http-common.js";
import router from "../../router";

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    drawer: null,
    footer: {
      inset: true
    },
    customer: {
      id: 0,
      name: "",
      age: "",
      active: false
    },
    items: ["Aktif", "Tidak Aktif"],
    checkbox: null,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        age: {
          required: () => "Age can not be empty",
          max: "The age field may not be greater than 2 numbers"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    },
    nomor_routing: null,
    nama_routing: null,
    work_center: null,
    breadcumbs: [
        {
          text: "Home"
        },
        {
          text: "List Data Lot"
        },
        {
          text: "Detail Lot"
        },
        {
          text: "Add Lot"
        }
      ],
    snackbar_sukses: false,
    text_sukses: "",
    timeout_sukses: 0,
    snackbar_gagal: false,
    text_gagal: "",
    timeout_gagal: 0,
  }),

  mounted() {
    // if(!localStorage.getItem('user')){
    //   router.push('/auth')
    // }
    this.$validator.localize("en", this.dictionary);
    var currentUrl = window.location.href;
    var uri = currentUrl.split("/");
    
    // http
    //   .get("/getPetiDetailEdit/" + uri[6] + "/" + uri[7] )
    //   .then(
    //     response => (
    //       (this.nomor_routing = response.data[0].nomor_routing),
    //       (this.nama_routing = response.data[0].nama_routing),
    //       (this.work_center = response.data[0].work_center),
    //       (this.nomor_pd = response.data[0].nomor_pd)
    //     )
    //   );
  },

  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.nomor_routing = "";
      this.nama_routing = "";
      this.work_center = "";
      // this.checkbox = null;
      this.$validator.reset();
    },
    postAddLot() {
      this.$validator.validateAll().then(result => {
        if (result) { 
          let currentUrl = window.location.href;
          let uri = currentUrl.split("/");         
          var data = {
            nomor_routing: this.nomor_routing,
            nama_routing: this.nama_routing,
            work_center: this.work_center,
            id_peti: uri[6],
            nomor_pd: uri[7].replace("%", " ")
          };
          // console.log(data)

          // http
          //   .get("/getPetiDetailEdit/" + uri[6] + "/" + uri[7] )
          //   .then(
          //     response => (
          //       (this.nomor_routing = response.data[0].nomor_routing),
          //       (this.nama_routing = response.data[0].nama_routing),
          //       (this.work_center = response.data[0].work_center),
          //       (this.nomor_pd = response.data[0].nomor_pd)
          //     )
          //   );


          http
            .post("/postAddLot", data)
            .then(response => {
              console.log(response)
              // if (response.data == "sukses") {
                // console.log(response);
                this.snackbar_sukses = true;
                this.text_sukses = "Data Mapping Berhasil di Input.";
                this.timeout_sukses = 3000;
                this.clear()
              // } else {
                // this.snackbar_gagal = true;
                // this.text_gagal =
                //   "Data Mapping Gagal di Input. Sudah terdapat pada sistem";
                // this.timeout_gagal = 3000;
              // }
            })
            .catch(e => {
              console.log(e);
              this.snackbar_gagal = true;
              this.text_gagal =
                "Data Mapping Gagal di Input. Sudah terdapat pada sistem";
              this.timeout_gagal = 3000;
            });

          // this.submitted = true;
          // this.$refs.form.reset();
          // this.$validator.reset();

          // return;
        }
        // alert("Data Tidak Boleh Kosong");
        // this.snackbar_gagal = true;
        // this.text_gagal = "Data Input Masih Terdapat Kesalahan";
        // this.timeout_gagal = 3000;
      });
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
  }
};
</script>