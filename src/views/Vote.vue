<template>
<div class="flex justify-center items-center flex-wrap">
  <p v-if="error" class="text-red-900 bg-red-300 mb-5 py-2 text-xl w-full">{{ error }}</p>
  <p v-else-if="message" class="text-green-900 bg-green-300 mb-5 py-2 text-xl w-full">{{ message }}</p>
  <form action="" @submit.prevent="CreateVote(user.token)" class="bg-gray-200 w-1/2 rounded-2xl p-5">
  <p class="text-2xl text-blue-600 mb-5">Crée un nouveau vote :</p>
    <div class="mb-2 text-center">
      <label for="name">Vote : </label>
      <input type="text" name="name" id="name" v-model="form.name" class="border-b-2 border-black mb-2 focus:outline-none bg-white" autofocus>
    </div>

    <button type="submit" class="border-2 border-blue-600 bg-green-400 text-white px-10 py-3 rounded-full hover:bg-green-600" :disabled="form.name === ''">Crée un nouveau vote</button>
  </form>
</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Vote',
  data(){
    return {
      form : {
        name : ''
      },
      message : '',
      error : ''
    }
  },

  computed : {
    ...mapGetters({
      user : 'user'
    })
  },

  methods : {
    CreateVote(token) {
      let init = {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.form)
      }

      fetch("http://localhost:3000/vote/create", init)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success === false) {
          return this.error = data.message
        }
        this.form.name = ''
        this.message = data.message
      })
    }
  }
}
</script>
