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
        <v-card flat>
          <download-excel
            class="btn btn-default"
            :data="excel_data"
            :fields="json_fields"
            worksheet="Data"
            name="Table Confirmation.xls"
          >          
            <v-btn class="btn btn-primary" color="primary">EXPORT TO EXCEL</v-btn>
          </download-excel>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table :headers="headers" :items="excel_data" :search="search">
            <template v-slot:items="props">
              <td>{{ props.item.nomor_pd }}</td>
              <td>{{ props.item.qty }}</td>
              <td>{{ props.item.kode_mat }}</td>
              <td>{{ props.item.desc_mat }}</td>
              <td>{{ props.item.total_routing }}</td>
              <td>{{ props.item.uom }}</td>
              <td>{{ props.item.lot }}</td>
              <td>{{ props.item.yield_qty }}</td>
              <td>{{ props.item.scrap_qty }}</td>
              <td>{{ props.item.start_date | formatDate }}</td>
              <td>{{ props.item.start_time }}</td>
              <td>{{ props.item.end_date | formatDate }}</td>
              <td>{{ props.item.end_time }}</td>
              <td>{{ props.item.is_send }}</td>
              <td>{{ props.item.status }}</td>
              <td>{{ props.item.nomor_routing }}</td>
              <td>{{ props.item.all_time | formatDate }}</td>
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.nama_routing }}</td>
              <td>{{ props.item.rework }}</td>
              <td>{{ props.item.reason }}</td>
              <td>{{ props.item.updated_time }}</td>
              <td>{{ props.item.npp }}</td>
              <td>{{ props.item.nama }}</td>
              <td>{{ props.item.labor }}</td>
              <td>{{ props.item.final_time | formatDate }}</td>
              <td>{{ props.item.mesin }}</td>
              <td>{{ props.item.overhead }}</td>
              <td>{{ props.item.plant }}</td>
              <td>{{ props.item.satuan }}</td>
              <td>{{ props.item.work_center }}</td>
              <td>{{ props.item.kali }}</td>
              <td>{{ props.item.urutan_pd }}</td>
            </template>

            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </template>
          </v-data-table>
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
  data: () => ({
    search: "",
    headers: [
      { text: "Nomor PD", value: "nomor_pd" },
      { text: "Jumlah", value: "qty" },
      { text: "Kode Material", value: "kode_mat" },
      { text: "Deskripsi", value: "desc_mat" },
      { text: "Jumlah Routing", value: "total_routing" },
      { text: "UOM", value: "uom" },
      { text: "LOT", value: "lot" },
      { text: "Jumlah Yield", value: "yield_qty" },
      { text: "Jumlah Scrap", value: "scrap_qty" },
      { text: "Tanggal Mulai", value: "tanggal_mulai_baru" },
      { text: "Jam Mulai", value: "start_time" },
      { text: "Tanggal Selesai", value: "tanggal_selesai_baru" },
      { text: "Jam Selesai", value: "end_time" },
      { text: "Terkirim", value: "is_send" },
      { text: "Status", value: "status" },
      { text: "Nomor Routing", value: "nomor_routing" },
      { text: "All Time", value: "all_time_baru" },
      { text: "ID", value: "id" },
      { text: "Nama Routing", value: "nama_routing" },
      { text: "Rework", value: "rework" },
      { text: "Reason", value: "reason" },
      { text: "Jam Update", value: "updated_time" },
      { text: "NPP", value: "npp" },
      { text: "Nama", value: "nama" },
      { text: "Labor", value: "labor" },
      { text: "Final Time", value: "final_time_baru" },
      { text: "Mesin", value: "mesin" },
      { text: "Overhead", value: "overhead" },
      { text: "Plant", value: "plant" },
      { text: "Satuan", value: "satuan" },
      { text: "Work Center", value: "work_center" },
      { text: "Kali", value: "kali" },
      { text: "Urutan PD", value: "urutan_pd" }
    ],
    excel_data: [],
    json_fields: {
      "Nomor PD" : "nomor_pd",
    "Jumlah" : "qty",
    "Kode Material" : "kode_mat",
    "Deskripsi" : "desc_mat",
    "Jumlah Routing" : "total_routing",
    "UOM" : "uom",
    "LOT" : "lot",
    "Jumlah Yield" : "yield_qty",
    "Jumlah Scrap" : "scrap_qty",
    "Tanggal Mulai" : "tanggal_mulai_baru",
    "Jam Mulai" : "start_time",
    "Tanggal Selesai" : "tanggal_selesai_baru",
    "Jam Selesai" : "end_time",
    "Terkirim" : "is_send",
    "Status" : "status",
    "Nomor Routing" : "nomor_routing",
    "All Time" : "all_time_baru",
    "ID" : "id",
    "Nama Routing" : "nama_routing",
    "Rework" : "rework",
    "Reason" : "reason",
    "Jam Update" : "updated_time",
    "NPP" : "npp",
    "Nama" : "nama",
    "Labor" : "labor",
    "Final Time" : "final_time_baru",
    "Mesin" : "mesin",
    "Overhead" : "overhead",
    "Plant" : "plant",
    "Satuan" : "satuan",
    "Work Center" : "work_center",
    "Kali" : "kali",
    "Urutan PD" : "urutan_pd",
    },

    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8"
        }
      ]
    ],
    tableData: "",
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
    this.nama_login_user = JSON.parse(Cookies.get("user"));
    this.$validator.localize("en", this.dictionary);
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
          this.excel_data = response.data; // JSON are parsed automatically.
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
