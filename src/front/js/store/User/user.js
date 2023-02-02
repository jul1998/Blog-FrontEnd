import jwtDecode from 'jwt-decode'
export const userStore = {
    user: {
        "isLogOut": "false"
    },
}

export function userActions(getStore, getActions, setStore) {
    let BACKEND_URL = process.env.BACKEND_URL
    return {
        login: async (endpoint, method = "GET", data = undefined) => {
            const store = getStore()
            let response = await fetch(BACKEND_URL + endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            let responseJson = await response.json()
            if (response.ok){
                localStorage.setItem("token", responseJson.token)
                localStorage.setItem("user_id", responseJson.user_id)
                setStore({ ...store, token: responseJson.token, user_id: responseJson.user_id })
            }
            
            return { response, responseJson }
        },

        genericFetchProtected: async (endpoint, method = "GET", data = undefined) => {
            const store = getStore()
            const storeToken = store.token //This token is stored in store
            const localStorageToken = localStorage.getItem("token") //This is the same token store in local Storage
            //console.log(localStorageToken)
            let BACKEND_URL = process.env.BACKEND_URL
            let response = await fetch(BACKEND_URL + endpoint, {
                method: method,
                body: data ? JSON.stringify(data) : undefined,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Authorization": "Bearer " + localStorageToken
                }
            })

            return response
        },
        logoutFetch: async () => {
            const store = getStore()
            let response = await getActions().genericFetchProtected("logout")
            localStorage.setItem("token", "")
            localStorage.setItem("user_id", "")
            setStore({ ...store, token: "" })
            return response

        },

        carritoCompras: async (user_id) => {
            const store = getStore()
            let response = await getActions().genericFetchProtected(`user/${user_id}/carritoCompras`)
            let responseJson = await response.json()
            setStore({ ...store, carritoCompras: responseJson })
            console.log(responseJson)
            return responseJson
        },
        checkIfTokenExpired: ()=>{
            const token = localStorage.getItem('token')
            if (!token) return true
            const decoded = jwtDecode(token)
            const isExpired = decoded.exp < Date.now() / 1000
            return isExpired
        }
    }
}