<script setup>
import { ref, reactive, computed } from 'vue'
import LoginButton from '../components/btns/LoginButton.vue'
import ValidityInputGroup from '../components/input/ValidityInputGroup.vue'

const emit = defineEmits(['success', 'unauthorize'])

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
            emit('success')
        else {
            console.log("Access denied: reason =", response.statusText)
            emit('unauthorize')
        }
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