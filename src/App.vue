<script setup>
import { ref, provide, onMounted } from 'vue'
import LoginView from './view/LoginView.vue'
import UnauthorizeView from './view/UnauthorizeView.vue'
import MenuView from './view/MenuView.vue'

const step = ref(0)
const logged_user = ref("")
provide('logged_user', logged_user)

onMounted(() => {
    if(sessionStorage.length > 0) {
        let tmp = sessionStorage.getItem('logged')
        if(tmp.length) {
            let sl = tmp.split(' ')
            if(sl.length === 2) {
                logged_user.value = tmp
                onSuccess()
            }
        }
    }
})

function onSuccess() {
    step.value = 1
}
function onUnauthorize() {
    step.value = 10
}
</script>

<template>
    <div class="container">
        <header>
            <div>
                <div class="title">Logowanie</div>
                <div>System parkingowy - poziom moderatora</div>
            </div>
            <div class="logged-user">
                {{ logged_user }}
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
