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
        <v-card flat>
          <template>
            <TablePanel :key="chartKey">
              <gc-spread-sheets :hostClass="hostClass" @workbookInitialized="workbookInit">
                <div class="dashboardRow">
                  <v-btn
                    color="primary"
                    class="btn btn-primary dashboardButton"
                    @click="exportSheet"
                  >Export to Excel</v-btn>
                  <!-- <div>
                <b>Import Excel File:</b>
                <div>
                  <input type="file" class="fileSelect" @change='fileChange($event)' />
                </div>
                  </div>-->
                </div>
                <gc-worksheet
                  :dataSource="tableData"
                  :isProtected="isProtected"
                  :name="sheetName"
                  :autoGenerateColumns="autoGenerateColumns"
                >
                  <gc-column
                    :width="200"
                    :dataField="'nomor_pd'"
                    :headerText="'Nomor PD'"
                    :visible="visible"
                    :resizable="resizable"                               
                  ></gc-column>
                  <gc-column
                    :width="50"
                    :dataField="'qty'"
                    :headerText="'Jumlah'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="250"
                    :headerText="'Kode Material'"
                    :dataField="'kode_mat'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="150"
                    :dataField="'desc_mat'"
                    :headerText="'Deskripsi'"
                    :visible="visible"
                    :formatter="priceFormatter"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="120"
                    :dataField="'total_routing'"
                    :headerText="'Jumlah Routing'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'uom'"
                    :headerText="'UOM'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="170"
                    :dataField="'lot'"
                    :headerText="'LOT'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'yield_qty'"
                    :headerText="'Jumlah Yield'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="170"
                    :dataField="'scrap_qty'"
                    :headerText="'Jumlah Scrap'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="280"
                    :headerText="'Tanggal Mulai'"
                    :dataField="'tanggal_mulai_baru'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'start_time'"
                    :headerText="'Jam Mulai'"
                    :visible="visible"
                    :formatter="priceFormatter"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="200"
                    :dataField="'tanggal_selesai_baru'"
                    :headerText="'Tanggal Selesai'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'end_time'"
                    :headerText="'Jam Selesai'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'is_send'"
                    :headerText="'Terkirim'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="50"
                    :dataField="'status'"
                    :headerText="'status'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="200"
                    :dataField="'nomor_routing'"
                    :headerText="'Nomor Routing'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="320"
                    :headerText="'All Time'"
                    :dataField="'all_time_baru'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'id'"
                    :headerText="'ID'"
                    :visible="visible"
                    :formatter="priceFormatter"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="500"
                    :dataField="'nama_routing'"
                    :headerText="'Nama Routing'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'rework'"
                    :headerText="'Rework'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'reason'"
                    :headerText="'Reason'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'updated_time'"
                    :headerText="'Jam Update'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="200"
                    :dataField="'npp'"
                    :headerText="'NPP'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="320"
                    :headerText="'Nama'"
                    :dataField="'nama'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'labor'"
                    :headerText="'Labor'"
                    :visible="visible"
                    :formatter="priceFormatter"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="250"
                    :dataField="'final_time_baru'"
                    :headerText="'Final Time'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'mesin'"
                    :headerText="'Mesin'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'overhead'"
                    :headerText="'Overhead'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="50"
                    :dataField="'plant'"
                    :headerText="'Plant'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="200"
                    :dataField="'satuan'"
                    :headerText="'Satuan'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="320"
                    :headerText="'Work Center'"
                    :dataField="'work_center'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'kali'"
                    :headerText="'Kali'"
                    :visible="visible"
                    :formatter="priceFormatter"
                    :resizable="resizable"
                  ></gc-column>
                  <gc-column
                    :width="100"
                    :dataField="'urutan_pd'"
                    :headerText="'Urutan PD'"
                    :visible="visible"
                    :resizable="resizable"
                  ></gc-column>
                  
                </gc-worksheet>
              </gc-spread-sheets>
            </TablePanel>
          </template>
        </v-card>
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

/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

// SpreadJS imports
import "@grapecity/spread-sheets-vue";
import Excel from "@grapecity/spread-excelio";
import { saveAs } from "file-saver";
import TablePanel from "./TablePanel";
import { extractSheetData } from "./util/util.js";
import { recentSales } from "../fake-db/data";
import moment from "moment";

export default {
  components: { TablePanel },
  // props: ["tableData"],
  data: () => ({
    tableData: '',
    sheetName: "Tabel Confirmation",
    hostClass: "spreadsheet",
    autoGenerateColumns: true,
    isProtected: true,
    width: 200,
    visible: true,
    resizable: true,
    priceFormatter: "$ #.00",
    chartKey: 1,
    searchketerlambatan: "",
    searchdispatchlist: "",
    searchhasilproduksi: "",
    tab: null,
    dataKeterlambatan: ["foo", "bar", "fizz", "buzz"],
    value: null,    
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
        text: "Export Excel"
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
    this.retrieveConf();
  },
  methods: {
    workbookInit: function(spread) {
      this._spread = spread;
    },
    fileChange: function(e) {
      if (this._spread) {
        const fileDom = e.target || e.srcElement;
        const excelIO = new Excel.IO();
        const spread = this._spread;
        const store = this.$store;

        const deserializationOptions = {
          frozenRowsAsColumnHeaders: true
        };

        excelIO.open(fileDom.files[0], data => {
          console.dir(extractSheetData(data));
          const newSalesData = extractSheetData(data);
          // store.commit('updateRecentSales', newSalesData)
        });
      }
    },
    exportSheet: function() {
      const spread = this._spread;
      const fileName = "Tabel Confirmation.xlsx";

      const sheet = spread.getSheet(0);
      const excelIO = new Excel.IO();
      const json = JSON.stringify(
        spread.toJSON({
          includeBindingSource: true,
          columnHeadersAsFrozenRows: true
        })
      );

      excelIO.save(
        json,
        blob => {
          saveAs(blob, fileName);
        },
        function(e) {
          alert(e);
        }
      );
    },
    retrieveConf() {
      // console.log('yeuh')
      http
        .get("/getExportConf")
        .then(response => {
           for (let index = 0; index < response.data.length; index++) {
                let tanggal_mulai_baru = response.data[index].start_date;
                let tanggal_selesai_baru = response.data[index].end_date;
                let all_time_baru = response.data[index].all_time;
                let final_time_baru = response.data[index].final_time;
                response.data[index]["tanggal_mulai_baru"] = moment(
                    String(tanggal_mulai_baru)
                ).format("YYYY-MM-DD hh:mm");
                response.data[index]["tanggal_selesai_baru"] = moment(
                    String(tanggal_selesai_baru)
                ).format("YYYY-MM-DD hh:mm");
                response.data[index]["all_time_baru"] = moment(
                    String(all_time_baru)
                ).format("YYYY-MM-DD hh:mm");
                response.data[index]["final_time_baru"] = moment(
                    String(final_time_baru)
                ).format("YYYY-MM-DD hh:mm");
          }
          this.tableData = response.data; // JSON are parsed automatically.
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
.spreadsheet {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

.fileSelect {
  width: 100%;
  margin-top: 20px;
}
</style>
