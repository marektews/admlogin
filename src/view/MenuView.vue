<script setup>

function AdminSRA() {
    window.location = '/admin/sra'
}

function AdminSRP() {
    window.location = '/admin/srp'
}

function AdminPK() {
    window.location = '/admin/pk'
}

function AdminRJA() {
    window.location = '/admin/rja'
}

function AdminSOA() {
    window.location = '/admin/monitoring'
}
</script>

<template>
    <div class="mylayout">
        <button class="btn btn-lg btn-outline-primary" @click="AdminSRA">
            ANKIETY AUTOKARÓW
        </button>
        <button class="btn btn-lg btn-outline-success" @click="AdminRJA">
            ROZKŁADY JAZDY - BUDOWANIE
        </button>

        <button class="btn btn-lg btn-outline-info" @click="AdminSRP">
            IDENTYFIKATORY PARKINGOWE - PARKING LODOWISKA
        </button>
        <button class="btn btn-lg btn-outline-info" @click="AdminPK">
            IDENTYFIKATORY PARKINGOWE - TORWAR
        </button>

        <button class="btn btn-lg btn-outline-danger" @click="AdminSOA">
            SYSTEM ODPRAWY - MONITORING
        </button>
    </div>
</template>

<style scoped>
.mylayout {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 4pt;
}
</style>