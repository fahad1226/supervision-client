<template>
    <Alert
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
        @closeAlert="alert.open = false"
    />

    <ProjectPopOver
        :status="showPopOver"
        :assignment="singleProject"
        @updateTask="updateProject"
        @closePopUp="closeEdiModal"
    />

    <DeleteConfirmation
        :status="showDltModal"
        :assignment="singleProject"
        @deleteAssignment="confirmDelete"
        :closeModal="closeDeleteModal"
    />

    <div
        class="lg:flex items-center justify-cente lg:px-0 px-4"
        v-if="!loading"
    >
        <div
            aria-label="group of cards"
            tabindex="0"
            class="focus:outline-none py-8 w-full"
        >
            <div class="container mx-auto grid grid-cols-2 gap-4 w-full mt-7">
                <div
                    v-for="idea in projects"
                    :key="idea"
                    aria-label="card 5"
                    tabindex="0"
                    class="focus:outline-none border border-gray-300 lg:w-full lg:mr-7 lg:mb-0 mb-7 bg-white p-6 rounded-lg"
                >
                    <div
                        class="flex items-center border-b border-gray-200 pb-6"
                    >
                        <div class="flex items-start justify-between w-full">
                            <div class="w-full">
                                <p
                                    tabindex="0"
                                    class="inline-flex focus:outline-none text-xl font-semibold text-gray-800"
                                >
                                    {{ subStrText(idea.title, 35) }}
                                </p>

                                <div
                                    class="float-right"
                                    v-if="idea.status === 'accepted'"
                                >
                                    <span
                                        class="bg-green-200 text-gray-800 text-sm font-semibold inline-flex items-center p-3 rounded-full dark:bg-blue-200 dark:text-blue-800"
                                    >
                                        <svg
                                            class="w-3 h-3"
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
                                    <span
                                        class="text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                    >
                                        Accepted idea
                                    </span>
                                </div>

                                <div class="float-right" v-else>
                                    <div
                                        class="bg-gray-200 text-gray-800 text-sm font-semibold inline-flex items-center p-2 rounded-full dark:bg-blue-200 dark:text-blue-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        class="text-yellow-500 inline-flex bg-white font-medium rounded-lg text-sm px-5 py-1 mb-2"
                                    >
                                        Pending
                                    </div>
                                </div>

                                <p
                                    tabindex="0"
                                    class="focus:outline-none pl-1 text-xs font-thin pt-2 text-gray-500"
                                >
                                    {{ idea.created_at }}
                                </p>
                            </div>
                        </div>

                        <Listbox class="-mt-1">
                            <div class="relative">
                                <ListboxButton
                                    class="relative rounded-md w-6 py-1 text-left bg-transparent cursor-default focus:outline-none"
                                >
                                    <div class="pl-4 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                            />
                                        </svg>
                                    </div>
                                </ListboxButton>

                                <Transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <ListboxOptions
                                        class="absolute ml-5 w-20 origin-top-right bg-white divide-y divide-gray-100 rounded-md border border-gray-300"
                                    >
                                        <ListboxOption
                                            class="cursor-pointer"
                                            as="template"
                                        >
                                            <li
                                                @click="showEditProject(idea)"
                                                class="inline-flex cursor-default select-none relative py-2 pl-2 pr-4"
                                            >
                                                <span
                                                    class="font-mono font-thin text-sm"
                                                    >Edit
                                                </span>
                                                <div class="pl-5">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                                                        />
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </li>
                                        </ListboxOption>
                                        <ListboxOption
                                            @click="showDeleteProject(idea)"
                                            class="cursor-pointer"
                                            as="template"
                                        >
                                            <li
                                                class="inline-flex cursor-default select-none relative py-2 px-6 pl-2 pr-4"
                                            >
                                                <span
                                                    class="font-mono font-thin text-sm"
                                                    >Delete
                                                </span>
                                                <div class="pl-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </li>
                                        </ListboxOption>
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div class="px-2">
                        <p
                            v-html="idea.details"
                            tabindex="0"
                            class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                        ></p>
                        <div tabindex="0" class="focus:outline-none flex">
                            <div
                                v-for="tag in idea.tag"
                                :key="tag"
                                class="py-2 ml-2 px-4 text-xs leading-3 font-semibold text-indigo-700 rounded-full bg-indigo-100"
                            >
                                #{{ tag.name }}
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex pt-6"
                        v-for="comment in idea.comment"
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
                        <div class="rounded-lg w-5/6 h-auto bg-gray-200">
                            <div class="inline-flex">
                                <h3 class="text-lg ml-4">
                                    {{ comment.commented_by }}
                                </h3>
                            </div>
                            <span class="float-right text-xs pr-4 pt-1">{{
                                comment.commented_at
                            }}</span>
                            <p class="text-sm font-thin ml-4 mb-2">
                                {{ comment.comment }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center mt-40">
        <div class="flex justify-center items-center">
            <div
                class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
            ></div>
        </div>
    </div>
</template>

<script>
import studentService from "@/config/services/studentService";
import Alert from "@/views/shared/Alert.vue";
import DeleteConfirmation from "@/views/shared/Confirmation.vue";
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/vue";
import ProjectPopOver from "./PopOver.vue";
export default {
    name: "Ideas",
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        ProjectPopOver,
        DeleteConfirmation,
        Alert,
    },
    data() {
        return {
            projects: [],
            singleProject: {},
            showPopOver: false,
            showDltModal: false,
            loading: true,
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
        };
    },

    mounted() {
        this.getAllIdeas();
    },

    methods: {
        async getAllIdeas() {
            try {
                const { data } = await studentService.getSubmittedProjects();
                this.projects = data.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        showEditProject(project) {
            this.showPopOver = true;
            this.singleProject = project;
        },
        showDeleteProject(project) {
            this.showDltModal = true;
            this.singleProject = project;
        },
        async updateProject(project) {
            let tags = [];
            project.tag.forEach((t) => {
                tags.push(t.name);
            });
            const info = {
                ID: project.id,
                name: project.title,
                details: project.details,
                tag: tags,
            };
            try {
                await studentService.updateProject(info);
                this.alert.open = true;
                this.alert.message = "Assignment Updated!";
                this.alert.status = "success";
                this.alert.color = "green";

                setTimeout(() => {
                    this.alert.open = false;
                }, 2500);
            } catch (error) {
                this.alert.open = true;
                this.alert.message = "Something went wrong, try again!";
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                }, 2500);
            }
        },
        async confirmDelete(project) {
            const response = await studentService.confirmDelete(project.id);
            console.log("delete confiurmed", response.data);
        },
        closeEdiModal() {
            this.showPopOver = false;
        },
        closeDeleteModal() {
            this.showDltModal = false;
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

<style>
.checkbox:checked + .check-icon {
    display: flex;
}
</style>
