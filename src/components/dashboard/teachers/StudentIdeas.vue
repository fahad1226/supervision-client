<template>
    <Navbar />
    <Ideas />
</template>

<script>
import Ideas from "@/views/dashboard/teachers/Ideas.vue";
import Navbar from "@/views/header/Navbar.vue";
export default {
    name: "StudentIdeas",
    components: {
        Ideas,
        Navbar,
    },
};
</script>
