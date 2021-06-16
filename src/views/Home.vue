<template>
  <div class="home">
    <p v-if="error" class="text-red-900 bg-red-300 mb-5 py-2 text-xl">{{ error }}</p>
    <p v-else-if="message" class="text-green-900 bg-green-300 mb-5 py-2 text-xl">{{ message }}</p>
    <div class="mb-5" v-if="user.token">
      <router-link :to="{name : 'CreateVote'}" class="bg-blue-300 text-blue-900 px-5 py-2 border border-blue-600">Crée un vote</router-link>
    </div>
    <div v-for="vote in votes" :key="vote.id" class="flex items-center justify-center">
      <div class="border border-gray-300 mb-10 py-2 px-5">
        <h3 class="text-font-xl font-bold mb-2">{{ vote.name }}</h3>
        <p>Nombre de vote : {{ vote.users.length }}</p>
        <button class="bg-green-300 px-5 py-1 mr-5 text-green-900 mt-2" @click="sendMyVote(vote)">Voter</button>
        <button class="bg-red-300 px-5 py-1 text-red-900" @click="deleteMyVote(vote)">Retirer mon vote</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Home',
  data(){
    return {
      votes : [],
      message : '',
      error : ''
    }
  },

  computed : {
    ...mapGetters({
      user : 'user'
    })
  },

  mounted(){
    fetch("http://localhost:3000/vote/")
    .then(response => response.json())
    .then(data => {
      this.votes = data.votes
    })
    .catch(error => {console.log('error : ', error)})
  },

  methods : {
    sendMyVote(vote){
      let init = {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.user.token,
          'Content-Type': 'application/json'
        }
      }

      fetch(`http://localhost:3000/vote/${vote._id}`, init)
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          return this.error = data.message
        }
        vote.users.push(this.user.token)
        this.message = data.message
      })
    },

    deleteMyVote(vote){
      let init = { 
        method : 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.user.token,
          'Content-Type': 'application/json'
        }
      }

      fetch(`http://localhost:3000/vote/${vote._id}`, init)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success === false) {
          return this.error = data.message
        }
        const index = vote.users.indexOf(this.user.token)
        if (index > -1) {
          vote.users.splice(index, 1);
        }
        this.error = ''
        return this.message = data.message
      })
    },
  }
}
</script>
