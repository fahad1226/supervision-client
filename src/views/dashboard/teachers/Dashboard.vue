<template>
    <Alert
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
    />

    <SnackBar
        :open="welcomeAlert"
        :user="user"
        @closeSnackbar="closeSnackbar"
    />
    <TransitionRoot
        as="template"
        :show="open"
        class="bg-gray-900 bg-opacity-50"
    >
        <Dialog
            as="div"
            static
            class="fixed inset-0 overflow-hidden"
            @close="open = false"
            :open="open"
        >
            <div class="absolute inset-0 overflow-hidden">
                <DialogOverlay class="absolute inset-0" />

                <div class="fixed inset-y-0 top-6 bottom-14 right-0 flex">
                    <TransitionChild
                        as="template"
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="translate-x-full"
                        enter-to="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leave-from="translate-x-0"
                        leave-to="translate-x-full"
                    >
                        <div class="z-100">
                            <form
                                class="h-full flex flex-col overflow-y-auto rounded-lg bg-white shadow-xl"
                            >
                                <div class="flex-1">
                                    <EntryForm
                                        @closeEntryForm="closeEntryForm"
                                    />
                                </div>
                            </form>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <ConfirmationModal
        :status="showDelete"
        :assignment="singleProject"
        @deleteAssignment="deleteProject"
        :closeModal="closeModal"
    />

    <body class="flex items-center justify-center py-8 px-2">
        <div class="w-full sm:px-6">
            <div
                class="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg"
            >
                <div class="sm:flex items-center justify-between">
                    <p
                        tabindex="0"
                        class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl leading-normal text-gray-800"
                    >
                        Supervisor's Section
                        <span class="font-bold">
                            {{ supervisorName }}
                        </span>
                    </p>

                    <div>
                        <!-- <div class="float-left">
                            <input
                                id="first_name"
                                aria-labelledby="email"
                                type="text"
                                placeholder="Search group"
                                class="bg-gray-50 border border-gray-400 rounded text-xs font-medium leading-none placeholder:text-gray-400 text-gray-800 py-3 w-96 pl-3"
                            />
                        </div> -->
                        <button
                            @click="open = true"
                            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded-lg"
                        >
                            <p
                                class="text-sm font-medium leading-none text-white"
                            >
                                Create New Team
                            </p>
                        </button>
                    </div>
                </div>
            </div>

            <div
                class="bg-white border border-gray-300 rounded-lg px-4 md:px-10 pt-4 md:pt-7 pb-4 overflow-y-auto"
                v-if="projects?.data?.length"
            >
                <table class="w-full whitespace-nowrap">
                    <thead>
                        <tr
                            tabindex="0"
                            class="focus:outline-none h-10 w-full text-sm leading-none text-gray-800"
                        >
                            <th class="font-normal text-left pl-4">Project</th>
                            <th class="font-normal text-left pl-12">
                                Progress
                            </th>
                            <th class="font-normal text-left pl-12">
                                Assignments
                            </th>
                            <!-- <th class="font-normal text-left pl-20">Batch</th> -->
                            <th class="font-normal text-left pl-20">
                                Total meeting
                            </th>
                            <th class="font-normal text-left pl-16">Members</th>
                            <th class="font-normal text-left pl-16">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="w-full">
                        <tr
                            v-for="(project, index) in projects.data"
                            :key="index"
                            tabindex="0"
                            class="focus:outline-none h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >
                            <td
                                class="pl-4 cursor-pointer"
                                @click.prevent="
                                    this.$router.push({
                                        name: 'teachersTask',
                                        params: {
                                            projectId: project.projects.id,
                                        },
                                    })
                                "
                            >
                                <div class="flex items-center">
                                    <div class="w-10 h-10">
                                        <img
                                            class="w-full h-full"
                                            src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                                            alt="UX Design and Visual Strategy"
                                        />
                                    </div>

                                    <div class="pl-4">
                                        <p class="font-medium">
                                            {{
                                                subStrText(
                                                    project.projects.title,
                                                    20
                                                )
                                            }}
                                        </p>
                                        <p
                                            class="text-xs leading-3 text-gray-600 pt-2"
                                            v-html="
                                                subStrText(
                                                    project.projects.details,
                                                    30
                                                )
                                            "
                                        ></p>
                                    </div>
                                </div>
                            </td>
                            <td class="pl-12">
                                <base-progress
                                    :percentage="
                                        project.projects.progress.slice(0, -1)
                                    "
                                    class="mx-2 mb-2 h-6"
                                >
                                    <span
                                        class="text-xs text-white w-full pl-4 pr-2"
                                        >{{ project.projects.progress }}</span
                                    >
                                </base-progress>
                                <!-- <div
                                    class="w-20 h-3 bg-green-progress rounded-full"
                                ></div> -->
                            </td>
                            <td class="pl-12">
                                <p class="font-medium">
                                    {{ project.projects.task_completed }} /{{
                                        project.projects.tasks
                                    }}
                                </p>
                                <p class="text-xs leading-3 text-gray-600 mt-2">
                                    {{ project.projects.task_due }} assignments
                                    pending
                                </p>
                            </td>
                            <!-- <td class="pl-20">
                                <p class="font-medium">{{ project.batch }}</p>
                            </td> -->
                            <td class="pl-32">
                                <p class="font-medium">
                                    {{ project.projects.meetings?.length }}
                                </p>
                            </td>
                            <td
                                class="flex items-center px-5 py-5 ml-10 text-sm"
                            >
                                <div
                                    v-for="member in project.projects
                                        ?.team_member"
                                    :key="member"
                                >
                                    <img
                                        v-show="
                                            member.member_type === 'Student'
                                        "
                                        class="shadow-md w-8 h-8 ml-2 rounded-full"
                                        :src="member.user.image"
                                        alt="collaborator 1"
                                    />
                                </div>
                            </td>

                            <td
                                class="pl-20"
                                @click="openDeleteProject(project.projects)"
                            >
                                <div class="cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <title>trash this project.</title>
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="loading">
                <Loader />
            </div>
            <div v-else>
                <div class="flex justify-center">
                    <img
                        height="300"
                        width="500"
                        src="@/assets/images/undraw_empty_re_opql.svg"
                    />
                </div>
                <h2 class="text-center mt-3 font-mono">
                    No projects are available yet.
                </h2>
            </div>
            <div v-if="projects?.meta?.total > 3">
                <Pagination :meta="projects.meta" @getPage="getAllProjects" />
            </div>
        </div>
    </body>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import EntryForm from "@/views/dashboard/Form.vue";
