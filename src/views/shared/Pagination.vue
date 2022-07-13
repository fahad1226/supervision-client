<template>
    <div class="px-4 py-3 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
            <a
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
                Previous
            </a>
            <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
                Next
            </a>
        </div>

        <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
            <div>
                <p class="text-sm text-gray-700">
                    Showing {{ " " }}
                    <span class="font-medium">{{ meta?.from }}</span>
                    {{ " " }} to {{ " " }}
                    <span class="font-medium">{{ meta?.to }}</span>
                    {{ " " }} of {{ " " }}
                    <span class="font-medium">{{ meta?.total }}</span>
                    {{ " " }} results
                </p>
            </div>

            <!-- PAGINATION LIMITS -->

            <div class="inline-flex justify-center w-40 mt-4">
                <Listbox v-model="this.$store.state.paginationLimit">
                    <span class="text-gray-500 py-1 font-bold">Show: </span>
                    <div class="relative pl-2">
                        <ListboxButton
                            class="relative rounded-md border border-gray-300 w-28 py-1 pl-3 pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                        >
                            <span class="block truncate">
                                {{ this.$store.state.paginationLimit }}
                                rows
                            </span>
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                            >
                                <SelectorIcon
                                    class="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
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
                                class="absolute w-28 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <ListboxOption
                                    class="hover:bg-gray-100 cursor-pointer"
                                    as="template"
                                    v-for="limit in paginationLists"
                                    :key="limit"
                                    :value="limit"
                                >
                                    <li
                                        class="cursor-default select-none relative py-1 pl-10 pr-4"
                                    >
                                        <span class="block truncate"
                                            >{{ limit }}
                                        </span>
                                        <span
                                            v-if="
                                                this.$store.state
                                                    .paginationLimit == limit
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
            </div>

            <div>
                <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <a
                        @click="
                            prevPage(meta, this.$store.state.paginationLimit)
                        "
                        class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span class="sr-only">Previous </span>
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </a>

                    <a
                        v-for="page in meta?.last_page"
                        :key="page"
                        @click="
                            getPage(page, this.$store.state.paginationLimit)
                        "
                        aria-current="page"
                        class="cursor-pointer bg-white border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:bg-gray-50"
                        :class="
                            meta.current_page == page
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : ' text-gray-500'
                        "
                    >
                        {{ page }}
                    </a>

                    <a
                        class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        @click="
                            nextPage(meta, this.$store.state.paginationLimit)
                        "
                    >
                        <span class="sr-only">Next</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </div>
    </div>
    <div class="h-32"></div>
</template>

<script>
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/vue";
import {
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SelectorIcon,
} from "@heroicons/vue/solid";
export default {
    components: {
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        ChevronLeftIcon,
        ChevronRightIcon,
        CheckIcon,
        SelectorIcon,
    },
    props: ["meta"],
    data() {
        return {
            paginationLists: [4, 8, 12],
        };
    },
    methods: {
        getPage(page, limit) {
            this.$emit("getPage", page, limit);
        },
        prevPage(meta, limit) {
            console.log("hejhd", meta);
            if (meta.current_page != 1) {
                this.$emit("getPage", meta.current_page - 1, limit);
            }
        },
        nextPage(meta, limit) {
            if (meta.current_page < meta.last_page) {
                this.$emit("getPage", meta.current_page + 1, limit);
            }
        },
    },
};
</script>
