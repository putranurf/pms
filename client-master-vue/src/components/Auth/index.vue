<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>PMS - LOGIN</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon large>code</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>-->
                <!-- <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank" v-on="on">
                      <v-icon large>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>-->
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                  <v-text-field
                    prepend-icon="person"
                    v-model="auth.username"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    v-model="auth.password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit" >Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <div class="text-center">
          <v-snackbar
            color="red darken-2"
            v-model="snackbar_gagal"
            :timeout="timeout_gagal"
          >{{ text_gagal }}</v-snackbar>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import http from "../../http-common";
import router from "../../router";
import Cookies from "js-cookie";

export default {
  data: () => ({
    drawer: null,
    auth: {
      username: "",
      password: ""
    },
    snackbar_gagal: false,
    text_gagal: "",
    timeout_gagal: 0
  }),

  methods: {
    handleSubmit() {
      var data = {
        username: this.auth.username,
        password: this.auth.password
      };
      http
        .post("/postLogin", data)
        .then(response => {
          // console.log(response.data[0]);
          if (response.data[0] == undefined) {
            // console.log('kosong')
            router.replace("/auth");
            this.snackbar_gagal = true;
            this.text_gagal = "Username atau Password Salah !!";
            this.timeout_gagal = 3000;
          } else {
            // console.log(JSON.stringify(response.data[0]))
            // localStorage.setItem("user", JSON.stringify(response.data[0]));
            Cookies.set("user", JSON.stringify(response.data[0]));
            // router.push('/auth/v1')
            this.$router.replace({ name: "home" });
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    }
  },
  props: {
    source: String
  }
};
</script>