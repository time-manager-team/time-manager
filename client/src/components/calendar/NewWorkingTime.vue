<template>
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"></slot>
            </div>
            <div class="modal-body">

              <label for="startTime" class="block text-sm font-medium text-gray-700">Start</label>
              <input type="datetime-local" name="startTime" id="startTime" v-model="starttime" class="mt-1 block w-full rounded-md border border p-2" />

              <label for="endTime" class="block text-sm font-medium text-gray-700">Start</label>
              <input type="datetime-local" name="endTime" id="endTime" v-model="endtime" class="mt-1 block w-full rounded-md border border p-2" />

            </div>
            <div class="modal-footer">
                <button class="app-button" v-on:click="createWorkingTime()">Create</button>
                <button
                  class="app-button"
                  @click="show = !show"
                >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>  
  </template>

  <script >
    export default {
      data: function() {
           return {
              show:true,
              starttime:"",
              endtime:""
              }
  
        },
        mounted () {
        },
        methods: {
          createUser: function() {
          
        },
        createWorkingTime: function () {      
          this.starttime =  this.starttime.replaceAll('T', ' ') + ":00Z";
          this.endtime =  this.endtime.replaceAll('T', ' ') + ":00Z";
          fetch(process.env.VUE_APP_API_URL +"/workingtimes/" + JSON.parse(localStorage.session).id, {
                mode: 'cors',
                method: "POST",
                body: JSON.stringify({
                  start: this.starttime,
                  end: this.endtime
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              this.show = false;
            });
  
          }
    }
  }
    </script>

    <style lang="scss" scoped>
      .app-button {
        border: none;
        border-radius: 10px;
        padding: 7.5px;
        background-color: var(--color-1);
        color: var(--color-2);
        margin-top: 10px;
        width: fit-content;
        height: 25px;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: white;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        &:hover {
        filter: brightness(1.25);
        cursor: pointer;
        }
      }

    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: table;
      transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: var(--bg-4);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  
  .modal-body {
    margin: 20px 0;
    label {
      color: var(--color-2);
    };
    input[type="datetime-local"] {
      color: var(--color-2);
      font-size: 14px;
      &::-webkit-calendar-picker-indicator {
      // background: #ffffff;
      filter: invert(100%);
    }
    }
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter-from {
    opacity: 0;
  }
  
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
    </style>