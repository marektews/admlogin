<script setup>

function AdminSRA() {
    window.location = '/admin/sra'
}

function AdminSRP() {
    window.location = '/admin/srp'
}

function AdminRJA() {
    window.location = '/admin/rja'
}
</script>

<template>
    <div class="mylayout">
        <button class="btn btn-lg btn-outline-primary" @click="AdminSRA">
            ANKIETY AUTOKARÓW
        </button>

        <button class="btn btn-lg btn-outline-info" @click="AdminSRP">
            IDENTYFIKATORY PARKINGOWE
        </button>

        <button class="btn btn-lg btn-outline-success" @click="AdminRJA">
            ROZKŁADY JAZDY - BUDOWANIE
        </button>
    </div>
</template>

<style scoped>
.mylayout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4pt;
}
</style>