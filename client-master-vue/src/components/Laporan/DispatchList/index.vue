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
                      Dispatch List
                      <v-spacer></v-spacer>
                      <!-- <v-autocomplete
                        v-model="value"
                        :items="dataKeterlambatan"
                        dense
                        filled
                        label="Sub Departemen"
                      ></v-autocomplete> -->
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="dispatchlist"
                      :loading="loading"
                      :total-items="tableData.total"
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
                        </template>
                      </template>
                      <template v-slot:items="props">
                        <td>
                          <v-layout justify-center>{{ props.item.nomor_wc }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.nomor_pd }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.tgl_mulai }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.tgl_selesai }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.nama_routing }}</v-layout>
                        </td>
                        <td>
                          <v-layout justify-center>{{ props.item.durasi }}</v-layout>
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
import Cookies from "js-cookie"

var nama_login = "";

export default {
  data: () => ({
    dataKeterlambatan: ["foo", "bar", "fizz", "buzz"],
    value: null,
    search: "",
    headers: [
      {
        text: "No. WC",
        value: "no_wc",
        sortable: false,
        align: "center"
      },
      {
        text: "No. PD",
        value: "no_pd",
        sortable: false,
        align: "center"
      },
      {
        text: "Tanggal Mulai",
        sortable: false,
        align: "center",
        value: "tanggal_mulai"
      },
      {
        text: "Tanggal Selesai",
        value: "tanggal_selesai",
        sortable: false,
        align: "center"
      },
      {
        text: "Durasi (Jam)",
        value: "durasi",
        sortable: false,
        align: "center"
      },
      {
        text: "Uraian",
        value: "uraian",
        sortable: false,
        align: "center"
      }
    ],
    tableData: {
      items: [
        {
          no_wc: 1714481226758227561,
          no_pd: "2018-02-14T09:55:10.70019+07:00",
          tanggal_mulai: 25.699999999999999,
          tanggal_selesai: "100",
          uraian: 76,
          durasi: 24.699999999999999
        }
      ],
      total: 6
    },
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
        text: "Dispatch List"
      }
    ],

    items: [],
    dispatchlist: [],
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
    this.retrieveDispatchList();
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
    }
  }
};
</script>

<style>
.peti_uppercase input {
  text-transform: uppercase;
}
</style>

