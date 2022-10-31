import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import VCalendar from 'v-calendar';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';

const app = createApp(App)
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)
app.use(VCalendar, {})
app.use(router)
app.mount('#app')
