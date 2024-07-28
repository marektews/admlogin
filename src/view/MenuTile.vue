<template>
    <div class="card card-ext" @click="onClicked">
        <div class="card-body card-body-ext">
            <div class="card-title">
                <FontAwesomeIcon :icon="props.icon" size="3x" />
            </div>
            <div class="card-subtitle card-subtitle-ext">
                {{ props.title }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    icon: { type: Object, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
})

const onClicked = () => {
    console.log("onClicked")
    window.location = props.location
}
</script>

<style lang="scss" scoped>
.card-ext {
    --bs-card-bg: var(--bs-secondary-bg);
    padding: 14pt;
    cursor: pointer;
    

    &:hover {
        box-shadow: -1px -1px 4px 4px rgba(100%, 100%, 100%, 0.3);
        text-shadow: 0 0 8px rgba(100%, 100%, 100%, 0.5);
        transition: box-shadow .3s;
    }

    @media screen and (min-width: 530px) {
        max-width: 160pt;
    }
    @media screen and (max-width: 530px) {
        flex-grow: 1;
    }
}

.card-body-ext {
    display: flex;
    flex-direction: column;
    gap: 12pt;
    align-items: center;
}

.card-subtitle-ext {
    text-align: center;
    text-wrap: wrap;
}
</style>