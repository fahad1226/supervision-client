<template>
    <TransitionRoot as="template" :show="status">
        <Dialog
            as="div"
            auto-reopen="true"
            class="fixed z-10 h-full inset-0 overflow-y-auto"
            @close="closePopUp"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-2/4 sm:p-6"
                    >
                        <div>
                            <div class="mt-3 sm:mt-5">
                                <input
                                    id="title"
                                    v-model="assignment.title"
                                    class="border border-gray-400 w-2/4 rounded py-2 px-3 mr-6 text-grey-darker"
                                />

                                <div class="inline-flex float-right">
                                    <Listbox v-model="assignment.status">
                                        <div>
                                            <ListboxButton
                                                class="relative w-48 rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-gray-400 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                            >
                                                <!-- primaryData.status || 'Select status' -->
                                                <span class="block truncate">{{
                                                    statusName == "undefined"
                                                        ? "Select status"
                                                        : statusName.name
                                                }}</span>
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
                                                    class="absolute z-50 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <ListboxOption
                                                        class="hover:bg-gray-100 cursor-pointer"
                                                        as="template"
                                                        v-for="status in statusList"
                                                        :key="status.value"
                                                        :value="status.value"
                                                    >
                                                        <li
                                                            class="cursor-default select-none relative py-2 pl-10 pr-4"
                                                        >
                                                            <span
                                                                class="block truncate"
                                                                >{{
                                                                    status.name
                                                                }}</span
                                                            >
                                                            <span
                                                                v-if="
                                                                    assignment.status ==
                                                                    status.value
                                                                "
                                                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                                            >
                                                                <CheckIcon
                                                                    class="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </li>
                                                    </ListboxOption>
                                                </ListboxOptions>
                                            </Transition>
                                        </div>
                                    </Listbox>

                                    <button
                                        @click.prevent="updateTask(assignment)"
                                        type="button"
                                        class="text-dark ml-3 bg-white border border-gray-400 focus:outline-none hover:bg-gray-100 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Update
                                    </button>

                                    <div
                                        @click.prevent="closePopUp"
                                        class="cursor-pointer pt-1 pl-2"
                                    >
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
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="mt-6 h-auto">
                                    <editor
                                        api-key="kugqzag6sf0jxnetl94v542ompov15bixo47unpcy0jafwr3"
                                        :init="init"
                                        :plugins="plugins"
                                        :toolbar="toolbar"
                                        v-model="assignment.details"
                                        placeholder="Describe the assignment to the students."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/outline";
import Editor from "@tinymce/tinymce-vue";
export default {
    name: "ConfirmationModal",
    props: ["status", "assignment"],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
        ChevronDownIcon,
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Editor,
    },
    data() {
        return {
            showDropdown: false,
            taskStatus: "",
            statusList: [
                {
                    value: 1,
                    name: "Completed",
                },
                {
                    value: 2,
                    name: "Incomplete",
                },
            ],
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
    computed: {
        statusName() {
            return (
                this.statusList.find(
                    (currentValue) =>
                        currentValue.value === this.assignment.status
                ) || "undefined"
            );
        },
    },
    methods: {
        updateTask(task) {
            this.$emit("updateTask", task);
            console.log("updated task", task);
        },
        closePopUp() {
            this.$emit("closePopUp", false);
        },
    },
};
</script>
