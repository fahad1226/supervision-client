<template>
    <Alert
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
    />
    <TransitionRoot
        as="template"
        :show="openDetails"
        class="bg-gray-100 bg-opacity-50"
    >
        <Dialog
            as="div"
            static
            class="fixed inset-0 overflow-hidden"
            @close="openDetails = false"
            :open="openDetails"
        >
            <div class="absolute inset-0 overflow-hidden rounded-lg">
                <DialogOverlay class="absolute inset-0" />

                <div
                    class="fixed inset-y-0 top-0 bottom-0 right-0 max-w-full flex"
                >
                    <TransitionChild
                        as="template"
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="translate-x-full"
                        enter-to="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leave-from="translate-x-0"
                        leave-to="translate-x-full"
                    >
                        <div class="w-screen max-w-3xl z-50">
                            <div class="space-y-6 pb-5">
                                <IdeaDetails
                                    :project="teamInfo"
                                    @closePanel="closeProjectPanel"
                                />
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <div class="sm:mx-8 xl:container xl:mx-auto my-2 bg-opacity-100">
        <h1 class="text-3xl text-center text-yellow-700">Group Section</h1>
        <BreadCrumbs :crumbs="crumbs" @selected="selected" />
        <div class="grid grid-rows-1">
            <div class="grid grid-cols-3">
                <div class="col-start-1 col-span-2 mt-4 gap-4">
                    <div
                        v-if="!loading"
                        aria-label="card 5"
                        tabindex="0"
                        class="focus:outline-none xl:w-11/12 md:w-11/12 bg-white p-6 shadow rounded-lg border border-gray-300"
                    >
                        <div
                            class="flex items-center border-b border-gray-200 pb-6"
                        >
                            <div
                                class="flex items-start justify-between w-full"
                            >
                                <div class="w-full">
                                    <p
                                        tabindex="0"
                                        class="inline-flex focus:outline-none text-xl font-bold font-mono text-gray-800"
                                    >
                                        {{ subStrText(teamInfo.title, 30) }}
                                    </p>

                                    <div class="float-right">
                                        <Toggle
                                            v-model="teamInfo.completed_status"
                                            @click="
                                                updateProjectStatus(teamInfo)
                                            "
                                            class="toggle-width toggle-height"
                                            :classes="{
                                                container: 'py-3',
                                            }"
                                            on-label="Done"
                                            off-label="Open"
                                            labelledby="toggle-label"
                                            describedby="toggle-description"
                                        />
                                    </div>

                                    <div
                                        class="focus:outline-none flex mr-2 mt-2"
                                    >
                                        <div
                                            v-for="tag in teamInfo.tag"
                                            :key="tag"
                                            class="py-1 px-4 text-xs ml-1 font-semibold text-indigo-700 rounded-full bg-indigo-100"
                                        >
                                            #{{ tag.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-2">
                            <p
                                tabindex="0"
                                v-html="
                                    subStrText(strip(teamInfo.details), 250)
                                "
                                class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800"
                            ></p>
                            <div
                                tabindex="0"
                                class="focus:outline-none flex"
                                @click="openDetails = true"
                            >
                                <div
                                    class="py-2 cursor-pointer ml-2 px-4 text-xs leading-3 text-gray-800 font-semibold border border-gray-400 rounded-lg bg-indigo-100"
                                >
                                    See full
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="flex justify-center items-center">
                        <div
                            class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
                        ></div>
                    </div>

                    <h2
                        class="text-xl font-mono font-bold pt-4"
                        @click="openModal = true"
                    >
                        Create Assignments
                    </h2>

                    <div class="flex mt-4 pb-4">
                        <input
                            v-model="task.title"
                            class="border border-gray-400 rounded-lg xl:w-11/12 md:w-11/12 py-2 px-3 mr-6 text-grey-darker"
                            placeholder="Assignment title"
                        />
                    </div>
           
                    <div class="mt-4 xl:w-11/12 md:w-11/12 h-auto">
                        <editor
                            api-key="kugqzag6sf0jxnetl94v542ompov15bixo47unpcy0jafwr3"
                            :init="init"
                            :plugins="plugins"
                            :toolbar="toolbar"
                            v-model="task.details"
                            placeholder="Describe the
                        assignment to the students."
                        />
                    </div>

                    <div class="mt-4">
                        <button
                            @click="createAssignment"
                            class="bg-transparent hover:bg-blue-500 text-center text-blue-700 font-semibold hover:text-white py-2 w-56 border border-blue-500 hover:border-transparent rounded"
                        >
                            Submit
                        </button>
                    </div>

                    <AssignmentPopOver
                        :status="showTask"
                        :assignment="singleAssignment"
                        @closePopUp="closePopUp"
                    />

                    <ConfirmationModal
                        :status="showConfirmation"
                        :assignment="deltesingleAsgnmnt"
                        @deleteAssignment="deleteAssignment"
                        :closeModal="closeModal"
                    />

                    <EditAssignment
                        :status="showAssignment"
                        :assignment="singleAssignment"
                        @updateAssignment="updateAssignment"
                        @closeAssignment="closeAssignment"
                    />
                </div>

                <div>
                    <div class="ml-8">
                        <h1 class="text-xl font-mono text-gray-700 font-bold">
                            Team members
                        </h1>

                        <hr />

                        <ul class="mt-4">
                            <li
                                v-for="member in teamInfo.team_member"
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
                        <div class="pt-10">
                            <h2 class="text-xl font-bold font-mono">
                                <span class="text-red-300">
                                    Schedule a meeting
                                </span>
                                with the team
                            </h2>

                            <hr />

                            <div class="mt-4 flex flex-col w-full">
                                <textarea
                                    id="about"
                                    v-model="meet.details"
                                    required
                                    class="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                    placeholder="Send information about the meeting to students"
                                    rows="5"
                                ></textarea>
                                <p
                                    class="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400"
                                >
                                    Character Limit: 200
                                </p>
                            </div>

                            <div class="mt-4 flex flex-col w-full">
                                <input
                                    type="date"
                                    id="date"
                                    v-model="meet.schedule"
                                    required
                                    class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                    placeholder="@example"
                                />
                            </div>
                            <button
                                @click.prevent="scheduleMeet"
                                class="mt-4 justify-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                                Send
                            </button>
                        </div>

                        <div class="pt-6">
                            <h2
                                class="text-xl font-mono text-gray-700 font-bold"
                            >
                                Meeting history
                            </h2>

                            <hr />

                            <Disclosure v-slot="{ open }">
                                <DisclosureButton
                                    class="flex justify-between mt-4 w-full px-4 py-4 text-sm font-medium text-left text-gray-500 bg-gray-200 rounded-lg focus:outline-none focus-visible:ring-opacity-75"
                                >
                                    Meetings
                                    <ChevronUpIcon
                                        :class="
                                            open ? 'transform rotate-180' : ''
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
                                        <div>
                                            <div
                                                class="w-full pt-2 rounded-2xl"
                                                v-for="meeting in prevMeeting"
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
                                                            {{
                                                                meeting.details
                                                            }}
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
        </div>

        <h1
            class="text-xl font-semibold border border-gray-400 mt-6 text-center rounded-lg mb-2 p-2 w-48"
        >
            Assignment List
            <span>
                <span class="text-indigo-500 ml-2 font-bold">{{
                    assignments?.data?.length
                }}</span>
            </span>
        </h1>
        <div class="grid grid-cols-2">
            <div
                v-for="assignment in assignments.data"
                :key="assignment"
                aria-label="card 2"
                tabindex="0"
                class="mt-2 focus:outline-none lg:mr-7 bg-white p-3 border border-gray-300 rounded"
            >
                <div class="flex items-center border-b border-gray-200">
                    <div class="flex items-start justify-between w-full">
                        <div class="pl-3 w-full">
                            <h3
                                @click="
                                    this.$router.push({
                                        name: 'assignment',
                                        params: { ID: assignment.id },
                                    })
                                "
                                class="p-2 font-serif inline-flex cursor-pointer rounded-lg items-center mb-1 text-lg font-bold text-gray-900 dark:text-white"
                                :class="assignment.status ? 'line-through' : ''"
                            >
                                {{ subStrText(assignment.title, 30) }}
                            </h3>

                            <div class="inline-flex">
                                <div v-if="assignment.status" class="pr-4">
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
                            </div>

                            <div class="-mt-6 float-right">
                                <div
                                    class="inline-flex justify-center w-40 mt-4"
                                >
                                    <Listbox>
                                        <div class="relative pl-2">
                                            <ListboxButton
                                                class="relative rounded-md w-6 py-1 pl-24 text-left bg-transparent cursor-default focus:outline-none"
                                            >
                                                <span
                                                    class="font-bold -mt-20 text-xl cursor-pointer"
                                                    >...</span
                                                >
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
                                                    class="absolute ml-12 w-20 origin-top-right bg-white divide-y divide-gray-100 rounded-md border border-gray-300"
                                                >
                                                    <ListboxOption
                                                        class="cursor-pointer"
                                                        as="template"
                                                    >
                                                        <li
                                                            @click.prevent="
                                                                openAssignment(
                                                                    assignment
                                                                )
                                                            "
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
                                                        class="cursor-pointer"
                                                        as="template"
                                                    >
                                                        <li
                                                            @click.prevent="
                                                                processConfirmation(
                                                                    assignment
                                                                )
                                                            "
                                                            class="inline-flex cursor-default select-none relative py-2 px-6 pl-2 pr-4"
                                                        >
                                                            <span
                                                                @click.prevent="
                                                                    processConfirmation(
                                                                        assignment
                                                                    )
                                                                "
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
                                <time
                                    class="block mb-2 ml-5 -mt-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                                >
                                    {{ assignment.assigned_at }}</time
                                >
                            </div>

                            <div>
                                <label id="toggle-label"
                                    >Mark as complete</label
                                >
                                <Toggle
                                    v-model="assignment.status"
                                    @click="updateAssignment(assignment)"
                                    class="toggle-width toggle-height"
                                    :classes="{
                                        container: 'py-3',
                                    }"
                                    on-label="Done"
                                    off-label="Open"
                                    labelledby="toggle-label"
                                    describedby="toggle-description"
                                />
                                <small id="toggle-description"
                                    >Turn this on if you'd like to mark the
                                    assignment as completed!
                                </small>
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

        <div v-if="assignments?.meta?.total > 4">
            <Pagination
                :meta="assignments.meta"
                @getPage="paginateAssignments"
            />
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import IdeaDetails from "@/views/dashboard/students/IdeaDetails.vue";
import Alert from "@/views/shared/Alert.vue";
import ConfirmationModal from "@/views/shared/Confirmation.vue";
import EditAssignment from "@/views/shared/EditAssignment.vue";
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
    Switch,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import Editor from "@tinymce/tinymce-vue";
