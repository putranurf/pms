<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <li>
          <v-flex xs12>
            <v-img
              :src="require('../../../assets/logo_company.png')"
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
                    <v-card-title>
                      Laporan Keterlambatan
                      <v-spacer></v-spacer>
                      <v-autocomplete
                        v-model="value"
                        :items="dataKeterlambatan"
                        dense
                        filled
                        label="Sub Departemen"
                      ></v-autocomplete>
                    </v-card-title>
                    <!-- <div class="my-2">
                      <v-btn @click="createPDF()">
                        <v-icon>print</v-icon> Export PDF
                      </v-btn>
                    </div> -->
                    <!-- <v-data-table
                      :headers="headers"
                      :items="keterlambatan"
                      :loading="loading"
                      :total-items="total"
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
                      <template slot="items" slot-scope="props">
                        <td
                          v-for="v in headers"
                          v-if="!v.children"
                          :key="v.value"
                          :class="`text-xs-${v.align}`"
                        >{{ v.format ? v.format(props.item[v.value]) : props.item[v.value] }}</td>
                        <td
                          v-else
                          v-for="c in v.children"
                          :key="c.value"
                          :class="`text-xs-${c.align}`"
                        >{{ c.format ? c.format(props.item[c.value]) : props.item[c.value] }}</td>
                      </template>
                    </v-data-table> -->

                    <v-data-table
                    :headers="headers"
                    :items="keterlambatan"
                    >
                    <template v-slot:items="props">
                        <td>{{ props.item.nomor_pd }}</td>
                        <td>{{ props.item.komponen }}</td>
                        <td>{{ props.item.semula }}</td>     
                        <td>{{ props.item.revisi }}</td>     
                        <td>{{ props.item.penyebab }}</td>     
                        <td>{{ props.item.tindakan }}</td>     
                        <td>
                            <router-link class="btn btn-primary" v-bind:to="'/listdata/detail/'+props.item.nomor_Pd">
                            <v-btn color="primary" fab small dark>
                              <v-icon>search</v-icon>
                            </v-btn>
                            </router-link>
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
import http from "../../../http-common";
import router from "../../../router";
import jsPDF from "jspdf";
import Cookies from "js-cookie";

var nama_login = "";

export default {
  data: () => ({
    dataKeterlambatan: ["foo", "bar", "fizz", "buzz"],
    value: null,
    search: "",
    headers: [
      {
        text: "No. PD",
        value: "no_pd",
        sortable: false,
        align: "center"
      },
      {
        text: "Komponen",
        value: "komponen",
        sortable: false,
        align: "center"
      },
      {
        text: "Tanggal Penyelsaian",
        sortable: false,
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
        sortable: false,
        align: "center"
      },
      {
        text: "Tindakan",
        value: "tindakan",
        sortable: false,
        align: "center"
      }
    ],
    // tableData: {
      // items: [
      //   {
      //     no_pd: 1714481226758227561,
      //     komponen: "2018-02-14T09:55:10.70019+07:00",
      //     semula: 25.699999999999999,
      //     revisi: "100",
      //     penyebab: 76,
      //     tindakan: 24.699999999999999
      //   }
      // ],
      keterlambatan: [],
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
        text: "Laporan Keterlambatan"
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
  },
  methods: {
    // processTableHeaders(headers) {
    //   const nested = !!headers.some(h => h.children);

    //   if (nested) {
    //     let children = [];

    //     const h = headers.map(h => {
    //       if (h.children && h.children.length > null) {
    //         children.push(...h.children);

    //         return {
    //           rowspan: 1,
    //           colspan: h.children.length,
    //           text: h.text,
    //           align: h.align
    //         };
    //       }
    //       return {
    //         rowspan: 2,
    //         colspan: 1,
    //         text: h.text,
    //         align: h.align
    //       };
    //     });

    //     return {
    //       children: children,
    //       parents: h
    //     };
    //   }
    //   return {
    //     parents: headers
    //   };
    // },
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
            this.keterlambatan = response.data[0]; // JSON are parsed automatically.
            console.log(this.keterlambatan[0]);               
          })
          .catch(e => {
            console.log(e);
          });
      },
  }
};
</script>

<style>
.peti_uppercase input {
  text-transform: uppercase;
}
</style>

