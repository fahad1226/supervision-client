<template>
    <div class="mx-auto container py-10 px-6">
        <TransitionRoot
            as="template"
            :show="openDetails"
            class="bg-gray-900 bg-opacity-50"
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
                            <div class="w-screen max-w-3xl z-100">
                                <div class="space-y-6 pb-5">
                                    <IdeaDetails
                                        :project="teamInfo.approved_project"
                                        @closePanel="closeProjectPanel"
                                    />
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <div v-if="!loading">
            <div v-show="Object.keys(teamInfo).length != 0">
                <div
                    v-if="teamInfo.approved_project"
                    aria-label="card 5"
                    tabindex="0"
                    class="focus:outline-none w-4/5 border border-gray-400 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 rounded-lg"
                >
                    <div
                        class="flex items-center border-b border-gray-200 pb-6"
                    >
                        <div class="flex items-start justify-between w-full">
                            <div class="pl-3 w-full">
                                <p
                                    tabindex="0"
                                    class="inline-flex focus:outline-none text-xl font-semibold text-gray-800"
                                >
                                    {{
                                        subStrText(
                                            teamInfo?.approved_project?.title,
                                            35
                                        )
                                    }}
                                </p>

                                <div class="float-right">
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
                                        class="text-gray-900 bg-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                    >
                                        Accepted idea
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <p
                            v-html="
                                subStrText(
                                    strip(teamInfo?.approved_project?.details),
                                    200
                                )
                            "
                            tabindex="0"
                            class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
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

                    <Disclosure
                        v-slot="{ open }"
                        v-if="teamInfo?.approved_project?.comment.length > 0"
                    >
                        <DisclosureButton
                            class="flex justify-between w-full mt-6 px-4 py-4 text-sm font-medium text-left text-gray-500 bg-gray-200 rounded-lg focus:outline-none focus-visible:ring-opacity-75"
                        >
                            <h2>Show Comments</h2>
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
                                <div
                                    class="flex pt-4"
                                    v-for="comment in teamInfo?.approved_project
                                        ?.comment"
                                    :key="comment"
                                >
                                    <div
                                        tabindex="0"
                                        class="focus:outline-none h-6 w-6 mb-4 lg:mb-0 mr-4"
                                    >
                                        <img
                                            :src="comment.avatar"
                                            class="h-full w-full rounded-full overflow-hidden shadow"
                                        />
                                    </div>
                                    <div
                                        class="rounded-lg w-full h-auto bg-gray-200"
                                    >
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
                            </DisclosurePanel>
                        </transition>
                    </Disclosure>
                </div>
                <div v-else>
                    <div class="flex 2xl:justify-center mt-8">
                        <img
                            src="@/assets/logos/no_ideas.svg"
                            height="350"
                            width="350"
                            alt=""
                        />
                    </div>
                    <div
                        class="container mx-auto font-semibold 2xl:text-center py-1 mt-2 pb-2 rounded-lg"
                    >
                        <h2 class="text-black font-mono 2xl:pl-8 text-3xl">
                            No ideas to show yet.
                        </h2>
                        <p
                            class="text-xs 2xl:ml-72 w-96 text-gray-700 md:pl-12 font-thin font-sansz"
                        >
                            Either your team didn't submit any project ideas or
                            your idea is yet to be accepted!
                        </p>
                    </div>
                </div>

                <PopOver
                    :status="showAssignment"
                    :assignment="singleAssignment"
                    @closePopUp="closePopUp"
                />
            </div>
        </div>
        <div v-else class="text-center">
            <div class="flex justify-center items-center">
                <div
                    class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Dialog,
    DialogOverlay,
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
import IdeaDetails from "./IdeaDetails.vue";
import PopOver from "./PopOver.vue";
export default {
    name: "StudentTask",
    props: ["loading", "teamInfo"],
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        Switch,
        TransitionChild,
        TransitionRoot,
        Dialog,
        DialogOverlay,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronUpIcon,
        PopOver,
        IdeaDetails,
    },
    data() {
        return {
            openDetails: false,
            showAssignment: false,
            singleAssignment: {},
        };
    },

    methods: {
        openAssignment(assignment) {
            this.showAssignment = true;
            this.singleAssignment = assignment;
            console.log("Hello from open ass", assignment);
        },
        closePopUp() {
            this.showAssignment = false;
        },
        closeProjectPanel() {
            this.openDetails = false;
        },
        // helper to truncate text
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
