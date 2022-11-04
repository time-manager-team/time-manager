
<template>
  <div class="text-center section">
    <h2 class="h2">WorkingTimes Calendar</h2>
    <button @click="visible = !visible">New WorkingTime</button>
    <NewWorkingTime v-if="visible"/>
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden" style="border:solid; border-width: 1px;">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto" v-on:click="">
            <div
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 calendarBorder"
              :class="attr.customData.class"
              :id="attr.customData.id"
            >
              <p @click="attr.visible = !attr.visible">
                {{ attr.customData.start }} : {{attr.customData.end}}
              </p>
              <CalendarBlock v-if="attr.visible" :visible="attr.visible" :startTime="attr" :start="attr.customData.start" :end="attr.customData.end" :starttime="attr.customData.startTime" :endtime="attr.customData.endTime" :id="attr.customData.id"/>
          </div>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
  import 'v-calendar/dist/style.css';
  import CalendarBlock from './calendar/CalendarBlock.vue'
  import NewWorkingTime from './calendar/NewWorkingTime.vue'
  import WorkingTime from '../api/WorkingTime.js'
  import router from '../router';


  export default {
    data() {
      return {
        wT: [{
          // id: JSON.parse(localStorage.session).id,
          // isConnected: this.$store.state.userConnected.isConnected
          id: 1,
          isConnected: ""
        }],
        visible: false,
        masks: {
          weekdays: 'WWW',
        },
        attributes: [
        ],
      }
    },
    components: {
      CalendarBlock,
      NewWorkingTime
    },
    mounted () {
      this.getWorkingTimesUser();
    },
    methods: {
      async getWorkingTimesUser() {
        // if (this.$store.state.userConnected.isConnected === true) {
          // const id = JSON.parse(localStorage.session).id
          //var id = JSON.parse(localStorage.session).id
          //console.log('', this.$route.params.userID)
          
          var id = parseInt(this.$route.params.userID)

          const userConnected = localStorage.session ? localStorage.session : null
          const isAuthoriseManager = userConnected ? JSON.parse(userConnected).isAuthoriseManager : false
          var userConnectedID = userConnected ? JSON.parse(userConnected).id : -1;
          var is_authorise = false;

          if (userConnectedID !== id && isAuthoriseManager === true) {
            is_authorise = true;
          }
          else if (userConnectedID === id) {
            is_authorise = true;
          }
          if (is_authorise) {
            const res = await WorkingTime.getAllWorkingTimesUser(id)
            if(res.success && res.content && res.content.length > 0) {
              this.wT = res.content
              var myObjs = []
              var cpt = 1;
              this.wT.forEach(element => {
                var dateStart = element.start.slice(0, -1);
                var dateEnd = element.end.slice(0, -1);
                //date de départ
                var date = element.start
                date = date.split('T')
                var dateYMD = date[0].split('-')
                var hours = date[1].slice(0,-1);
                //date de fin
                var endDate =  element.end
                endDate = endDate.split('T')
                var dateYMDend = endDate[0].split('-')
                var hoursend = endDate[1].slice(0,-1);
                var myobj = {
                  key: cpt,
                  isVisible:false,
                  customData: {
                    id: element.id,
                    title: 'workingTime',
                    class: 'bg-red-600 text-white',
                    startTime: dateStart,
                    endTime: dateEnd,
                    start: hours,
                    end: hoursend
                  },
                  dates: new Date(dateYMD[0], parseInt(dateYMD[1]) - 1, dateYMD[2])
                  }
                myObjs.push(myobj);
                cpt++;
              });
                this.attributes = myObjs
            } else {
              window.alert("No working time for this user")
            }
      } else {
        this.$toast.error("Access not autorized !", {position: "top-right"});
        router.replace('/home')
      }
        // }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  :deep() .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
    & .vc-header {
      background-color: #f1f5f8;
      padding: 10px 0;
    }
    & .vc-weeks {
      padding: 0;
    }
    & .vc-weekday {
      background-color: var(--weekday-bg);
      border-bottom: var(--weekday-border);
      border-top: var(--weekday-border);
      padding: 5px 0;
    }
    & .vc-day {
      padding: 0 5px 3px 5px;
      text-align: left;
      height: var(--day-height);
      min-width: var(--day-width);
      background-color: white;
      &.weekday-1,
      &.weekday-7 {
        background-color: #eff8ff;
      }
      &:not(.on-bottom) {
        border-bottom: var(--day-border);
        &.weekday-1 {
          border-bottom: var(--day-border-highlight);
        }
      }
      &:not(.on-right) {
        border-right: var(--day-border);
      }
    }
    & .vc-day-dots {
      margin-bottom: 5px;
    }
  }
</style>

