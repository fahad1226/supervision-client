<template>
    <Navbar />
    <ShowTeam />
</template>

<script>
import ShowTeam from "@/views/dashboard/teachers/ShowTeam.vue";

import Navbar from "@/views/header/Navbar.vue";
export default {
    name: "Team",
    components: { ShowTeam, Navbar },
};
</script>
