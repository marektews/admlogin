<template>
    <div class="mylayout">
        <template v-for="(opt, index) in options" :key="index">
            <div 
                v-if="IsAnyPermission(opt)"
                class="options-group"
            >
                <h4>
                    <FontAwesomeIcon :icon="opt.icon" class="me-2" />
                    {{ opt.title }}
                </h4>
                
                <div class="options">
                    <template v-for="(tile, ind) in opt.children" :key="ind">
                        <MenuTile v-if="IsPermission(tile.fpermission)"
                            :icon="tile.icon"
                            :title="tile.title"
                            :location="tile.location"
                        />
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBus, faCar, faClock, faParking, faScrewdriverWrench, faUsers, faWaveSquare, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import MenuTile from './MenuTile.vue'

const store = useStore()

function IsAnyPermission(opt) {
    const any_true = opt.children.filter((elem) => IsPermission(elem.fpermission))
    return any_true.length > 0
}

function IsPermission(field_name) {
    if(field_name in store.state.permission) {
        const tmp = store.state.permission[field_name]
        return tmp !== 0
    }
    return false
}

const options = ref([
    {
        icon: faBus,
        title: "Autokary",
        children: [
            { 
                location: "/admin/sra", 
                title: "ANKIETY AUTOKARÓW",
                icon: faBus,
                fpermission: "is_sra",
            },
            { 
                location: "/admin/rja", 
                title: "ROZKŁADY JAZDY - BUDOWANIE",
                icon: faClock,
                fpermission: "is_rja",
            },
            { 
                location: "/admin/monitoring", 
                title: "SYSTEM ODPRAWY - MONITORING",
                icon: faWaveSquare,
                fpermission: "is_monitoring",
            },
        ]
    },
    {
        icon: faParking,
        title: "Parkingi",
        children: [
            { 
                location: "/admin/srp", 
                title: "IDENTYFIKATORY PARKINGOWE - PARKING LODOWISKA",
                icon: faWheelchair,
                fpermission: "is_srp",
            },
            { 
                location: "/admin/pk", 
                title: "IDENTYFIKATORY PARKINGOWE - TORWAR",
                icon: faCar,
                fpermission: "is_pk",
            },
        ]
    },
    {
        icon: faScrewdriverWrench,
        title: "Administracyjne",
        children: [
            { 
                location: "/admin/users", 
                title: "KONTA UŻYTKOWNIKÓW",
                icon: faUsers,
                fpermission: "is_users",
            },
        ]
    }
])


</script>


<style lang="scss" scoped>
.mylayout {
    display: flex;
    flex-direction: column;
    gap: 20pt;
}

.options-group {
    display: flex;
    flex-direction: column;
    gap: 9pt;
}

.options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16pt;
}
</style>