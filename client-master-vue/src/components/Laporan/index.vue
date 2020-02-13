<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <li>
          <v-flex xs12>
            <v-img
              :src="require('../../assets/logo_company.png')"
              class="my-3"
              contain
              height="90"
            ></v-img>
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
        <template>
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="deep-purple accent-4"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Keterlambatan
                <v-icon>watch_later</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Dispatch List
                <v-icon>list_alt</v-icon>
              </v-tab>

              <v-tab href="#tab-3">
                I/O
                <v-icon>swap_calls</v-icon>
              </v-tab>

              <v-tab href="#tab-4">
                Hasil Produksi
                <v-icon>assignment_turned_in</v-icon>
              </v-tab>
            </v-tabs>

          <v-tabs-items v-model="tab">
             
              <v-tab-item value="tab-1">
                <v-card flat>
                  <v-text-field
                    v-model="searchketerlambatan"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-data-table dense
                    :headers="headers"
                    :items="keterlambatan"
                    :loading="loading"
                    :search="searchketerlambatan"
                    hide-actions
                    class="si-table not-action"
                  >
                    <template slot="headers" slot-scope="props">
                      <template v-for="(headers, i) in [processTableHeaders(props.headers)]">
                        <tr :key="i">
                          <th
                            v-for="header in headers.parents"
                            :key="header.value"
                            :rowspan="header.rowspan"
                            :colspan="header.colspan"
                            :width="header.width"
                            :class="header.align ? `text-xs-${header.align}` : ''"
                          >{{ header.text }}</th>
                        </tr>
                        <tr v-if="headers.children" :key="i + 'id'">
                          <th
                            v-for="header in headers.children"
                            v-bind:key="header.value"
                            :width="header.width"
                            :class="header.align ? `text-xs-${header.align}` : ''"
                          >{{ header.text }}</th>
                        </tr>
                      </template>
                    </template>
                    <template v-slot:items="props">
                      <td>
                        <v-layout justify-center>{{ props.item.nomor_pd }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.komponen }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.semula }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.revisi }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.penyebab }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.tindakan }}</v-layout>
                      </td>
                      <!-- <td>
                            <router-link class="btn btn-primary" v-bind:to="'/listdata/detail/'+props.item.nomor_Pd">
                            <v-btn color="primary" fab small dark>
                              <v-icon>search</v-icon>
                            </v-btn>
                            </router-link>
                      </td>-->
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>

              <v-tab-item value="tab-2">
                <v-card flat>
                   <v-text-field
                    v-model="searchdispatchlist"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                 <v-data-table dense
                    :headers="headersdispatchlist"
                    :items="dispatchlist"
                    :loading="loading"
                    :search="searchdispatchlist"
                    class="si-table not-action"
                  >
                    <template v-slot:items="props">
                      <td>
                        <v-layout justify-center>{{ props.item.nomor_wc }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.nomor_pd }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.tgl_mulai | formatDate }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.tgl_selesai | formatDate }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.durasi }}</v-layout>
                      </td>
                      <td>
                        <v-layout justify-center>{{ props.item.nama_routing }}</v-layout>
                      </td>
                      <!-- <td>
                            <router-link class="btn btn-primary" v-bind:to="'/listdata/detail/'+props.item.nomor_Pd">
                            <v-btn color="primary" fab small dark>
                              <v-icon>search</v-icon>
                            </v-btn>
                            </router-link>
                      </td>-->
                    </template>
                  </v-data-table>
                </v-card>
                
              </v-tab-item>

              <v-tab-item value="tab-3">
                <v-card flat>Masih tahap PENGEMBANGAN</v-card>
              </v-tab-item>

              <v-tab-item value="tab-4">
                <v-card flat>
                  <v-text-field
                    v-model="searchhasilproduksi"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-data-table dense
                      :headers="headersproduksi"
                      :items="hasilproduksi"
                      :loading="loading"
                      :search="searchhasilproduksi"
                      class="si-table not-action"
                    >
                      
                      <template v-slot:items="props">
                        <td>
                          <v-layout justify-center>{{ props.item.kode_mat }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.desc_mat }}</v-layout>
                        </td>
                        <!-- <td>
                          <v-layout justify-center>{{ props.item.yield_qty }}</v-layout>
                        </!-->
                        <td>
                          <v-layout justify-center>{{ props.item.januari }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.februari }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.maret }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.april }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.mei }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.juni }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.juli }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.agustus }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.september }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.oktober }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.november }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.desember }}</v-layout>
                        </td>
                        <!-- <td>
                            <router-link class="btn btn-primary" v-bind:to="'/listdata/detail/'+props.item.nomor_Pd">
                            <v-btn color="primary" fab small dark>
                              <v-icon>search</v-icon>
                            </v-btn>
                            </router-link>
                        </td>-->
                      </template>
                    </v-data-table>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </template>
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
import jsPDF from "jspdf";
import Cookies from "js-cookie";
// import dateFormat from 'dateformat';
var nama_login = "";

