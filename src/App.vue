<script setup>
import LoginButton from './components/btns/LoginButton.vue'
import ValidityInputGroup from './components/input/ValidityInputGroup.vue'
</script>

<template>
    <div class="container">
        <header>
            <div>
                <div class="title">Logowanie</div>
                <div>System parkingowy - poziom moderatora</div>
            </div>
        </header>

        <main class="mt-4">
            <ValidityInputGroup 
                title="Login"
            />
            <ValidityInputGroup 
                title="Hasło"
            />

            <div class="mt-5">
                <LoginButton />
            </div>
        </main>
    </div>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
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
</style>
