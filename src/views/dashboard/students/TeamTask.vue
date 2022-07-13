<template>
    <div class="mx-auto container">
        <div class="grid grid-rows-1">
            <div class="grid grid-cols-1 gap-2">
                <div class="ml-10">
                    <div
                        class="container mx-auto font-bold text-center py-1 mt-2 pb-2 rounded-lg w-96 border border-gray-400"
                    >
                        <h1 class="text-2xl text-black font-mono">
                            Assignment
                        </h1>
                    </div>
                    <div class="pl-4 mt-4">
                        <BreadCrumbs :crumbs="crumbs" @selected="selected" />
                    </div>
                    <div
                        aria-label="card 2"
                        tabindex="0"
                        class="mt-6 focus:outline-none lg:mr-7 lg:mb-0 mb-7 bg-white p-6 border border-gray-300 rounded-lg"
                    >
                        <div
                            class="flex items-center border-b border-gray-200 pb-6"
                        >
                            <div
                                class="flex items-start justify-between w-full"
                            >
                                <div class="pl-3 w-full">
                                    <p
                                        tabindex="0"
                                        class="focus:outline-none text-xl font-medium leading-5 text-gray-800"
                                    >
                                        {{ assignment.title }}
                                    </p>
                                </div>

                                <span class="text-xs w-32 font-thin pl-4">
                                    {{ assignment.assigned_at }}
                                </span>
                            </div>
                        </div>

                        <div class="px-2">
                            <p
                                v-html="assignment.details"
                                tabindex="0"
                                class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 mb-10">
            <hr />
            <div
                class="mx-auto mt-5 font-bold text-center py-1 pb-2 rounded-lg w-96 border border-gray-400"
            >
                <h1 class="text-2xl text-black font-mono">
                    Assigned task
                    <span class="text-indigo-500 font-bold">{{
                        taskLength
                    }}</span>
                </h1>
            </div>

            <div class="grid grid-cols-3" v-if="taskLength">
                <div
                    v-for="(task, index) in tasks?.data"
                    :key="index"
                    aria-label="card 2"
                    tabindex="0"
                    class="mt-2 focus:outline-none lg:mr-7 lg:mb-0 mb-7 bg-white p-6 border border-gray-300 rounded-lg"
                >
                    <div
                        class="flex items-center border-b border-gray-200 pb-6"
                    >
                        <div class="flex items-start justify-between w-full">
                            <div class="pl-3 w-full">
                                <p
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium leading-5 text-gray-800"
                                    :class="task.status ? 'line-through' : ''"
                                >
                                    {{ task.title }}
                                </p>
                                <span class="text-xs w-28 font-thin">
                                    3 hours ago
                                </span>
                            </div>

                            <div class="inline-flex">
                                <div v-if="task.status" class="pr-4">
                                    <span
                                        class="bg-green-200 text-gray-800 text-sm font-semibold inline-flex items-center p-3 rounded-full dark:bg-blue-200 dark:text-blue-800"
                                    >
                                        <svg
                                            class="w-3.5 h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>Completed</title>
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>

                                <div v-else class="pr-4">
                                    <span
                                        class="bg-gray-100 text-gray-800 text-sm font-semibold inline-flex items-center p-3 rounded-full dark:bg-blue-200 dark:text-blue-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <title>In-Progress</title>
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </span>
                                </div>

                                <div class="float-right">
                                    <Toggle
                                        v-model="task.status"
                                        @click="updateStatus(task)"
                                        class="toggle-width toggle-height"
                                        on-label="Done"
                                        off-label="Open"
                                        labelledby="toggle-label"
                                        describedby="toggle-description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <p
                            v-html="task.details"
                            tabindex="0"
                            class="focus:outline-none text-sm py-4 text-gray-600"
                        ></p>
                    </div>
                </div>
            </div>
            <div v-else>
                <section class="mt-9 pb-10 flex justify-center">
                    <img
                        height="300"
                        width="500"
                        class=""
                        src="@/assets/logos/void.svg"
                    />
                </section>
                <h2 class="text-center font-mono text-red-300">
                    No task available yet.
                </h2>
            </div>

            <div v-if="tasks?.meta?.total > 4">
                <Pagination :meta="tasks.meta" @getPage="getPaginatedTask" />
            </div>
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import { Switch } from "@headlessui/vue";
import Toggle from "@vueform/toggle";
import BreadCrumbs from "../../shared/BreadCrumbs.vue";
import Pagination from "../../shared/Pagination.vue";
export default {
    name: "TeamTask",
    components: {
        Switch,
        Pagination,
        BreadCrumbs,
        Toggle,
    },
    data() {
        return {
            enabled: [],
            taskID: null,
            tasks: [],
            assignment: {},
            crumbs: ["Public Ideas", "Assignment", "Task"],
        };
    },
    computed: {
        paginationLimit() {
            return store.state.paginationLimit;
        },
        taskLength() {
            return this.tasks?.data?.length;
        },
    },
    watch: {
        paginationLimit() {
            this.getPaginatedTask(1, this.paginationLimit);
        },
    },
    mounted() {
        this.getAssignment();
        this.getPaginatedTask(1, this.paginationLimit);
    },
    methods: {
        async getAssignment() {
            const response = await teacherService.getAssignment(
                this.$route.params.ID
            );
            this.assignment = response.data;
        },
        async getPaginatedTask(page, limit) {
            const response = await teacherService.getPaginatedTask(
                this.$route.params.ID,
                page,
                limit
            );
            console.log("task response", response.data);
            this.tasks = response.data;
            this.meta = response.data;
        },
        async updateStatus(task) {
            const response = await teacherService.updateTask(task);
        },
        selected(crumb) {
            if (crumb == "Assignment") {
                this.$router.go(-1);
            }
        },
    },
};
</script>
<style src="@vueform/toggle/themes/default.css"></style>

<style>
.toggle-width {
    --toggle-width: 5rem;
}

.toggle-height {
    --toggle-height: 2rem;
}
</style>
