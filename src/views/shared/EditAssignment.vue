<template>
    <TransitionRoot as="template" :show="status">
        <Dialog
            as="div"
            auto-reopen="true"
            class="fixed z-10 h-full inset-0 overflow-y-auto"
            @close="closeAssignment"
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
                        class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-2/3 2xl:w-3/6 sm:p-6"
                    >
                        <div>
                            <div class="mt-3 sm:mt-5">
                                <label for="title" class="font-thin font-mono"
                                    >Assignment title</label
                                >
                                <div>
                                    <input
                                        id="title"
                                        v-model="assignment.title"
                                        class="border border-gray-300 w-3/4 rounded py-2 px-3 mr-6 text-grey-darker"
                                    />
                                </div>

                                <div class="inline-flex -mt-10 float-right">
                                    <button
                                        @click="updateAssignment(assignment)"
                                        type="button"
                                        class="text-dark bg-white border border-gray-400 focus:outline-none hover:bg-gray-100 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2 ml-4 mr-8 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Update
                                    </button>

                                    <div
                                        @click.prevent="closeAssignment"
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
                                <div class="mt-4 h-auto"></div>
                            </div>
                            <label for="details" class="font-thin font-mono"
                                >Assignment details</label
                            >
                            <div id="details" class="mb-20 w-full">
                                <editor
                                    api-key="kugqzag6sf0jxnetl94v542ompov15bixo47unpcy0jafwr3"
                                    :init="init"
                                    :plugins="plugins"
                                    :toolbar="toolbar"
                                    v-model="assignment.details"
                                />
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
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/outline";
import Editor from "@tinymce/tinymce-vue";
export default {
    name: "EditAssignment",
    props: ["status", "assignment"],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
        ChevronDownIcon,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Editor,
    },
    data() {
        return {
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
    methods: {
        closeAssignment() {
            this.$emit("closeAssignment", false);
        },
        updateAssignment(assignment) {
            this.$emit("updateAssignment", assignment);
        },
    },
};
</script>
