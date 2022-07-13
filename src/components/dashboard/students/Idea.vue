<template>
    <Navbar />

    <NewIdea />
</template>

<script>
import NewIdea from "@/views/dashboard/students/NewIdea.vue";

import Navbar from "@/views/header/Navbar.vue";
export default {
    name: "StudentDashboard",
    components: { NewIdea, Navbar },
};
</script>
