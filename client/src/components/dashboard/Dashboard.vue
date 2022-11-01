<template>
    <h3>Dashboard</h3>
    <button class="btn waves-effect waves-light color white">
        <router-link :to="{path: `/chart_manager/${userID}`}">All</router-link>
    </button>
    <button class="btn waves-effect waves-light color white">
        <router-link :to="{path: `/chart_manager/${userID}/bar`}">Week</router-link>
    </button>
    <button class="btn waves-effect waves-light color white">
        <router-link :to="{path: `/chart_manager/${userID}/line`}">Year</router-link>
    </button>
    <button class="btn waves-effect waves-light color white">
        <router-link :to="{path: `/chart_manager/${userID}/doughnut`}">Day</router-link>
    </button>
    <router-view></router-view>
</template>

<script>
export default {
  data: function() {
       return {
            userID: JSON.parse(localStorage.session).id
        }
    }
}
</script>

<style scoped>
</style>
