export default {

    getAllUsers: async function() {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users`, {
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        return response.json()
    },

    getOneUser: async function(userId) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users/${userId}`, {
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        return response.json()
    },

    createUser: async function(user) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user)
        });
        return response.json()
    }, 

    updateUser: async function(userId, user) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user)
        });
        return response.json()
    },

    deleteUser: async function(userId) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users/${userId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        return response.json()
    },
    
    getUserByEmailAndUsername: async function(email, username) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/users?email=${email}&username=${username}`, {
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        return response.json()
    }
}

