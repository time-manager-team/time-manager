
<template>
    <div class="profile-container">
        <div v-if="user" class="profile-form">
            <div class="profile-field">
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="username" id="username" v-model="user.username" class="mt-1 block w-full rounded-md border border p-2" />
            </div>
            <div class="profile-field">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" name="email" id="email" v-model="user.email" class="mt-1 block w-full rounded-md border border p-2" />
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        user: null
      }
    },
    async created () {
      await this.getUser()
    },
    methods: {
        getUser: async function() {
            const response = await fetch(process.env.VUE_APP_API_URL + "/users/" + this.$route.params.userID,
                {
                    mode: 'cors',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )

            const { content: user, success: success, message: message } = await response.json()

            if(success && user) {
                this.user = user
            } else {
                this.$toast.error(response.error, {
                    position: "top-right"
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .profile-container {
        display: flex;
        justify-content: center;
        align-items: center;
        .profile-form {
            width: 50%;
            margin: auto;
            .profile-field {
                background-color: var(--bg-4);
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 10px;
                label {
                    color: var(--bg-2);
                }
                input {
                    color: var(--color-2);
                }
            }
        }
    }
</style>