import Toggle from "@vueform/toggle";
import moment from "moment";
import BreadCrumbs from "../../shared/BreadCrumbs.vue";
import Pagination from "../../shared/Pagination.vue";
import AssignmentPopOver from "./PopOver.vue";
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
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        ChevronUpIcon,
        AssignmentPopOver,
        Switch,
        Editor,
        ConfirmationModal,
        EditAssignment,
        Alert,
        BreadCrumbs,
        Pagination,
        IdeaDetails,
        Toggle,
    },
    data() {
        return {
            loading: true,
            openDetails: false,
            toggleActive: false,
            task: {
                project_id: this.$route.params.projectId,
                title: "",
                details: "",
            },
            showConfirmation: false,
            meet: {
                project_id: this.$route.params.projectId,
                details: "",
                schedule: "",
            },
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
            teamInfo: [],
            assignments: [],
            prevMeeting: [],
            singleAssignment: {},
            deltesingleAsgnmnt: {},
            show: false,
            enabled: true,
            showTask: false,
            openModal: false,
            showAssignment: false,
            crumbs: ["Dashboard", "Assignment"],
            toolbar:
                "undo redo | bold italic underline strikethrough | image media fileupload | alignleft aligncenter alignright alignjustify |  numlist bullist | fontselect fontsizeselect formatselect paste pastetext | outdent indent | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | link anchor codesample | ltr rtl | code",
            plugins:
                "print preview paste  importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap emoticons code",
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
    watch: {
        paginationLimit() {
            this.paginateAssignments(1, this.paginationLimit);
        },
    },
    computed: {
        paginationLimit() {
            return store.state.paginationLimit;
        },
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        this.getTeamInfo();
        this.allMeetings();
        this.paginateAssignments(1, this.paginationLimit);
    },
    methods: {
        async createAssignment() {
            const response = await teacherService.createAssignment(this.task);
            this.task.title = "";
            this.task.details = "";
            this.paginateAssignments(1, this.paginationLimit);
        },
        async getTeamInfo() {
            try {
                const response = await teacherService.getTeamInfo(
                    this.$route.params.projectId
                );
                this.teamInfo = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async paginateAssignments(page, limit) {
            const response = await teacherService.getPaginateAssignments(
                this.$route.params.projectId,
                page,
                limit
            );
            this.assignments = response.data;
        },
        async scheduleMeet() {
            try {
                await teacherService.scheduleMeet(this.meet);
                this.meet.details = "";
                this.alert.open = true;
                this.alert.message = "Meeting Scheduled!";
                this.alert.status = "success";
                this.alert.color = "green";
                this.allMeetings();
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

        async updateProjectStatus(project) {
            if (!project.completed_status) {
                await teacherService.updateProjectStatus(project.id, {
                    status: 1,
                });
            } else {
                await teacherService.updateProjectStatus(project.id, {
                    status: 3,
                });
            }
        },
        openAssignment(assignment) {
            this.showAssignment = true;
            this.singleAssignment = assignment;
        },
        processConfirmation(assignment) {
            this.showConfirmation = true;
            this.deltesingleAsgnmnt = assignment;
        },
        closePopUp() {
            this.showTask = false;
        },
        selected(crumb) {
            if (crumb == "Dashboard") {
                this.$router.push("/teachers/section");
            }
        },

        async allMeetings() {
            const { data } = await teacherService.getAllMeetings(
                this.$route.params.projectId
            );
            this.prevMeeting = data.data;
        },
        async deleteAssignment(assignment) {
            const response = await teacherService.deleteAssignment(
                assignment.id
            );
            const index = this.assignments.data.indexOf(assignment);
            if (index > -1) {
                this.assignments.data.splice(index, 1); // 2nd parameter means remove one item only
            }
            if (response.status == 200) {
                this.alert.open = true;
                this.alert.message = "Assignment Deleted!";
                this.alert.status = "success";
                this.alert.color = "green";
            }

            this.closeModal();
            setTimeout(() => {
                this.alert.open = false;
            }, 2000);
        },
        async updateAssignment(assignment) {
            this.toggleActive = !this.toggleActive;
            console.log("Hell", assignment.status);
            try {
                const response = await teacherService.updateAssignment({
                    id: assignment.id,
                    project_id: Number(this.$route.params.projectId),
                    title: assignment.title,
                    status: assignment.status ? 1 : 0,
                    details: assignment.details,
                });
                this.paginateAssignments(1, 4);
                if (response.status == 200) {
                    this.alert.open = true;
                    this.alert.message = "Assignment updated successfully!";
                    this.alert.status = "success";
                    this.alert.color = "green";
                }
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
        closeModal() {
            this.showConfirmation = false;
        },
        closeAssignment() {
            this.showAssignment = false;
        },
        closeProjectPanel() {
            this.openDetails = false;
        },

        subStrText(str, limit = 20) {
            return str && str.length > limit
                ? str.substr(0, limit) + "..."
                : str;
        },
        strip(html) {
            let doc = new DOMParser().parseFromString(html, "text/html");
            return doc.body.textContent || "";
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
