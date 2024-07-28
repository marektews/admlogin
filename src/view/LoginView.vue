<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';
import LoginButton from '../components/btns/LoginButton.vue'
import ValidityInputGroup from '../components/input/ValidityInputGroup.vue'

const emit = defineEmits(['success', 'unauthorize'])
const store = useStore()

const auth = reactive({
    login: '',
    password: ''
})
const validity = ref([false, false])

function onSubmit() {
    fetch('/api/auth/admin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(auth)
    })
    .then(response => {
        if(response.status === 200)
            return response.json()
        else {
            console.error("Access denied: reason =", response.statusText)
            throw response
        }
    })
    .then((data) => {
        console.log("Login response:", data)
        let full_name = `${data.fn} ${data.ln}`
        document.cookie = `logged_name=${full_name}; Path=/`
        document.cookie = `logged_id=${data.id}; Path=/`
        store.commit('setUserId', data.id)
        store.commit('setUserFullname', full_name)
        store.commit('setPermissions', data.permissions)        
        emit('success')
    })
    .catch(err => {
        console.error("Logging error: ", err)
        emit('unauthorize')
    })
}

const isLoginDisabled = computed(() => {
    return validity.value.includes(false)
})
</script>

<template>
    <ValidityInputGroup 
        v-model="auth.login"
        max-length="64"
        title="Login"
        @valid="validity[0] = $event"
    />
    <ValidityInputGroup
        v-model="auth.password"
        type="password"
        max-length="64"
        title="Hasło"
        @valid="validity[1] = $event"
    />

    <div class="mt-5">
        <LoginButton
            @click="onSubmit"
            :disabled="isLoginDisabled"
        />
    </div>
</template>