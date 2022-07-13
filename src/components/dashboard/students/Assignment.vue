<template>
    <Navbar />

    <TeamTask />
</template>

<script>
import TeamTask from "@/views/dashboard/students/TeamTask.vue";
import Navbar from "@/views/header/Navbar.vue";
export default {
    name: "StudentSection",
    components: { Navbar, TeamTask },
};
</script>
