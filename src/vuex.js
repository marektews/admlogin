import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user_fullname: "",
            user_id: "",
            permission: {},
        }
    },
    mutations: {
        setUserFullname(state, payload) {
            state.user_fullname = payload
        },
        setUserId(state, payload) {
            state.user_id = payload
        },
        setPermissions(state, payload) {
            state.permission = payload
        }
    }
})

export default store