import Alert from "@/views/shared/Alert.vue";
import ConfirmationModal from "@/views/shared/Confirmation.vue";
import Loader from "@/views/shared/Loader.vue";
import Pagination from "@/views/shared/Pagination.vue";
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import BaseProgress from "../../shared/BaseProgress.vue";
import SnackBar from "../../shared/SnackBar.vue";
export default {
    name: "component",
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        EntryForm,
        Pagination,
        Loader,
        ConfirmationModal,
        BaseProgress,
        Alert,
        SnackBar,
    },
    data() {
        return {
            open: false,
            show: null,
            showDelete: false,
            projects: [],
            singleProject: {},
            loading: true,
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
        };
    },
    watch: {
        paginationLimit() {
            this.getAllProjects(1, this.paginationLimit);
        },
    },
    computed: {
        welcomeAlert() {
            return store.state.welcomeAlert;
            //return JSON.parse(localStorage.getItem("vuex")).welcomeAlert;
        },
        user() {
            return store.getters.getUser;
        },
        supervisorName() {
            return this.$store.getters.getUser?.user?.name;
        },
        paginationLimit() {
            return store.state.paginationLimit;
        },
    },

    mounted() {
        this.getAllProjects(1, this.paginationLimit);
        setTimeout(() => {
            this.closeSnackbar();
        }, 3000);
    },
    methods: {
        async getAllProjects(page, limit) {
            try {
                const { data } = await teacherService.getProjects(page, limit);
                this.projects = data;
            } catch (er) {
                this.loading = false;
                if (er?.response?.status === 401) {
                    this.$store.commit("updateLogout");
                    this.$router.push("/login");
                }
            }
        },
        openDeleteProject(project) {
            this.showDelete = true;
            this.singleProject = project;
        },
        async deleteProject(project) {
            try {
                const response = await teacherService.deleteProject(project.id);
                this.closeModal();
                console.log("project is", this.projects);
                const index = this.projects.data.indexOf(project);
                if (index > -1) {
                    this.projects.data.splice(index, 1); // 2nd parameter means remove one item only
                }
                this.alert.open = true;
                this.alert.message = "Project deleted successfully!";
                this.alert.status = "success";
                this.alert.color = "green";
                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
                this.getAllProjects(1, this.paginationLimit);
            } catch (error) {
                this.closeModal();
                this.alert.open = true;
                this.alert.message = "Something went wrong, try again!";
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                }, 3000);
            }
        },
        closeEntryForm() {
            this.open = false;
        },

        closeModal() {
            this.showDelete = false;
        },
        closeSnackbar() {
            this.$store.state.welcomeAlert = false;
        },
        // helper to truncate text
        subStrText(str, limit = 20) {
            return str && str.length > limit
                ? str.substr(0, limit) + "..."
                : str;
        },
    },
};
</script>
