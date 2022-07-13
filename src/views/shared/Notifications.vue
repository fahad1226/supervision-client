<template>
    <div class="bg-white rounded w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
        <p
            tabindex="0"
            class="focus:outline-none pb-8 text-2xl font-extrabold leading-6 text-gray-800"
        >
            Notifications
        </p>

        <div v-for="notification in notifications" :key="notification">
            <div
                class="w-full p-3 mt-4 bg-white rounded flex"
                @click="this.$router.push(notification.data.url)"
            >
                <div
                    tabindex="0"
                    aria-label="post icon"
                    role="img"
                    class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                        />
                        <path
                            d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                        />
                    </svg>
                </div>
                <div class="pl-3">
                    <p
                        tabindex="0"
                        class="focus:outline-none text-sm leading-none cursor-pointer"
                    >
                        <span class="text-indigo-700 font-semibold">{{
                            notification.data.message
                        }}</span>
                    </p>
                    <p
                        tabindex="0"
                        class="focus:outline-none text-xs leading-3 pt-1 text-gray-500 cursor-pointer"
                    >
                        {{ notification.created }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center justiyf-between">
            <hr class="w-full" />
            <p
                tabindex="0"
                class="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
            >
                Thats it for now 😃
            </p>
            <hr class="w-full" />
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "Notifications",
    data() {
        return {};
    },
    computed: {
        notifications() {
            return store.state.notificationModule.notifications;
        },
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        this.getNotifications();
    },
    methods: {
        getNotifications() {
            store.dispatch("getNotifications");
        },
    },
};
</script>
