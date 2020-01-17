<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title
                    class="headline mb-1"
                  >Halaman yang Anda cari tidak ditemukan bro,</v-list-item-title>
                  <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <!-- <v-btn text>Kembali ke Jalan yang Benar</v-btn> -->
                <router-link to="/auth">Kembali ke Jalan yang Benar</router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
 export default {
    props: {
      source: String,
    },
  }
</script>