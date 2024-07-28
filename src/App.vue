<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import LoginView from './view/LoginView.vue'
import UnauthorizeView from './view/UnauthorizeView.vue'
import MenuView from './view/MenuView.vue'

const step = ref(0)
const store = useStore()

onMounted(() => {
    const sl = document.cookie.split(';')
    sl.forEach((elem) => {
        const sl2 = elem.split('=')
        const key = sl2[0].trim()
        switch(key) {
            case "logged_id": {
                const user_id = sl2[1].trim()
                store.commit('setUserId', user_id)

                fetch("/api/auth/permissions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: user_id })
                })
                .then(resp => {
                    if(resp.status === 200)
                        return resp.json()
                    else
                        throw resp
                })
                .then((data) => {
                    store.commit('setPermissions', data)
                })
                .catch((resp) => {
                    console.error('setPermissions, status:', resp.status)
                })
                break
            }
            case "logged_name": {
                store.commit('setUserFullname', sl2[1].trim())
                break
            }
        }
    })
})

function onSuccess() {
    step.value = 1
}
function onUnauthorize() {
    step.value = 10
}

watch(() => store.state.permission, () => { step.value = 1 })
</script>

<template>
    <div class="container">
        <header>
            <div>
                <div class="title">Logowanie</div>
                <div>System parkingowy - poziom moderatora</div>
            </div>
            <div v-if="step === 1" class="logged-user">
                {{ store.state.user_fullname }}
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
