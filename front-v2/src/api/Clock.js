export default {

    getAllClocksUser: async function(userId) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/clocks/${userId}`, {
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        return response.json()
    },
    postClockUser: async function(userId, clocking) {
        const response = await fetch(`${process.env.VUE_APP_API_URLL}/clocks/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(clocking)
        });
        return response.json()
    }
}