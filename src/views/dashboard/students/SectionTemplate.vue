<template>
    <SnackBar
        :open="welcomeAlert"
        :user="user"
        @closeSnackbar="closeSnackbar"
    />
    <div class="container mx-auto">
        <div class="flex justify-center mt-2">
            <div
                class="flex justify-center border border-gray-400 bg-gray-300 w-4/12 rounded-lg"
            >
                <h1
                    class="text-lg font-semibold text-center font-mono rounded-lg mt-1 py-2 text-gray-600"
                >
                    {{ teamInfo.name || "Your Team" }}
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

        <div class="pl-8 mt-4">
            <BreadCrumbs :crumbs="crumbs" @selected="selected" />
        </div>

        <div class="grid grid-rows-1 pt-4">
            <div class="grid grid-cols-3">
                <div class="col-start-1 col-span-2">
                    <div class="-mt-8">
                        <Task :loading="loading" :teamInfo="teamInfo" />
                    </div>
                </div>
                <div class="col-span-1 2xl:ml-28">
                    <!-- submit new idea button -->
                    <div
                        class="flex w-full border justify-center border-blue-500 rounded-lg"
                        v-if="
                            hasTeam &&
                            teamInfo.approved_project?.status != 'accepted'
                        "
                    >
                        <button
                            @click="this.$router.push('/new-idea')"
                            class="bg-transparent text-gray-600 text-center font-semibold py-2 px-4 hover:border-transparent rounded-lg"
                        >
                            Submit a New Idea
                        </button>
                        <div class="pt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                    </div>

                    <div
                        v-else
                        class="flex w-full filter blur-sm border justify-center border-blue-500 rounded-lg"
                    >
                        <button
                            class="bg-transparent text-gray-600 text-center cursor-not-allowed font-semibold py-2 px-4 hover:border-transparent rounded-lg"
                        >
                            Submit a New Idea
                        </button>
                        <div class="pt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                    </div>

                    <div
                        v-if="teamInfo.total_projects > 0"
                        class="mt-4 flex w-full border justify-center border-blue-500 rounded-lg"
                    >
                        <button
                            @click="
                                this.$router.push(
                                    '/students/section/submitted-ideas'
                                )
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

                    <div
                        v-else
                        class="mt-4 flex w-full filter blur-sm border justify-center border-blue-500 rounded-lg"
                    >
                        <button
                            disabled
                            class="bg-transparent cursor-not-allowed text-gray-600 text-center font-semibold py-2 px-4 hover:border-transparent"
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

                    <div class="mt-6">
                        <h1 class="text-xl font-mono font-bold">
                            Team members
                        </h1>
                    </div>

                    <hr />

                    <ul class="mt-2" v-if="teamInfo.success">
                        <li
                            v-for="member in teamInfo.team_members"
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
                                    class="text-2xl text-gray-500 pl-3 font-semibold"
                                >
                                    {{ member.user.name }}
                                </h2>
                            </div>
                        </li>
                    </ul>

                    <ul class="mt-6" v-else>
                        <li
                            v-for="member in 3"
                            :key="member"
                            class="filter blur-sm"
                        >
                            <div class="flex list-disc pt-2">
                                <img
                                    src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                                    alt
                                    class="rounded-full object-cover h-10 w-10 shadow-md"
                                />
                                <h2
                                    class="text-3xl text-gray-700 pl-3 font-thin"
                                >
                                    Member Name
                                </h2>
                            </div>
                        </li>
                    </ul>

                    <div class="pt-6">
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
                                        <div v-if="!meetingLegth" class="mt-4">
                                            <h1
                                                class="text-xl font-mono font-semibold text-gray-600 text-center"
                                            >
                                                No meeting scheduled yet.
                                            </h1>
                                        </div>
                                        <div
                                            v-else
                                            class="w-full pt-2 rounded-2xl"
                                            v-for="(
                                                meeting, index
                                            ) in teamInfo.meetings"
                                            :key="index"
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
                </div>
            </div>
        </div>

        <h1
            v-if="teamInfo.approved_project?.assignment.length > 0"
            class="text-xl font-mono ml-8 font-semibold text-gray-700"
        >
            Assignments
        </h1>
        <div class="grid grid-rows-1">
            <div class="grid grid-cols-2">
                <div
                    v-for="assignment in teamInfo.approved_project?.assignment"
                    :key="assignment"
                    aria-label="card 2"
                    tabindex="0"
                    class="mt-2 focus:outline-none ml-6 lg:mr-7 bg-white p-3 border border-gray-300 rounded-lg"
                >
                    <div class="flex items-center border-b border-gray-200">
                        <div class="flex items-start justify-between w-full">
                            <div class="pl-3 w-full">
                                <h3
                                    @click="
                                        this.$router.push({
                                            name: 'team-assignment',
                                            params: { ID: assignment.id },
                                        })
                                    "
                                    class="flex p-2 font-serif cursor-pointer rounded-lg items-center mb-1 text-lg font-bold text-gray-900 dark:text-white"
                                >
                                    {{ assignment.title }}
                                    <span
                                        class="pl-4 -mt-2 text-indigo-600 text-xl"
                                    >
                                        <!-- {{ assignment }} -->
                                    </span>
                                </h3>
                                <div class="-mt-16 float-right">
                                    <div
                                        class="inline-flex justify-center w-40 mt-4"
                                    >
                                        <time
                                            class="block mb-2 ml-5 mt-2 pl-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                                        >
                                            {{ assignment.assigned_at }}</time
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p
                        v-html="assignment?.details"
                        class="mb-4 mt-3 text-base ml-5 font-normal text-gray-500 dark:text-gray-400"
                    ></p>
                </div>
            </div>
        </div>
        <div class="h-32"></div>
    </div>
</template>

<script>
import studentService from "@/config/services/studentService";
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import moment from "moment";
import store from "../../../store";
import BreadCrumbs from "../../shared/BreadCrumbs.vue";
import SnackBar from "../../shared/SnackBar.vue";
import NewIdea from "./NewIdea.vue";
import Task from "./Task.vue";
export default {
    name: "section-template",
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        NewIdea,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronUpIcon,
        Task,
        BreadCrumbs,
        SnackBar,
    },
    data() {
        return {
            loading: true,
            open: false,
            hasTeam: true,
            teamInfo: {},
            crumbs: ["Public Ideas", "Assignment"],
        };
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        this.getTeamInfo();
        setTimeout(() => {
            this.closeSnackbar();
        }, 3000);
    },
    computed: {
        meetingLegth() {
            return this.teamInfo?.meetings?.length;
        },
        welcomeAlert() {
            return store.state.welcomeAlert;
        },
        user() {
            return store.getters.getUser;
        },
    },
    methods: {
        async getTeamInfo() {
            try {
                const { data } = await studentService.getTeamInfo();
                this.teamInfo = data;
                this.hasTeam = true;
                this.loading = false;
                if (data.success == false) {
                    this.hasTeam = false;
                }
            } catch (error) {
                this.loading = false;
                if (error.response.status == 401) {
                    store.commit("updateLogout");
                }
            }
        },
        selected() {
            this.$router.push("/public-ideas");
        },
        closeSnackbar() {
            this.$store.state.welcomeAlert = false;
        },
    },
};
</script>
