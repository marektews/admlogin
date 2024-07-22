<script setup>
import { ref, reactive, computed, inject } from 'vue'
import LoginButton from '../components/btns/LoginButton.vue'
import ValidityInputGroup from '../components/input/ValidityInputGroup.vue'

const emit = defineEmits(['success', 'unauthorize'])

const auth = reactive({
    login: '',
    password: ''
})
const validity = ref([false, false])
const logged_user = inject('logged_user')

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
            console.log("Access denied: reason =", response.statusText)
            emit('unauthorize')
            return {}
        }
    })
    .then((data) => {
        let full_name = `${data.fn} ${data.ln}`
        sessionStorage.setItem('logged', full_name)
        logged_user.value = full_name
        emit('success')
    })
    .catch(err => {
        console.log("Logging error: ", err)
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