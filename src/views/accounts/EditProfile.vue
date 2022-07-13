<template>
    <TransitionRoot as="template" :show="true">
        <Dialog
            as="div"
            auto-reopen="true"
            class="fixed z-10 h-full inset-0 overflow-y-auto"
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
                                <div class="mt-6 h-auto">
                                    <div class="mt-5 md:mt-0 md:col-span-2">
                                        <form
                                            enctype="multipart/form-data"
                                        >
                                            <div
                                                class="shadow sm:rounded-md sm:overflow-hidden"
                                            >
                                                <div
                                                    class="px-4 py-5 bg-white sm:p-6"
                                                >
                                                    <div
                                                        class="grid grid-cols-6 gap-6"
                                                    >
                                                        <div
                                                            class="col-span-6 sm:col-span-3"
                                                        >
                                                            <label
                                                                for="first_name"
                                                                class="block text-sm font-medium leading-5 text-gray-700"
                                                                >Your name
                                                            </label>
                                                            <input
                                                                :maxlength="12"
                                                                id="first_name"
                                                                class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div
                                                            class="col-span-6 sm:col-span-3"
                                                        >
                                                            <label
                                                                for="email_address"
                                                                class="block text-sm font-medium leading-5 text-gray-700"
                                                                >ID
                                                            </label>
                                                            <input
                                                                readonly
                                                                :maxlength="50"
                                                                id="email_address"
                                                                class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div
                                                            class="col-span-6 sm:col-span-3"
                                                        >
                                                            <label
                                                                for="email_address"
                                                                class="block text-sm font-medium leading-5 text-gray-700"
                                                                >Email address
                                                            </label>
                                                            <input
                                                                :maxlength="50"
                                                                id="email_address"
                                                                class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div
                                                            class="col-span-3 sm:col-span-3"
                                                        >
                                                            <label
                                                                for="twitter_link"
                                                                class="block text-sm font-medium leading-5 text-gray-700"
                                                            >
                                                                Contact
                                                            </label>
                                                            <div
                                                                class="pt-2 flex rounded-md shadow-sm"
                                                            >
                                                                <input
                                                                    :maxlength="
                                                                        17
                                                                    "
                                                                    id="twitter_link"
                                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="+880"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="mt-8 px-4 py-3 text-right sm:px-6"
                                                    >
                                                        <button
                                                            class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
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
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/outline";
export default {
    name: "ConfirmationModal",
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
        ChevronDownIcon,
    },
    data() {
        return {};
    },
};
</script>
