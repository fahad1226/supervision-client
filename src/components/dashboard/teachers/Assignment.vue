<template>
    <Navbar />
    <SingleAssignment />
    <div class="h-28"></div>
</template>

<script>
import SingleAssignment from "@/views/dashboard/teachers/SingleAssignment.vue";
import Navbar from "@/views/header/Navbar.vue";

export default {
    name: "Dash",
    components: { SingleAssignment, Navbar },
};
</script>
