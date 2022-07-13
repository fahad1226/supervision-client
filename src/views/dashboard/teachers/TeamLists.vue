<template>
    <div>
        <Navbar />
        <hr />
        <div class="mx-auto container p-8 rounded-md w-full">
            <div class="flex items-center justify-between pb-6">
                <div>
                    <h2 class="text-gray-600 font-semibold text-2xl">
                        List of groups
                    </h2>
                    <span class="text-xs font-mono">of Anik Sen</span>
                </div>
                <!-- <div class="flex items-center justify-between">
                    <div class="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <input
                            class="bg-gray-50 ml-1 block"
                            type="text"
                            name=""
                            id=""
                            placeholder="search..."
                        />
                    </div>
                </div> -->
            </div>
            <div>
                <div
                    class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                    v-if="teamLists.length"
                >
                    <div
                        class="inline-block min-w-full shadow rounded-lg overflow-hidden"
                    >
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        Team Name
                                    </th>
                                    <th
                                        class="pl-16 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        Batch
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        Created at
                                    </th>

                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        Members
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="(team, index) in teamLists"
                                    :key="index"
                                >
                                    <td
                                        @click="
                                            this.$router.push(
                                                `/single-team/${team.team_id}`
                                            )
                                        "
                                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                                    >
                                        <div class="flex items-center">
                                            <div class="ml-3">
                                                <p
                                                    class="text-gray-900 font-mono font-semibold whitespace-no-wrap"
                                                >
                                                    {{ team.team_name }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        class="flex items-center border-b border-gray-200 px-2 py-4 bg-white text-sm"
                                    >
                                        <div
                                            v-for="member in team.members"
                                            :key="member"
                                        >
                                            <div
                                                v-show="
                                                    member.member_type ===
                                                    'Student'
                                                "
                                                ref="btnRef"
                                                class="rounded-full font-thin bg-gray-300 p-2 ml-3"
                                            >
                                                {{ member.user.batch }}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                    >
                                        <p
                                            class="text-gray-900 whitespace-no-wrap"
                                        >
                                            {{
                                                moment(team.created_at).format(
                                                    "MMM Do YYYY"
                                                )
                                            }}
                                        </p>
                                    </td>

                                    <td
                                        class="flex items-center px-5 py-4 border-b border-gray-200 bg-white"
                                    >
                                        <div
                                            v-for="member in team.members"
                                            :key="member"
                                        >
                                            <img
                                                v-show="
                                                    member.member_type ===
                                                    'Student'
                                                "
                                                class="shadow-md w-8 h-8 ml-2 rounded-full"
                                                :src="member.user.image"
                                                alt="collaborator 1"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="loading">
                    <Loader />
                </div>
                <div v-else>
                    <div class="flex justify-center">
                        <img
                            height="250"
                            width="400"
                            src="@/assets/logos/no_ideas.svg"
                        />
                    </div>
                    <h2 class="text-center mt-3 font-mono">
                        you don't have any team yet.
                    </h2>
                </div>
            </div>

            <div v-if="teamLists.length > 4">
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import Navbar from "@/views/header/Navbar.vue";
import Loader from "@/views/shared/Loader.vue";
import Pagination from "@/views/shared/Pagination.vue";
import moment from "moment";

export default {
    name: "TeamLists",
    components: {
        Navbar,
        Pagination,
        Loader,
    },
    data() {
        return {
            teamLists: [],
            loading: true,
        };
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        this.getAllTeam();
    },
    methods: {
        async getAllTeam() {
            try {
                const response = await teacherService.getAllTeam();
                this.teamLists = response.data.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        // toggleTooltip: function () {
        //     if (this.tooltipShow) {
        //         this.tooltipShow = false;
        //     } else {
        //         this.tooltipShow = true;
        //         createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
        //             placement: "top",
        //         });
        //     }
        // },
    },
};
</script>
