<template>
    <PopUpMessage
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
    />

    <ConfirmationModal
        :status="showConfirmation"
        :assignment="singleTask"
        @deleteAssignment="deleteTask"
        :closeModal="closeModal"
    />
    <BreadCrumbs :crumbs="crumbs" @selected="selected" />
    <div class="mx-auto container">
        <div class="grid grid-rows-1">
            <div class="grid grid-cols-2 gap-2">
                <div class="col-span-1">
                    <div
                        class="container mx-auto font-bold text-center py-1 mt-2 pb-2 rounded-lg w-96 border border-gray-400"
                    >
                        <h1 class="text-2xl text-black font-mono">
                            Assign task
                        </h1>
                    </div>

                    <div class="mt-6">
                        <label class="font-mono text-lg font-bold" for="title"
                            >Task title</label
                        >
                        <input
                            id="title"
                            v-model="newtTask.title"
                            class="border border-gray-400 rounded w-full py-2 px-3 mr-6 text-grey-darker"
                            placeholder="Assignment title"
                        />
                    </div>

                    <div class="w-full mt-4">
                        <label class="font-mono text-lg font-bold" for="details"
                            >Task details</label
                        >
                        <editor
                            id="details"
                            api-key="kugqzag6sf0jxnetl94v542ompov15bixo47unpcy0jafwr3"
                            :init="init"
                            :plugins="plugins"
                            :toolbar="toolbar"
                            v-model="newtTask.details"
                            placeholder="Describe the task to the students."
                        />
                    </div>
                    <button
                        @click.prevent="assignTask"
                        class="mt-4 bg-transparent w-full hover:bg-indigo-500 text-center text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Assign
                    </button>
                </div>

                <div class="ml-10">
                    <div
                        class="container mx-auto font-bold text-center py-1 mt-2 pb-2 rounded-lg w-96 border border-gray-400"
                    >
                        <h1 class="text-2xl text-black font-mono">
                            Assignment
                        </h1>
                    </div>
                    <div
                        aria-label="card 2"
                        tabindex="0"
                        class="mt-12 focus:outline-none lg:mr-7 lg:mb-0 mb-7 bg-white p-6 border border-gray-300 rounded"
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
                                        {{ singleAssignment.title }}
                                    </p>
                                </div>

                                <span class="text-xs w-32 font-thin pl-4">
                                    {{ singleAssignment.assigned_at }}
                                </span>
                            </div>
                        </div>

                        <div class="px-2">
                            <p
                                v-html="singleAssignment.details"
                                tabindex="0"
                                class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                            ></p>
                            <!-- <div tabindex="0" class="focus:outline-none flex">
                                <div
                                    class="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100"
                                >
                                    #Buy
                                </div>
                                
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AssignmentPopOver
            :status="showTask"
            :assignment="singleTask"
            @updateTask="updateTask"
            @closePopUp="closePopUp"
        />

        <div class="mt-4 mb-10">
            <hr />
            <div
                class="mx-auto mt-5 font-bold text-center py-1 pb-2 rounded-lg w-96 border border-gray-400"
            >
                <h1 class="text-2xl text-black font-mono">
                    Assigned task
                    <span class="text-indigo-500 font-bold">{{
                        tasks?.tasks?.length
                    }}</span>
                </h1>
            </div>

            <div class="grid grid-cols-3 mt-2" v-if="tasks?.data?.length > 0">
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
                            <div class="pl-3 w-full flex">
                                <p
                                    tabindex="0"
                                    class="focus:outline-none inline-flex text-xl font-medium leading-5 text-gray-800"
                                    :class="
                                        task.status === 1 ? 'line-through' : ''
                                    "
                                >
                                    {{ task.title }}
                                </p>
                                <div
                                    v-if="task.status === 1"
                                    class="pl-4 -mt-1"
                                >
                                    <span
                                        class="bg-green-200 text-gray-800 text-sm font-semibold inline-flex items-center p-2 rounded-full dark:bg-blue-200 dark:text-blue-800"
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
                                </div>
                                <div v-else class="pl-4 -mt-2">
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
                            </div>

                            <div class="inline-flex">
                                <span class="text-xs w-28 font-thin pl-4">
                                    {{ task.assigned_at }}
                                </span>

                                <span
                                    class="cursor-pointer"
                                    @click="confirmTask(task)"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <title>trash the task</title>
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <p
                            v-html="task.details"
                            tabindex="0"
                            class="focus:outline-none text-sm py-4 text-gray-600"
                        ></p>
                        <div
                            tabindex="0"
                            class="focus:outline-none flex"
                            @click="openTask(task)"
                        >
                            <div
                                class="py-2 px-4 text-xs leading-3 text-white cursor-pointer bg-indigo-400 rounded-full"
                            >
                                Edit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <section class="mt-9 pb-10 flex justify-center">
                    <img
                        height="300"
                        width="500"
                        class="ml-64"
                        src="@/assets/logos/void.svg"
                    />
                </section>
                <h2 class="text-center pl-48 font-mono text-red-300">
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
import PopUpMessage from "@/views/shared/Alert.vue";
import BreadCrumbs from "@/views/shared/BreadCrumbs.vue";
import ConfirmationModal from "@/views/shared/Confirmation.vue";
import Pagination from "@/views/shared/Pagination.vue";
import Editor from "@tinymce/tinymce-vue";
import AssignmentPopOver from "./PopOver.vue";
export default {
    name: "SingleAssignment",
    components: {
        Editor,
        AssignmentPopOver,
        PopUpMessage,
        Pagination,
        ConfirmationModal,
        BreadCrumbs,
    },
    data() {
        return {
            assignmentID: this.$route.params.ID,
            showConfirmation: false,
            newtTask: {
                title: "",
                details: "",
            },
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
            singleAssignment: {},
            tasks: [],
            singleTask: {},
            showTask: false,
            crumbs: ["Dashboard", "Assignment", "Task"],
            toolbar:
                "undo redo | bold italic underline strikethrough | image media fileupload | alignleft aligncenter alignright alignjustify |  numlist bullist | fontselect fontsizeselect formatselect paste pastetext | outdent indent | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | link anchor codesample | ltr rtl | code",
            plugins:
                "print preview paste  importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons code",
            init: {
                height: 350,
                skin: "",
                content_css: "",
                toolbar_mode: "sliding",
                image_caption: true,
                browser_spellcheck: true,
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                image_advtab: true,
                menubar: true,
                branding: false,
                block_unsupported_drop: false,
                paste_data_images: false,
                automatic_uploads: true,
                images_upload_credentials: true,
            },
        };
    },
    computed: {
        paginationLimit() {
            return store.state.paginationLimit;
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
        async assignTask() {
            const response = await teacherService.createTask(
                this.$route.params.ID,
                this.newtTask
            );
            this.getPaginatedTask(1, this.paginationLimit);
            if (response.status === 201) {
                this.alert.open = true;
                this.alert.message = "New task assigned successfully!";
                this.alert.status = "success";
                this.alert.color = "green";
            }
            setTimeout(() => {
                this.alert.open = false;
            }, 3000);
            this.newtTask.title = "";
            this.newtTask.details = "";
        },
        async getPaginatedTask(page, limit) {
            const response = await teacherService.getPaginatedTask(
                this.$route.params.ID,
                page,
                limit
            );
            console.log("Hello frompaginated task");
            this.tasks = response.data;
        },
        async getAssignment() {
            const response = await teacherService.getAssignment(
                this.$route.params.ID
            );
            this.singleAssignment = response.data;
            console.log("assignment", response.data);
        },
        async updateTask(task) {
            try {
                await teacherService.updateTask(task);
                this.alert.open = true;
                this.alert.message = "Task updated successfully!";
                this.alert.status = "success";
                this.alert.color = "green";
                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
            } catch (error) {
                this.alert.open = true;
                this.alert.message = "something went wrong, try again!";
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
            }
        },
        async deleteTask(task) {
            try {
                const response = await teacherService.deleteTask(task.id);
                const index = this.tasks.data.indexOf(task);
                if (index > -1) {
                    this.tasks.data.splice(index, 1); // 2nd parameter means remove one item only
                }
                if (response.status == 200) {
                    this.alert.open = true;
                    this.alert.message = "Task deleted successfully!";
                    this.alert.status = "success";
                    this.alert.color = "green";
                }
                this.closeModal();
                setTimeout(() => {
                    this.alert.open = false;
                    this.closeModal();
                }, 2000);
            } catch (error) {
                this.alert.open = true;
                this.alert.message = "something went wrong, try again!";
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                this.closeModal();
                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
            }
        },
        selected(crumb) {
            if (crumb == "Assignment") {
                this.$router.go(-1);
            }

            console.log(crumb);
        },
        confirmTask(task) {
            this.showConfirmation = true;
            this.singleTask = task;
        },
        closeModal() {
            this.showConfirmation = false;
        },
        openTask(task) {
            this.showTask = true;
            this.singleTask = task;
            console.log({ task });
        },
        closePopUp() {
            this.showTask = false;
        },
        subStrText(str, limit = 20) {
            return str && str.length > limit
                ? str.substr(0, limit) + "..."
                : str;
        },
    },
};
</script>