export default {
  data: () => ({
    searchketerlambatan: '',
    searchdispatchlist: '',
    searchhasilproduksi: '',
    tab: null,    
    dataKeterlambatan: ["foo", "bar", "fizz", "buzz"],
    value: null,
    headers: [
      {
        text: "No. PD",
        value: "nomor_pd",
        // sortable: false,
        align: "center",
      },
      {
        text: "Komponen",
        value: "komponen",
        // sortable: false,
        align: "center"
      },
      {
        text: "Tanggal Penyelsaian",
        // sortable: false,
        children: [
          {
            text: "Semula",
            value: "semula",
            format: v => v && Number(v).toFixed(2),
            align: "center"
          },
          {
            text: "Revisi",
            value: "revisi",
            format: v => v && Number(v).toFixed(2),
            align: "center"
          }
        ]
      },
      {
        text: "Penyebab",
        value: "penyebab",
        // sortable: false,
        align: "center"
      },
      {
        text: "Tindakan",
        value: "tindakan",
        // sortable: false,
        align: "center"
      }
    ],
    headersdispatchlist: [
      {
        text: "No. WC",
        value: "nomor_wc",
        sortable: false,
        align: "center"
      },
      {
        text: "No. PD",
        value: "nomor_pd",
        sortable: false,
        align: "center"
      },
      {
        text: "Tanggal Mulai",
        sortable: false,
        align: "center",
        value: "tgl_mulai"
      },
      {
        text: "Tanggal Selesai",
        value: "tgl_selesai",
        sortable: false,
        align: "center"
      },
      {
        text: "Uraian",
        value: "nama_routing",
        sortable: false,
        align: "center"
      },
      {
        text: "Durasi (Jam)",
        value: "durasi",
        sortable: false,
        align: "center"
      },
    ],
    headersproduksi: [
      // {
      //   text: "No.",
      //   value: "no",
      //   sortable: false,
      //   align: "center"
      // },
      {
        text: "Kode",
        value: "kode_mat",
        sortable: false,
        align: "center"
      },
      {
        text: "Uraian",
        sortable: false,
        align: "center",
        value: "desc_mat"
      },
      // {
      //   text: "Qty",
      //   sortable: false,
      //   align: "center",
      //   value: "yield_qty"
      // },
      {
        text: "JAN",
        value: "januari",
        sortable: false,
        align: "center"
      },
      {
        text: "FEB",
        value: "februari",
        sortable: false,
        align: "center"
      },
      {
        text: "MAR",
        value: "maret",
        sortable: false,
        align: "center"
      },
      {
        text: "APR",
        value: "april",
        sortable: false,
        align: "center"
      },
      {
        text: "MEI",
        value: "mei",
        sortable: false,
        align: "center"
      },
      {
        text: "JUN",
        value: "juni",
        sortable: false,
        align: "center"
      },
      {
        text: "JUL",
        value: "juli",
        sortable: false,
        align: "center"
      },
      {
        text: "AGU",
        value: "agustus",
        sortable: false,
        align: "center"
      },
      {
        text: "SEP",
        value: "september",
        sortable: false,
        align: "center"
      },
      {
        text: "OKT",
        value: "oktober",
        sortable: false,
        align: "center"
      },
      {
        text: "NOV",
        value: "november",
        sortable: false,
        align: "center"
      },
      {
        text: "DES",
        value: "desember",
        sortable: false,
        align: "center"
      }
    ],
    keterlambatan: [],
    dispatchlist: [],
    hasilproduksi: [],
    total: 6,
    // },
    loading: false,
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
        text: "Laporan"
      }
    ],

    items: []
  }),

  mounted() {
    // if (!localStorage.getItem("user")) {
    //   router.push("auth");
    // }
    // this.nama_login_user = JSON.parse(localStorage.getItem("user"));
    this.nama_login_user = JSON.parse(Cookies.get("user"));
    this.$validator.localize("en", this.dictionary);
    // http.get("/getNomorPd").then(response => {
    //   this.data = response.data;
    //   this.data.forEach(item => {
    //     this.items.push(item.nomor_pd);
    //   });
    // });
    this.retrieveKeterlambatan();
    this.retrieveDispatchList();
    this.retrieveHasilProduksi();
  },
  methods: {
    processTableHeaders(headers) {
      const nested = !!headers.some(h => h.children);

      if (nested) {
        let children = [];

        const h = headers.map(h => {
          if (h.children && h.children.length > null) {
            children.push(...h.children);

            return {
              rowspan: 1,
              colspan: h.children.length,
              text: h.text,
              align: h.align
            };
          }
          return {
            rowspan: 2,
            colspan: 1,
            text: h.text,
            align: h.align
          };
        });

        return {
          children: children,
          parents: h
        };
      }
      return {
        parents: headers
      };
    },
    changeItem: function changeItem(event) {
      http.get("getNomorPdDetail/" + event.toString() + "").then(response => {
        this.mapping_rooting.kode_mat = response.data[0].kode_mat;
        this.mapping_rooting.desc_mat = response.data[0].desc_mat;
        this.mapping_rooting.qty = response.data[0].qty;
      });
    },
    // createPDF() {
    //   let pdfName = "Laporan";
    //   var doc = new jsPDF();
    //   doc.text("Hello World", 10, 10);
    //   doc.rect(10, 20, 25, 25);
    //   doc.save(pdfName + ".pdf");
    // },
    retrieveKeterlambatan() {
      // console.log('yeuh')
      http
        .get("/getLaporanKeterlambatan")
        .then(response => {
          this.keterlambatan = response.data; // JSON are parsed automatically.
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveDispatchList() {
      // console.log('yeuh')
      http
        .get("/getDispatchList")
        .then(response => {
          this.dispatchlist = response.data; // JSON are parsed automatically.
        })
        .catch(e => {
          console.log(e);
        });
    },
     retrieveHasilProduksi() {
      // console.log('yeuh')
      http
        .get("/getHasilProduksi")
        .then(response => {
          this.hasilproduksi = response.data; // JSON are parsed automatically.
        })
        .catch(e => {
          console.log(e);
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

