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
                      <v-autocomplete
                        v-model="mapping_rooting.id_peti"
                        v-validate="'required'"
                        :items="items"
                        :error-messages="errors.collect('id_peti')"
                        :label="'Nomor Peti'"
                        data-vv-name="id_peti"
                        @change="changeItem($event)"
                        id="id_peti"
                        ref="id_peti"
                        class="peti_uppercase"
                        required
                      >
                        <template v-slot:append-outer>
                          <v-slide-x-reverse-transition mode="out-in"></v-slide-x-reverse-transition>
                        </template>
                      </v-autocomplete>

                      <!-- <v-flex xs12 sm12>
                            <v-text-field
                            v-model="mapping_rooting.id_peti"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('id_peti')"
                            label="Nomor Peti"
                            data-vv-name="id_peti"
                            v-on:keyup="changeItem($event)"
                            box
                            required
                            ></v-text-field>
                      </v-flex>-->

                      <v-flex xs12 sm12>
                        <v-text-field
                          v-model="mapping_rooting.nomor_pd"
                          v-validate="'required|max:50'"
                          :counter="50"
                          :error-messages="errors.collect('nomor_pd')"
                          label="Nomor PD"
                          data-vv-name="nomor_pd"
                          box
                          readonly
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-layout>
                        <v-flex xs4 sm4>
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

                        <v-flex xs4 sm4>
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

                        <v-flex xs4 sm4>
                          <v-text-field
                            v-model="mapping_rooting.qty"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('qty')"
                            label="Quantity"
                            data-vv-name="qty"
                            box
                            readonly
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn @click="submit" v-on:click="lepasNomorPd">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <div class="text-center">
          <v-snackbar color="cyan darken-2" v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
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
var arr = "";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    drawer: null,
    nama_login_user: {},
    footer: {
      inset: true
    },
    isEditing: true,
    model: null,
    snackbar: false,
    text: "",
    timeout: 0,
    snackbar_gagal: false,
    text_gagal: "",
    timeout_gagal: 0,
    breadcumbs: [
      {
        text: "Home"
      },
      {
        text: "Unlocking Data"
      }
    ],
    id: null,
    id_peti: null,
    mapping_rooting: {
      id: 0,
      id_peti: "",
      kode_mat: "",
      desc_mat: "",
      qty: "",
      nomor_pd: "",
      urutan_pd: ""
    },
    items: [],
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        nomor_pd: {
          required: () => "Nomor PD can not be empty",
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
        id_peti: {
          required: "Nomor Peti field is required"
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
    this.$refs.id_peti.focus();
    this.$validator.localize("en", this.dictionary);
    http.get("/getPeti").then(response => {
      this.data = response.data;
      this.data.forEach(item => {
        this.items.push(item.id_peti);
      });
    });
  },

  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.id_peti = "";
      this.qty = "";
      this.kode_mat = "";
      this.desc_mat = "";
      this.nomor_pd = "";
      this.checkbox = null;
      this.$validator.reset();
    },
    lepasNomorPd() {
      var data = {
        id_peti: this.mapping_rooting.id_peti,
        nomor_pd: this.mapping_rooting.nomor_pd,
        urutan_pd: this.mapping_rooting.urutan_pd
      };
      console.log(data);
      http
        .put("/lepas", data)
        .then(response => {
          if (response.data == "sukses") {
            this.snackbar = true;
            this.text = "Data Lot Berhasil di Unlock.";
            this.timeout = 3000;
          } else {
            this.snackbar_gagal = true;
            this.text_gagal =
              "Unlock Gagal. Kotak LOT ini Sedang di Proses Produksi.";
            this.timeout_gagal = 3000;
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
      this.$refs.form.reset();
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    },
    changeItem: function changeItem(event) {
      // arr = arr + event.key
      console.log(event.toString());
      http.get("getNomorPetiDetail/" + event.toString() + "").then(response => {
        this.mapping_rooting.nomor_pd = response.data[0].nomor_pd;
        this.mapping_rooting.kode_mat = response.data[0].kode_mat;
        this.mapping_rooting.desc_mat = response.data[0].desc_mat;
        this.mapping_rooting.qty = response.data[0].qty;
        this.mapping_rooting.urutan_pd = response.data[0].urutan_pd;
      });
    }
  }
};
</script>

<style>
.peti_uppercase input {
  text-transform: uppercase;
}
</style>