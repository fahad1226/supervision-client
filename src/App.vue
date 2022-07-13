<template>
    <div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    errorCaptured(error, component, info) {
        console.log("hello from hshshshs", error);
    },
};
</script>
