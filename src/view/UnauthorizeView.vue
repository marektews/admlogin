<script setup>
import BackButton from '../components/btns/BackButton.vue'

const emit = defineEmits(['click'])
</script>

<template>
    <div class="alert alert-danger">
        <div>Brak uprawnień !!!</div>
        <div>Login i hasło nie pasują. Sprawdź stan klawisza CAPSLOCK i spróbuj ponownie.</div>
    </div>

    <div class="mt-5">
        <BackButton
            @click="$emit('click')"
        />
    </div>
</template>