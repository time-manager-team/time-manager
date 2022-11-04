<template>
    <div style="color:black; ">
      <h2 class="h2" style="color:white">Manager View</h2>
      <input style="color:white" v-model="newteam" placeholder="Nouvelle Equipe" />
        <button @click="addTeam()">Ajouter une nouvelle équipe</button>
  
      <div style="color:white">
        Liste des équipes : 
        <div v-for="item in teams" :key="item.id">
            {{ item.team_name }}
            <br>
            <router-link :to="{path: `/chart_managerTeam/${item.id}`}">
                <button class="app-button">
                    All
                </button>
            </router-link>
            Membre de l'equipe : 
            <table style="background-color: white; color:black;">
                <thead>
                  <tr>
                    <th style="text-align: center;">
                      username
                    </th>
                    <th  style="text-align: center;">
                      email
                    </th>
                    <th style="text-align: center;"> voir le workingtime </th>
                    <th  style="text-align: center;">
                      Voir le dashboard
                    </th>
                    <th style="text-align: center;">
                      Delete from team
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  v-for="member in item.l1" :key="member.id"
                  style="border-style: solid;"
                  >
                  <td style="text-align: center;">{{ member.username }}</td>
                  <td style="text-align: center;">{{ member.username }}</td>
                  <td style="text-align: center;">
                    <RouterLink :to="'/working_times/' + member.id">
                      <button class="card-menu-button">Go to</button>
                    </RouterLink>
                  </td>
                  <td style="text-align: center;">
                    <RouterLink :to="'/chart_manager/' + member.id">
                      <button class="card-menu-button">Go to</button>
                    </RouterLink>
                  </td>
                  <td  style="text-align: center;"><button @click="deleteInTeam(member.id, item.id)">Delete</button></td>
                </tr>
              </tbody>
            </table>
            Utilisateurs
            <table style="background-color: white; color:black;">
                <thead>
                  <tr>
                    <th style="text-align: center;">
                      username
                    </th>
                    <th  style="text-align: center;">
                      email
                    </th>
                    <th style="text-align: center;">
                      Add in team
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  v-for="user in item.l2" :key="user.id"
                  style="border-style: solid;"
                  >
                  <td style="text-align: center;">{{ user.username }}</td>
                  <td style="text-align: center;">{{ user.username }}</td>
                  <td  style="text-align: center;" @click="addMemberInTeam(user.id, item.id)"><button>Add</button></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
     </div>
  </template>
  
  <script>
  const isInside = function (list, id) {
                    var bool = false;
                    if (list) {
                      list.forEach(element => {
                        if (element.user === id) {
                          bool = true;
                        }
                      });
                    }
                    return bool;
                  }
  const modUsers = function (teams) {
    var teamCpy = teams
    if (teamCpy["users"] !== undefined) {
      for (var i = 0; i < teamCpy.users.length ; i++) {
        teamCpy.users[i].listssss = teamCpy.id + i;
      }
      // console.log('ok', teamCpy.id, teamCpy)
      //   console.log("teamCpy : ", teamCpy);
  }
  }
  export default {
    
    data() {
      return {
        session: {
          active: false,
          id: null,
          username: '',
          email: ''
        },
        newteam:"",
        users:[],
        roles:[],
        teams:[],
      }
    }
    ,
      components: {
      },
      computed: {
      },
      watch: {
      },
      mounted () {
        this.session = JSON.parse(localStorage.session)
        this.getUsers();
        this.getRoles();
        this.getTeams();
      },
      methods: {
        startDrag(evt, item) {
          console.log(item)
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
      },
      onDrop(evt, list) {
        const itemID = evt.dataTransfer.getData('itemID')
        const item = this.items.find((item) => item.id == itemID)
        item.list = list
      },
      getList: function (list) {
        return this.items.filter((item) => item.list === list)
      },
      getUsersList: function(list) {
        var l = this.teams.filter((item) => item.id === list)
      },
        getUsers: function() {
              fetch(process.env.VUE_APP_API_URL + "/users" ,{
              mode: 'cors',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              console.log("users : ", json)
              this.users = json.content
            })
        },
        getRoles: function() {
            fetch(process.env.VUE_APP_API_URL + "/roles" ,{
              mode: 'cors',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              this.roles = json.content
            })
        },
        getTeams: function() {
            fetch(process.env.VUE_APP_API_URL + "/teams/" + this.session.id,{
              mode: 'cors',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              this.teams = json.content
            }).then(() => {
              if (this.teams !== [] && this.team !== null) {
                this.teams.forEach(element => {
                  fetch(process.env.VUE_APP_API_URL + "/teamMember/" + element.id,{
                  mode: 'cors',
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                })
                .then(response2 => response2.json())
                .then(json2 => {
                  element["members"] = json2.content
                  element["users"] = this.users
                  element["l1"] = []
                  element["l2"] = []
                  console.log('id team :', element.team_name)

                  if (element["members"] !== undefined) {
                    element["users"].forEach((elem => {
                      var ok = false;
                      for (var i = 0; i < element["members"].length ; i++) {
                        if (element["members"][i].user === elem.id) {
                          ok = true;
                        }
                      }
                      if (ok) {
                        element["l1"].push(elem)
                      }
                      else {
                        element["l2"].push(elem)
                      }
                   }))
                  }
                    else {
                      element["l2"] = element["users"];
                    }
                })
              })
            }
            }).then(() => {
              this.teams.forEach((elem => {
                console.log(elem);
              }))

            })
        },
        addTeam: function () {
          fetch(process.env.VUE_APP_API_URL + "/teams/"+ this.session.id ,{
              method:'POST',
              mode: 'cors',
              body: JSON.stringify({
                team_name: this.newteam,
                }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              console.log('response :', json);
            })
        },
        addMemberInTeam: function (user_id, team_id) {
          fetch(process.env.VUE_APP_API_URL + "/teamMember/"+ user_id + "/" + team_id,{
              method:'POST',
              mode: 'cors',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              console.log('response :', json);
            })
        },
        deleteInTeam: function(user_id, team_id) {
          fetch(process.env.VUE_APP_API_URL + "/teamMember/"+ user_id + "/" + team_id,{
              method:'DELETE',
              mode: 'cors',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => {
              console.log('response :', json);
            })
        }
      }
  };
  /*
              this.teams = json.content
              this.teams.forEach(element => {
                fetch(process.env.VUE_APP_API_URL + "/teamMember/" + element.id,{
                  mode: 'cors',
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(responses => responses.json())
                .then(json2 => {  
                  console.log('members :  ', json2);
                  element["members"] = json2.content
                  
                  element["users"] = this.users
                  var isInside = function (list, id) {
                    var bool = false;
                    if (list) {
                      list.forEach(element => {
                        element.user = id
                        console.log("user id :",  element.user)
                      });
                    }
                    return bool;
                  }
                  element["users"].forEach(element2 => {
                    element2["list"] = element.id * 10 + (
                      isInside(element["members"]) === true ? 0 : 1
                    )
                  });
                  })
              }
              );
  */
  </script>
  
  
  <style scoped>
  .drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }
  .drag-el {
    background-color: rgb(43, 10, 192);
    margin-bottom: 10px;
    color:white;
    padding: 5px;
  }
  </style>