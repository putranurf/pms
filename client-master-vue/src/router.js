import VueRouter from "vue-router";
import Vue from "vue";
import Mapping from "./components/Mapping";
import Listdata from "./components/Listdata";
import Editdata from "./components/Listdata/edit";
import Detaildata from "./components/Listdata/detail";
import Lepasdata from "./components/Lepasdata";
import Auth from "./components/Auth";
import Logout from "./components/Auth/logout";
import Profil from "./components/Profil"

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Mapping },
  { path: "/listdata", component:  Listdata },
  { path: "/listdata/edit/:id", component:  Editdata },
  { path: "/listdata/detail/:id", component:  Detaildata },
  { path: "/lepasdata", component:  Lepasdata },
  { path: "/auth", component:  Auth },
  { path: "/Logout", component:  Logout },
  { path: "/profil", component:  Profil }
];

export default new VueRouter({
  routes
});

