import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import WorkingTimesList from '../components/WorkingTimesList.vue'
import WorkingTimeUpdate from '../components/WorkingTimeUpdate.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import All from '../components/dashboard/graphs/All.vue'
import Bar from '../components/dashboard/graphs/Bar.vue'
import Line from '../components/dashboard/graphs/Line.vue'
import Doughnut from '../components/dashboard/graphs/Doughnut.vue'

// Create a new router instance
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  base: '/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/working_times/:userID',
      component: WorkingTimesList
    },
    {
      path: '/working_time/:userID',
      component: WorkingTimeUpdate
    },
    {
      path: '/chart_manager/:userID',
      component: Dashboard,
      children: [
        {
          path: '', 
          component: All
        },
        {
          path: 'bar', 
          component: Bar
        },
        {
          path: 'line', 
          component: Line
        },
        {
          path: 'doughnut', 
          component: Doughnut
        },
      ]
    },
    {
      path: '/users/:userID',
      component: Profile
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userConnected = localStorage.session ? localStorage.session : null
  const isConnected = userConnected ? JSON.parse(userConnected).active : false
  if (
    // make sure the user is authenticated
    !isConnected &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  } else if(isConnected && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router