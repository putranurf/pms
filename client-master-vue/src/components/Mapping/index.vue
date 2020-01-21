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
        <!-- <li>
          <router-link @click.native=" " to="/keterlambatan">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>desktop_windows</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Laporan Keterlambatan</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/dispatchlist">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>desktop_windows</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Dispatch List</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/laporanio">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>desktop_windows</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Laporan I/O</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>
        <li>
          <router-link @click.native=" " to="/hasilproduksi">
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>desktop_windows</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Laporan Hasil Produksi</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </li>
        <v-divider></v-divider>-->
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
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="primary" v-model="nama_login_user" to="/profil">
          <v-icon large>person</v-icon>
          {{nama_login_user.nama_lengkap}}
        </v-btn>
      </v-toolbar-items>
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
                    <!-- <v-alert
                      :value="true"
                      type="success"
                    >
                      This is a success alert.
                    </v-alert>-->
                    <ValidationObserver v-slot="{ handleSubmit }">
                  <v-form @submit.prevent="handleSubmit(onSubmit)">
                    <v-text-field v-model="fname" name="First Name" rules="required" />

                    <v-text-field v-model="lname" name="Last Name" rules="required" />

                    <v-text-field v-model="email" name="E-mail" rules="required|email" />

                    <v-text-field v-model="password" type="password" name="Password" rules="required|min:6|confirmed:confirmation" />

                    <v-text-field v-model="passwordConfirmation" type="password" name="Confirmation" vid="confirmation" rules="required" />

                    <v-text-field v-model="country" name="Country" rules="required" />

                    <button>Submit</button>
                  </v-form>
                </ValidationObserver>
                    <v-form ref="form" @submit.prevent="saveMappingRooting">
                      <!-- <p>{{ error }}</p>

                      <p class="decode-result">Last result: <b>{{ result }}</b></p>

                      <qrcode-stream @decode="onDecode" @init="onInit" />-->

                      <v-text-field
                        v-model="mapping_rooting.id_peti"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('id_peti')"
                        label="Nomor Peti"
                        data-vv-name="id_peti"
                        ref="id_peti"
                        v-on:keyup="uppercase()"
                        class="peti_uppercase"
                        required
                      ></v-text-field>

                      <!-- <v-text-field
                        v-model="transaksi.age"
                        v-validate="'required|max:2'"
                        :counter="2"
                        :error-messages="errors.collect('age')"
                        label="Umur"
                        data-vv-name="age"
                        required
                      ></v-text-field>-->

                      <!-- <v-select
                        v-model="mapping_rooting.nomor_pd"
                        v-validate="'required'"
                        :items="items"
                        :error-messages="errors.collect('nomor_pd')"
                        label="Nomor PD"
                        data-vv-name="nomor_pd"                    
                        @change="changeItem($event)"
                        required
                      ></v-select>-->

                      <v-autocomplete
                        v-model="mapping_rooting.nomor_pd"
                        v-validate="'required'"
                        :items="items"
                        :error-messages="errors.collect('nomor_pd')"
                        :label="'Nomor PD'"
                        data-vv-name="nomor_pd"
                        @change="changeItem($event)"
                        id="nomor_pd"
                        required
                      >
                        <template v-slot:append-outer>
                          <v-slide-x-reverse-transition mode="out-in"></v-slide-x-reverse-transition>
                        </template>
                      </v-autocomplete>

                      <v-layout>
                        <v-flex xs3 sm3>
                          <v-text-field
                            v-model="mapping_rooting.kode_mat"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('kode_mat')"
                            label="Kode Material"
                            data-vv-name="kode_mat"
                            box
                            readonly
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs3 sm3>
                          <v-text-field
                            v-model="mapping_rooting.desc_mat"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('desc_mat')"
                            label="Deskripsi Material"
                            data-vv-name="desc_mat"
                            box
                            readonly
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs3 sm3>
                          <v-text-field
                            v-model="mapping_rooting.qty"
                            v-validate="'required|numeric|max:4|max_value:' + mapping_rooting.sisa_qty"
                            :counter="50"
                            :error-messages="errors.collect('qty')"
                            label="Quantity"
                            data-vv-name="qty"
                            outlined
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs3 sm3>
                          <v-text-field
                            v-model="mapping_rooting.sisa_qty"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('sisa_qty')"
                            label="Sisa Quantity"
                            data-vv-name="sisa_qty"
                            box
                            readonly
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn type="submit">submit</v-btn>
                      <!-- <v-btn @click="clear">clear</v-btn> -->
                    </v-form>
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
import http from "../../http-common";
import router from "../../router";
import Cookies from "js-cookie";
// import { QrcodeStream } from 'vue-qrcode-reader'

