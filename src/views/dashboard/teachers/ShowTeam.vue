<template>
    <div class="container mx-auto my-2 bg-opacity-100">
        <div class="flex justify-center mt-2">
            <div
                class="flex justify-center border border-gray-400 bg-gray-300 w-4/12 rounded-lg"
            >
                <h1
                    class="text-lg font-semibold text-center font-mono rounded-lg mt-1 py-2 text-gray-600"
                >
                    {{ teamInfo.name }}
                </h1>
                <div class="pt-3 pl-3">
                    <img
                        height="30"
                        width="30"
                        src="@/assets/logos/team.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>

        <div class="grid grid-rows-1 mt-2" v-if="!loading">
            <div class="grid grid-cols-3">
                <div class="col-start-1 col-span-2 mt-4 gap-4">
                    <div
                        v-if="!isEmpty"
                        aria-label="card 5"
                        tabindex="0"
                        class="focus:outline-none w-3/4 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 border border-gray-300 rounded-lg"
                    >
                        <div
                            class="flex items-center border-b border-gray-200 pb-6"
                        >
                            <div
                                class="flex items-start justify-between w-full"
                            >
                                <div class="pl-3 w-full">
                                    <p
                                        @click.prevent="
                                            this.$router.push({
                                                name: 'teachersTask',
                                                params: {
                                                    projectId:
                                                        aceptedProject.id,
                                                },
                                            })
                                        "
                                        tabindex="0"
                                        class="inline-flex focus:outline-none text-xl cursor-pointer hover:underline font-medium leading-5 text-blue-800"
                                    >
                                        {{ aceptedProject.title }}
                                    </p>
                                    <span
                                        class="float-right border border-gray-400 py-2 px-2 rounded-lg font-semibold font-mono"
                                    >
                                        Accepted Idea
                                    </span>
                                    <p
                                        tabindex="0"
                                        class="focus:outline-none text-xs font-thin font-mono pt-1 text-gray-800"
                                    >
                                        {{ aceptedProject.created_at }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="px-2">
                            <p
                                tabindex="0"
                                v-html="aceptedProject.details"
                                class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                            ></p>
                            <div tabindex="0" class="focus:outline-none flex">
                                <div
                                    v-for="tag in aceptedProject.tag"
                                    :key="tag"
                                    class="py-2 ml-2 px-4 text-xs leading-3 text-indigo-700 font-semibold rounded-full bg-indigo-100"
                                >
                                    #{{ tag.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="flex 2xl:justify-center mt-8">
                            <img
                                src="@/assets/logos/nothing.svg"
                                height="300"
                                width="300"
                                alt=""
                            />
                        </div>
                        <div
                            class="container mx-auto font-semibold 2xl:text-center py-1 mt-2 pb-2 rounded-lg"
                        >
                            <h2 class="text-black font-mono pl-8 text-3xl">
                                No ideas to show yet.
                            </h2>
                            <p
                                class="text-xs text-gray-700 pl-14 font-thin font-sansz"
                            >
                                check
                                <span
                                    @click="
                                        this.$router.push({
                                            name: 'Ideas',
                                            params: {
                                                team: this.$route.params.teamID,
                                            },
                                        })
                                    "
                                    class="underline text-blue-500 font-semibold cursor-pointer"
                                    >submitted ideas
                                </span>
                                first or contact them if needed
                            </p>
                        </div>
                    </div>
                    <h1
                        class="mt-4 text-xl font-semibold text-gray-600 font-mono"
                        v-show="!isEmpty"
                    >
                        Comments
                    </h1>

                    <div v-if="aceptedProject?.comment?.length">
                        <div
                            class="flex pt-4"
                            v-for="comment in aceptedProject.comment"
                            :key="comment"
                        >
                            <div
                                tabindex="0"
                                class="focus:outline-none h-6 w-6 mb-4 lg:mb-0 mr-4"
                            >
                                <img
                                    :src="comment.avatar"
                                    alt="man avatar"
                                    class="h-full w-full rounded-full overflow-hidden shadow"
                                />
                            </div>
                            <div class="rounded-lg w-8/12 h-auto bg-gray-200">
                                <div class="flex">
                                    <h3 class="text-lg ml-4">
                                        {{ comment.commented_by }}
                                    </h3>
                                    <!-- <span class="">a day ago</span> -->
                                </div>
                                <p class="text-sm font-thin ml-4 mb-2">
                                    {{ comment.comment }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1
                            v-show="!isEmpty"
                            class="mt-4 text-lg font-semibold text-red-300 font-mono"
                        >
                            No comments available.
                        </h1>
                    </div>
                </div>

                <div>
                    <div class="ml-8">
                        <h1 class="text-xl font-mono text-gray-700 font-bold">
                            Team members
                        </h1>

                        <hr />

                        <ul class="mt-6">
                            <li
                                v-for="member in teamInfo.members"
                                :key="member"
                            >
                                <div
                                    class="flex list-disc pt-2"
                                    v-if="member.member_type === 'Student'"
                                >
                                    <img
                                        :src="member.user.image"
                                        alt
                                        class="rounded-full object-cover h-10 w-10 shadow-md"
                                    />
                                    <h2
                                        class="text-3xl text-gray-700 pl-3 font-thin"
                                    >
                                        {{ member.user.name }}
                                    </h2>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="pt-6 pl-10">
                        <h2 class="text-xl font-mono text-gray-700 font-bold">
                            Meeting history
                        </h2>

                        <hr />

                        <Disclosure v-slot="{ open }">
                            <DisclosureButton
                                class="flex justify-between mt-4 w-full px-4 py-4 text-sm font-medium text-left text-gray-500 bg-gray-200 rounded-lg focus:outline-none focus-visible:ring-opacity-75"
                            >
                                Meetings
                                <ChevronUpIcon
                                    :class="open ? 'transform rotate-180' : ''"
                                    class="w-5 h-5 text-gray-600"
                                />
                            </DisclosureButton>
                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-out"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <DisclosurePanel
                                    class="px-4 pt-4 pb-2 text-sm text-gray-500"
                                >
                                    <div>
                                        <div v-if="isEmpty" class="mt-4">
                                            <h1
                                                class="text-xl font-mono font-semibold text-gray-600 text-center"
                                            >
                                                No meeting scheduled yet.
                                            </h1>
                                        </div>
                                        <div
                                            v-else
                                            class="w-full pt-2 rounded-2xl"
                                            v-for="meeting in aceptedProject.meetings"
                                            :key="meeting"
                                        >
                                            <Disclosure v-slot="{ open }">
                                                <DisclosureButton
                                                    class="flex justify-between w-full px-4 py-4 text-sm font-medium text-left text-gray-500 bg-gray-200 rounded-lg focus:outline-none focus-visible:ring-opacity-75"
                                                >
                                                    <p>
                                                        Date:
                                                        <span
                                                            class="font-bold"
                                                            >{{
                                                                meeting.schedule
                                                            }}</span
                                                        >
                                                    </p>
                                                    <ChevronUpIcon
                                                        :class="
                                                            open
                                                                ? 'transform rotate-180'
                                                                : ''
                                                        "
                                                        class="w-5 h-5 text-gray-600"
                                                    />
                                                </DisclosureButton>
                                                <transition
                                                    enter-active-class="transition duration-100 ease-out"
                                                    enter-from-class="transform scale-95 opacity-0"
                                                    enter-to-class="transform scale-100 opacity-100"
                                                    leave-active-class="transition duration-75 ease-out"
                                                    leave-from-class="transform scale-100 opacity-100"
                                                    leave-to-class="transform scale-95 opacity-0"
                                                >
                                                    <DisclosurePanel
                                                        class="px-4 pt-4 pb-2 text-sm text-gray-500"
                                                    >
                                                        {{ meeting.details }}
                                                    </DisclosurePanel>
                                                </transition>
                                            </Disclosure>
                                        </div>
                                    </div>
                                </DisclosurePanel>
                            </transition>
                        </Disclosure>
                    </div>
                    <div
                        v-if="aceptedProject"
                        class="mt-4 flex ml-10 border justify-center border-blue-500 rounded-lg"
                    >
                        <button
                            @click="
                                this.$router.push({
                                    name: 'Ideas',
                                    params: { team: this.$route.params.teamID },
                                })
                            "
                            class="bg-transparent text-gray-600 text-center font-semibold py-2 px-4 hover:border-transparent"
                        >
                            Submitted Ideas
                        </button>
                        <div class="pt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center mt-44">
                <div class="flex justify-center items-center">
                    <div
                        class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import moment from "moment";
import DeleteConfirmationModal from "./PopOver.vue";
export default {
    name: "Task",
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronUpIcon,
        DeleteConfirmationModal,
    },
    data() {
        return {
            teamInfo: [],
            loading: true,
            aceptedProject: {},
            show: false,
        };
    },
    computed: {
        isEmpty() {
            return (
                this.aceptedProject && // 👈 null and undefined check
                Object.keys(this.aceptedProject).length === 0 &&
                Object.getPrototypeOf(this.aceptedProject) === Object.prototype
            );
        },
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        this.getTeamInfo();
    },
    methods: {
        async getTeamInfo() {
            const response = await teacherService.getSingleTeam(
                this.$route.params.teamID
            );
            console.log("from getteam info", response.data);
            response.data.project.forEach((project) => {
                if (project.status == "accepted") {
                    this.aceptedProject = project;
                }
            });
            this.loading = false;
            this.teamInfo = response.data;
            console.log("team info is", response.data.project);
        },
    },
};
</script>
