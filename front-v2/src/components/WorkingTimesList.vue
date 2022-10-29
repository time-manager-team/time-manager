
<template >
    <h1>Working time list</h1>
</template>

<script>
export default {
  data() {
       return {
        wT: [{
          // id: this.$store.state.userConnected.id,
          // isConnected: this.$store.state.userConnected.isConnected
          id: 1,
          isConnected: ""
        }]
        }
    },
    watch: {
      isConnected(ancien, nouveau) {
        this.getWorkingTimesUser();
      }
    },

    mounted () {
    },
    methods: {
      getWorkingTimesUser: function() {
        // if (this.$store.state.userConnected.isConnected === true) {
          // const id = this.$store.state.userConnected.id
          const id = 1
          fetch(process.env.VUE_APP_API_URLL + "/workingtimes" + id, {
            mode: 'cors',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => console.log(json));
        // }
      }
    }
}
</script>

<style scoped>
</style>

