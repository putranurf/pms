<template>
  <v-app id="inspire">    
  </v-app>
</template>
<script>
import router from '../../router'
export default {
    mounted(){
        localStorage.removeItem('user');   
        router.push('/auth')
    }
}
</script>
