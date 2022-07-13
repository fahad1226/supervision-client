<template>
    <div v-if="isAuth">
        <AuthNavbar />
    </div>
    <div v-else>
        <Navbar />
    </div>

    <Dashboard />
</template>

<script>
import Dashboard from "@/views/dashboard/students/Dashboard.vue";
import AuthNavbar from "@/views/header/Navbar.vue";
import Navbar from "@/views/landings/Navbar.vue";
export default {
    name: "StudentDashboard",
    components: { Dashboard, Navbar, AuthNavbar },
    computed: {
        isAuth() {
            return this.$store.getters.authStatus;
        },
    },
};
</script>