// import { mapState } from 'vuex'
// import {
//   mapActions, mapGetters
// } from 'vuex'

Vue.use(VeeValidate);

var nama_login = "";

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    fname: '',
    lname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    country: '',
    drawer: null,
    footer: {
      inset: true
    },
    result: "",
    error: "",
    nama_login_user: {},
    breadcumbs: [
      {
        text: "Home"
      },
      {
        text: "Locking Data"
      }
    ],
    snackbar_sukses: false,
    text_sukses: "",
    timeout_sukses: 0,
    snackbar_gagal: false,
    text_gagal: "",
    timeout_gagal: 0,
    id: null,
    nomor_pd: null,
    mapping_rooting: {
      id: 0,
      id_peti: "",
      kode_mat: "",
      desc_mat: "",
      qty: "",
      sisa_qty: "",
      nomor_pd: ""
    },
    items: [],
    checkbox: null,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        id_peti: {
          required: () => "Nomor Peti can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        kode_mat: {
          required: () => "Kode Material can not be empty",
          max: "The age field may not be greater than 2 numbers"
          // custom messages
        },
        desc_mat: {
          required: () => "Deskripsi Material can not be empty",
          max: "The age field may not be greater than 2 numbers"
          // custom messages
        },
        qty: {
          required: () => "Quantity can not be empty",
          max: "The age field may not be greater than 2 numbers"
          // custom messages
        },
        nomor_pd: {
          required: "Nomor PD field is required"
        }
      }
    }
  }),

  mounted() {
    // if(!localStorage.getItem('user')){
    //   router.push('auth')
    // }
    // this.nama_login_user = JSON.parse(localStorage.getItem("user"))

    // if (!Cookies.get("user")) {
    //   router.push("/auth");
    // }

    this.nama_login_user = JSON.parse(Cookies.get("user"));
    this.$refs.id_peti.focus();
    // console.log(this.$store.state)
    // this.$store.dispatch('loadCoins')
    this.$validator.localize("en", this.dictionary);
    // console.log(this.$store.dispatch)
    http.get("/getNomorPd").then(response => {
      this.data = response.data;
      this.data.forEach(item => {
        this.items.push(item.nomor_pd);
        // this.nama_pd.push(item.desc_mat)
      });
    });
  },
  // computed:{
  //   ...mapGetters(['getCoins'])
  // },

  methods: {
    onSubmit () {
      alert('Form submitted!');
    },
    // ...mapActions(['loadCoins']),
    uppercase() {
      // console.log(this.nama_login_user)
    },
    // onDecode (result) {
    //   this.result = result
    // },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.id_peti = "";
      this.qty = "";
      this.kode_mat = "";
      this.desc_mat = "";
      this.nomor_pd = null;
      this.checkbox = null;
      this.$validator.reset();
    },
    
    saveMappingRooting() {
      this.submitted = true;      
      this.$validator.$touch();
      if (this.$validator.$invalid) {
        return;
      }

      var data = {
        id_peti: this.mapping_rooting.id_peti,
        nomor_pd: this.mapping_rooting.nomor_pd,
        kode_mat: this.mapping_rooting.kode_mat,
        desc_mat: this.mapping_rooting.desc_mat,
        qty: this.mapping_rooting.qty
      };

      http
        .post("/postMappingRooting", data)
        .then(response => {
          if (response.data == "sukses") {
            console.log(response);
            this.snackbar_sukses = true;
            this.text_sukses = "Data Mapping Berhasil di Input.";
            this.timeout_sukses = 3000;
          } else {
            this.snackbar_gagal = true;
            this.text_gagal =
              "Data Mapping Gagal di Input. Sudah terdapat pada sistem";
            this.timeout_gagal = 3000;
          }
        })
        .catch(e => {
          console.log(e);
        });

      // this.submitted = true;
      this.$refs.form.reset();
      // location.reload()

      //Mengurangi Quantity di Tabel Mapping Routing Header
      http
        .put("/setQty/", data)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },

    newMapping_rooting() {
      this.submitted = false;
      this.mapping_rooting = {};
    },
    changeItem: function changeItem(event) {
      // alert(event)
      http.get("getNomorPdDetail/" + event.toString() + "").then(response => {
        this.mapping_rooting.kode_mat = response.data[0].kode_mat;
        this.mapping_rooting.desc_mat = response.data[0].desc_mat;
        this.mapping_rooting.sisa_qty = response.data[0].qty;
        // if (response.data[0].qty >= 50) {
        //   this.mapping_rooting.qty = 50
        // } else {
        //   this.mapping_rooting.qty = response.data[0].qty
        // }
      });
    }
  }
  // created() {
  //   this.loadCoins()
  // },
};
</script>

<style>
.peti_uppercase input {
  text-transform: uppercase;
}
</style>

