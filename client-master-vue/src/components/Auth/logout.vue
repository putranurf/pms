<template>
  <v-app id="inspire">    
  </v-app>
</template>
<script>
import router from '../../router'
import Cookies from "js-cookie"
export default {
    mounted(){
        // localStorage.removeItem('user');   
        // router.push('/auth')

        Cookies.remove('user')
        router.push('/auth')
    }
}
</script>
