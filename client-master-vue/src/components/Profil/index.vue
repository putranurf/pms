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
          <router-link @click.native=" " to="/keterlambatan">
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
                    <v-form ref="form">
                      <v-text-field
                        v-model="npp"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('npp')"
                        label="NPP"
                        data-vv-name="npp"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="nama_lengkap"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nama_lengkap')"
                        label="Nama Lengkap"
                        data-vv-name="nama_lengkap"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('password')"
                        label="Password Lama"
                        data-vv-name="password"
                        box
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password_baru"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('password_baru')"
                        label="Password Baru"
                        data-vv-name="password_baru"
                        type="password"
                        required
                      ></v-text-field>

                      <v-btn @click="submit" v-on:click="saveProfil">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
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

Vue.use(VeeValidate);

var nama_login = "";

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    drawer: null,
    footer: {
      inset: true
    },
    nama_login_user: {},
    breadcumbs: [
      {
        text: "Home"
      },
      {
        text: "Profil"
      }
    ],
    snackbar_sukses: false,
    text_sukses: "",
    timeout_sukses: 0,
    snackbar_gagal: false,
    text_gagal: "",
    timeout_gagal: 0,
    id: null,
    npp: "",
    nama_lengkap: "",
    password: "",
    password_baru: "",
    items: [],
    checkbox: null,
    dictionary: {
      attributes: {
        email: "E-mail Address"
      },
      custom: {
        npp: {
          required: () => "NPP can not be empty",
          max: "The npp field may not be greater than 10 characters"
        },
        nama_lengkap: {
          required: () => "Nama Lengkap can not be empty",
          max: "The nama lengkap field may not be greater than 2 numbers"
        },
        password: {
          required: () => "Password Lama can not be empty",
          max: "The password lama field may not be greater than 2 numbers"
        },
        password_baru: {
          required: () => "Password Baru can not be empty",
          max: "The password baru field may not be greater than 2 numbers"
        }
      }
    }
  }),

  mounted() {
    // if(!localStorage.getItem('user')){
    //   router.push('auth')
    // }
    // this.nama_login_user = JSON.parse(localStorage.getItem("user"))
    this.nama_login_user = JSON.parse(Cookies.get("user"));
    this.$validator.localize("en", this.dictionary);
    http
      .get("/getUserDetail/" + this.nama_login_user.npp + "")
      .then(
        response => (
          (this.npp = response.data[0].npp),
          (this.nama_lengkap = response.data[0].nama_lengkap),
          (this.password = response.data[0].password),
          console.log(response.data[0].npp)
        )
      );
  },

  methods: {
    uppercase() {
      // console.log(this.nama_login_user)
    },
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.npp = "";
      this.nama_lengkap = "";
      this.password = "";
      this.password_baru = "";
      this.$validator.reset();
    },
    saveProfil() {
      var data = {
        npp: this.npp,
        nama_lengkap: this.nama_lengkap,
        password: this.password,
        password_baru: this.password_baru
      };

      http
        .put("/gantiPassword", data)
        .then(response => {
          if (response.data == "sukses") {
            console.log(response);
            this.snackbar_sukses = true;
            this.text_sukses = "Password Berhasil di Ubah.";
            this.timeout_sukses = 3000;
          } else {
            this.snackbar_gagal = true;
            this.text_gagal = "Password Gagal di Ubah";
            this.timeout_gagal = 3000;
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
      this.$refs.form.reset();
      // location.reload()
    },
    newMapping_rooting() {
      this.submitted = false;
      //   this.mapping_rooting = {};
    }
    // changeItem: function changeItem(event) {
    //    http
    //    .get('getNomorPdDetail/'+event.toString()+'')
    //    .then(response => {
    //       this.mapping_rooting.kode_mat = response.data[0].kode_mat
    //       this.mapping_rooting.desc_mat = response.data[0].desc_mat
    //       this.mapping_rooting.qty = response.data[0].qty })
    // },
  }
};
</script>

<style>
.peti_uppercase input {
  text-transform: uppercase;
}
</style>
