<template>
  <div id="nav">
    <router-link to="/">Votes</router-link> <span v-if="!user.token">| </span>
    <span v-if="!user.token"><router-link :to="{name : 'Login'}">Connexion</router-link> | </span>
    <span v-if="!user.token"><router-link :to="{name : 'Register'}">Inscription</router-link></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Nav',

  computed : {
    ...mapGetters({
      user : 'user'
    })
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>