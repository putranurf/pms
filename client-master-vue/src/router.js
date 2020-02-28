import Vue from "vue";
import VueRouter from "vue-router";
import Mapping from "./components/Mapping";
import Listdata from "./components/Listdata";
import Editdata from "./components/Listdata/edit";
import Detaildata from "./components/Listdata/detail";
import Lepasdata from "./components/Lepasdata";
import Auth from "./components/Auth";
import Logout from "./components/Auth/logout";
import Profil from "./components/Profil";
import Keterlambatan from "./components/Laporan";
import ExportXlsx from "./components/ExportXlsx/excel";
import EditExcel from "./components/ExportXlsx/edit_excel";
import ExportXlsxSpread from "./components/ExportXlsx";
import error from "../src/components/404/404.vue";
import Cookies from "js-cookie";

Vue.use(VueRouter);

// const routes = [
//   // },
//   { path: "/", component: Mapping },
//   { path: "/listdata", component: Listdata },
//   { path: "/listdata/edit/:id", component: Editdata },
//   { path: "/listdata/detail/:id", component: Detaildata },
//   { path: "/lepasdata", component: Lepasdata },
//   { path: "/auth", component:  Auth },
//   { path: "/Logout", component: Logout },
//   { path: "/profil", component: Profil },
//   { path: "/keterlambatan", component: Keterlambatan },
//   { path: "/dispatchlist", component: DispatchList },
//   { path: "/laporanio", component: LaporanIo },
//   { path: "/hasilproduksi", component: HasilProduksi },
// // {
// //   path: "*",
// //   name: "404",
// //   component: error
// // }
// ];

const routes = [
  {
    path: "/",
    redirect: "/lockinglot"
  },
  {
    path: "/lockinglot",
    name: "home",
    component: Mapping,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/listdata",
    name: "listdata",
    component: Listdata,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/listdata/edit/:nomor_pd/:nomor_routing",
    name: "listdataEdit",
    component: Editdata,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/listdata/detail/:id",
    name: "listdataDetail",
    component: Detaildata,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lepasdata",
    name: "lepasdata",
    component: Lepasdata,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profil",
    name: "profil",
    component: Profil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/laporan",
    name: "laporan",
    component: Keterlambatan,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/export",
    name: "exportxlsx",
    component: ExportXlsx,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: "/export/edit/:id", 
    name: "editexcel", 
    component: EditExcel,
    meta: {
      requiresAuth: true
    } 
  },
  {
    path: "/export2",
    name: "exportxlsxSpread",
    component: ExportXlsxSpread,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Logout",
    component: Logout
  },
  {
    path: "*",
    name: "404",
    component: error
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const auth = Cookies.get("user");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      next({
        path: "/auth"
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
