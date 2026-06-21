<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import LoginView from './view/LoginView.vue'
import UnauthorizeView from './view/UnauthorizeView.vue'
import MenuView from './view/MenuView.vue'

const step = ref(0)
const store = useStore()

onMounted(() => {
    // Przywrócenie sesji po przeładowaniu strony: ciasteczko sesji (HttpOnly) wysyłane jest
    // automatycznie, więc backend rozpozna zalogowanego użytkownika na podstawie sesji.
    // Imię/nazwisko i id odtwarzamy z sessionStorage zapisanego podczas logowania.
    const user_id = sessionStorage.getItem('logged_id')
    const full_name = sessionStorage.getItem('logged_name')
    if(!user_id) return // brak lokalnych danych logowania -> pozostajemy na ekranie logowania

    fetch("/api/auth/permissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(resp => {
        if(resp.status === 200)
            return resp.json()
        else
            throw resp
    })
    .then((data) => {
        store.commit('setUserId', user_id)
        if(full_name)
            store.commit('setUserFullname', full_name)
        store.commit('setPermissions', data)
    })
    .catch((resp) => {
        console.error('restore session, status:', resp?.status)
        sessionStorage.clear()
    })
})

function onSuccess() {
    step.value = 1
}
function onUnauthorize() {
    step.value = 10
}

watch(() => store.state.permission, () => { step.value = 1 })

function onLogout() {
    // Sesję usuwa backend (ClearSession) na podstawie ciasteczka; nie przesyłamy user_id.
    fetch("/api/auth/logout", { method: "POST" })
    .then(resp => {
        if(resp.ok) {
            sessionStorage.clear()
            window.location.href = "/admin/"
        }
        else
            throw resp
    })
    .catch((resp) => {
        console.error('logout, status:', resp?.status)
    })
}
</script>

<template>
    <div class="container">
        <header>
            <div>
                <div class="title">Logowanie</div>
                <div>System parkingowy - poziom moderatora</div>
            </div>
            <div v-if="step === 1" class="d-flex align-items-center gap-3">
                <div class="logged-user">{{ store.state.user_fullname }}</div>
                <div class="btn btn-outline-danger" @click="onLogout">Wyloguj</div>
            </div>
        </header>

        <main class="mt-4">
            <LoginView v-if="step === 0"
                @success="onSuccess"
                @unauthorize="onUnauthorize"
            />
            <MenuView v-else-if="step === 1" />
            <UnauthorizeView v-else 
                @click="step = 0"
            />
        </main>
    </div>
</template>

<style scoped>
header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16pt;
    margin-bottom: 24pt;
}
.title {
    font-size: 2rem;
}

main {
    min-width: 60vw;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 9pt;
}

main > div {
    flex-grow: 1;
}

.logged-user {
    font-size: 2rem;
}
</style>
