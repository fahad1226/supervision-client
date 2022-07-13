<template>
    <TransitionRoot
        appear
        :show="open"
        as="template"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
        <div
            class="z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-mid"
        >
            <div
                class="max-w-sm w-full bg-white shadow-lg rounded-lg border border-gray-300 pointer-events-auto"
            >
                <div class="rounded-lg shadow-xs overflow-hidden">
                    <div class="p-4">
                        <div class="flex">
                            <img
                                class="w-8 h-8 rounded-full shadow-lg"
                                :src="user.user.image"
                            />
                            <div class="ml-3 text-sm font-normal">
                                <span
                                    class="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
                                    >{{ user.user.name }}</span
                                >
                                <div class="mb-2 text-sm font-normal">
                                    Hi
                                    <span class="font-bold">{{
                                        user.user.name
                                    }}</span
                                    >, your login was successful. Thanks for
                                    using the application.
                                </div>
                                <!-- <a
                                   
                                    class="inline-flex px-5 py-2 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                    >Welcome</a
                                > -->
                            </div>
                            <button
                                type="button"
                                @click="closeSnackbar"
                                class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                data-dismiss-target="#toast-message-cta"
                                aria-label="Close"
                            >
                                <span class="sr-only">Close</span>
                                <svg
                                    class="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TransitionRoot>
</template>

<script>
import { TransitionRoot } from "@headlessui/vue";
export default {
    name: "SnackBar",
    components: {
        TransitionRoot,
    },
    props: ["open", "user"],
    methods: {
        closeSnackbar() {
            this.$emit("closeSnackbar");
        },
    },
};
</script>
