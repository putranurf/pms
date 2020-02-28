

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
        <v-layout row wrap>
          <!-- <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex> -->
          <v-flex d-flex xs12 order-xs5>
            <v-layout column>
              <v-flex>
                <v-card flat>
                  <v-card-text>
                    <form>
                      <v-text-field
                        v-model="nomor_pd"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nomor_pd')"
                        label="Nomor PD"
                        data-vv-name="nomor_pd"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="qty"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('qty')"
                        label="Quantity"
                        data-vv-name="qty"
                        box
                        readonly
                        
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
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="total_routing"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('total_routing')"
                        label="Total Routing"
                        data-vv-name="total_routing"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="uom"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('uom')"
                        label="UOM"
                        data-vv-name="uom"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="lot"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('lot')"
                        label="LOT"
                        data-vv-name="lot"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="yield_qty"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('yield_qty')"
                        label="Yield Quantity"
                        data-vv-name="yield_qty"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="scrap_qty"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('scrap_qty')"
                        label="Scrap Quantity"
                        data-vv-name="scrap_qty"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="start_date"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('start_date')"
                        label="Start Date"
                        data-vv-name="start_date"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="start_time"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('start_time')"
                        label="Start Time"
                        data-vv-name="start_time"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="end_date"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('end_date')"
                        label="End Date"
                        data-vv-name="end_date"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="end_time"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('end_time')"
                        label="End Time"
                        data-vv-name="end_time"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="is_send"
                        v-validate="'max:100'"
                        :counter="100"
                        :error-messages="errors.collect('is_send')"
                        label="Is Send"
                        data-vv-name="is_send"
                        box
                        readonly
                      ></v-text-field>
                      <v-text-field
                        v-model="status"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('status')"
                        label="Status"
                        data-vv-name="status"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="nomor_routing"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nomor_routing')"
                        label="Nomor Routing"
                        data-vv-name="nomor_routing"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="all_time"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('all_time')"
                        label="All Time"
                        data-vv-name="all_time"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="id"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('id')"
                        label="ID"
                        data-vv-name="id"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="nama_routing"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nama_routing')"
                        label="Nama Routing"
                        data-vv-name="nama_routing"                        
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="rework"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('rework')"
                        label="Rework"
                        data-vv-name="rework"
                        box
                        readonly
                        
                      ></v-text-field>
                      <v-text-field
                        v-model="reason"
                        v-validate="'max:100'"
                        :counter="100"
                        :error-messages="errors.collect('reason')"
                        label="Reason"
                        data-vv-name="reason"
                        box
                        readonly
                      ></v-text-field>
                      <v-text-field
                        v-model="updated_time"
                        v-validate="'max:100'"
                        :counter="100"
                        :error-messages="errors.collect('updated_time')"
                        label="Updated Time"
                        data-vv-name="updated_time"
                        box
                        readonly
                      ></v-text-field>
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
                        v-model="nama"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('nama')"
                        label="Nama"
                        data-vv-name="nama"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="labor"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('labor')"
                        label="Labor"
                        data-vv-name="labor"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="final_time"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('final_time')"
                        label="Final Time"
                        data-vv-name="final_time"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="mesin"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('mesin')"
                        label="Mesin"
                        data-vv-name="mesin"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="overhead"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('overhead')"
                        label="Overhead"
                        data-vv-name="overhead"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="plant"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('plant')"
                        label="Plant"
                        data-vv-name="plant"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="satuan"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('satuan')"
                        label="Satuan"
                        data-vv-name="satuan"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="work_center"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('work_center')"
                        label="Work Center"
                        data-vv-name="work_center"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="kali"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('kali')"
                        label="Kali"
                        data-vv-name="kali"
                        box
                        readonly
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="urutan_pd"
                        v-validate="'required|max:100'"
                        :counter="100"
                        :error-messages="errors.collect('urutan_pd')"
                        label="Urutan PD"
                        data-vv-name="urutan_pd"
                        box
                        readonly
                        required
                      ></v-text-field>

                      <v-btn @click="submit" v-on:click="editConf">submit</v-btn>
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
    nomor_pd: null,
    qty: null,
    kode_mat: null,
    desc_mat: null,
    total_routing: null,
    uom: null,
    lot: null,
    yield_qty: null,
    scrap_qty: null,
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    is_send: null,
    status: null,
    nomor_routing: null,
    all_time: null,
    id: null,
    nama_routing: null,
    rework: null,
    reason: null,
    updated_time: null,
    npp: null,
    nama: null,
    labor: null,
    final_time: null,
    mesin: null,
    overhead: null,
    plant: null,
    satuan: null,
    work_center: null,
    kali: null,
    urutan_pd: null,
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

    http.get("/getConfDetail/" + uri[6] + "").then(
      response => (
        //   (this.id_senjata = response.data[0].id),
        //   (this.nama_senjata = response.data[0].name),
        //   (this.umur_senjata = response.data[0].age)
        //  console.log(response)
        (this.nomor_pd = response.data[0].nomor_pd),
        (this.qty = response.data[0].qty),
        (this.kode_mat = response.data[0].kode_mat),
        (this.desc_mat = response.data[0].desc_mat),
        (this.total_routing = response.data[0].total_routing),
        (this.uom = response.data[0].uom),
        (this.lot = response.data[0].lot),
        (this.yield_qty = response.data[0].yield_qty),
        (this.scrap_qty = response.data[0].scrap_qty),
        (this.start_date = response.data[0].start_date),
        (this.start_time = response.data[0].start_time),
        (this.end_date = response.data[0].end_date),
        (this.end_time = response.data[0].end_time),
        (this.is_send = response.data[0].is_send),
        (this.status = response.data[0].status),
        (this.nomor_routing = response.data[0].nomor_routing),
        (this.all_time = response.data[0].all_time),
        (this.id = response.data[0].id),
        (this.nama_routing = response.data[0].nama_routing),
        (this.rework = response.data[0].rework),
        (this.reason = response.data[0].reason),
        (this.updated_time = response.data[0].updated_time),
        (this.npp = response.data[0].npp),
        (this.nama = response.data[0].nama),
        (this.labor = response.data[0].labor),
        (this.final_time = response.data[0].final_time),
        (this.mesin = response.data[0].mesin),
        (this.overhead = response.data[0].overhead),
        (this.plant = response.data[0].plant),
        (this.satuan = response.data[0].satuan),
        (this.work_center = response.data[0].work_center),
        (this.kali = response.data[0].kali),
        (this.urutan_pd = response.data[0].urutan_pd)
      )
    );
  },

  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    },
    // updateCustomer() {
    //   var data = {
    //     id: this.id_senjata,
    //     name: this.nama_senjata,
    //     age: this.umur_senjata
    //   };
    //   console.log(data);
    //   http
    //     .put("/update", data)
    //     .then(response => {
    //       this.customer.id = response.data.id;
    //       this.customer.name = response.data.name;
    //       this.customer.age = response.data.age;
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });

    //   this.submitted = true;
    // },
    editConf() {
      let data = {
        nomor_pd: this.nomor_pd ,
        qty: this.qty,
        kode_mat: this.kode_mat,
        desc_mat: this.desc_mat,
        total_routing: this.total_routing,
        uom: this.uom,
        lot: this.lot,
        yield_qty: this.yield_qty,
        scrap_qty: this.scrap_qty,
        start_date: this.start_date,
        start_time: this.start_time,
        end_date: this.end_date,
        end_time: this.end_time,
        is_send: this.is_send,
        status: this.status,
        nomor_routing: this.nomor_routing,
        all_time: this.all_time,
        id: this.id,
        nama_routing: this.nama_routing,
        rework: this.rework,
        reason: this.reason,
        updated_time: this.updated_time,
        npp: this.npp,
        nama: this.nama,
        labor: this.labor,
        final_time: this.final_time,
        mesin: this.mesin,
        overhead: this.overhead,
        plant: this.plant,
        satuan: this.satuan,
        work_center: this.work_center,
        kali: this.kali,
        urutan_pd: this.urutan_pd
      };
      http
        .put("/editConf", data)
        .then(response => {
          // this.customer.id = response.data.id;
          // this.customer.name = response.data.name;
          // this.customer.age = response.data.age;
          // console.log('berhasil');
          // console.log(response.data);
          this.snackbar_sukses = true;
          this.text_sukses = "Data Berhasil di Ubah";
          this.timeout_sukses = 3000;
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
};
</script>