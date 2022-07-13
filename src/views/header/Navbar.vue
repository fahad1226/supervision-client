<template>
    <TransitionRoot
        as="template"
        :show="open"
        class="bg-gray-100 bg-opacity-50"
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

                <div
                    class="fixed inset-y-0 top-6 bottom-14 right-0 max-w-full flex"
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
                        <div
                            class="w-screen overflow-y-auto rounded-xl max-w-lg z-100"
                        >
                            <form
                                class="h-full flex flex-col bg-white shadow-xl"
                            >
                                <div class="flex-1">
                                    <Notifications />
                                </div>
                            </form>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <nav class="bg-white shadow">
        <div class="mx-auto container px-6 xl:py-0">
            <div class="flex items-center justify-between">
                <div
                    @click="this.$router.push('/')"
                    class="flex w-full sm:w-auto justify-start cursor-pointer"
                >
                    <div class="flex items-center">
                        <svg
                            aria-label="Home"
                            id="logo"
                            enable-background="new 0 0 300 300"
                            height="44"
                            viewBox="0 0 300 300"
                            width="43"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <g>
                                <path
                                    fill="#4c51bf"
                                    d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                />
                            </g>
                        </svg>

                        <h2
                            class="sm:block text-base text-gray-700 font-bold leading-normal pl-3"
                        >
                            PUC Supervision
                        </h2>
                    </div>
                </div>

                <div class="flex">
                    <div class="flex md:mr-6 xl:mr-16">
                        <a
                            v-if="this.$store.state.role == 2"
                            @click="
                                this.$router.push({ name: 'studentDashboard' })
                            "
                            class="flex cursor-pointer px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <span class="mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                                    />
                                </svg>
                            </span>
                            Dashboard
                        </a>
                        <a
                            v-else
                            @click="
                                this.$router.push({ name: 'teachersSection' })
                            "
                            class="flex cursor-pointer px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <span class="mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                                    />
                                </svg>
                            </span>
                            Dashboard
                        </a>

                        <router-link
                            v-if="this.$store.state.role == 2"
                            :to="{
                                name: 'studentSection',
                                params: { groupId: 123 },
                            }"
                            class="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <span class="mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-compass"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline
                                        points="8 16 10 10 16 8 14 14 8 16"
                                    />
                                    <circle cx="12" cy="12" r="9" />
                                </svg>
                            </span>
                            Your Section
                        </router-link>

                        <router-link
                            v-else
                            :to="{ name: 'TeamLists' }"
                            class="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <span class="mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                    />
                                </svg>
                            </span>
                            All groups
                        </router-link>
                    </div>
                    <div
                        @click="open = true"
                        class="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle hidden-arrow flex items-center"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="bell"
                            class="h-6 w-6"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                            ></path>
                        </svg>
                        <span
                            class="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5"
                            >1</span
                        >
                    </div>

                    <div class="hidden xl:flex items-center">
                        <div class="ml-6 relative">
                            <Menu
                                as="div"
                                class="relative inline-block text-left"
                            >
                                <div>
                                    <MenuButton>
                                        <div
                                            class="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                                        >
                                            <img
                                                class="rounded-full h-10 w-10 object-cover"
                                                :src="profilePhoto"
                                                alt="logo"
                                            />
                                        </div>
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                        class="absolute right-4 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div
                                            class="px-1 py-1"
                                            @click="
                                                this.$router.push({
                                                    name: 'profile',
                                                })
                                            "
                                        >
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    :class="[
                                                        active
                                                            ? 'bg-violet-500 text-indigo-700'
                                                            : 'text-gray-900',
                                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                    ]"
                                                >
                                                    <div>
                                                        <img
                                                            height="25"
                                                            width="25"
                                                            src="@/assets/logos/profile.svg"
                                                        />
                                                    </div>
                                                    <span
                                                        class="font-mono pl-3 font-semibold"
                                                        >Profile</span
                                                    >
                                                </button>
                                            </MenuItem>
                                        </div>

                                        <div
                                            class="px-1 py-1"
                                            @click.prevent="logout"
                                        >
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    :class="[
                                                        active
                                                            ? 'bg-violet-500 text-indigo-700'
                                                            : 'text-gray-900',
                                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                    ]"
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
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span
                                                        class="pl-2 font-mono font-semibold"
                                                        >Logout</span
                                                    >
                                                </button>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
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
import Notifications from "../shared/Notifications.vue";
export default {
    name: "LightWithButton",
    components: {
        Notifications,
        Dialog,
        DialogOverlay,
        DialogTitle,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
    },
    data() {
        return {
            open: false,
            show: null,
        };
    },

    computed: {
        profilePhoto() {
            return this.$store.state.avatar;
        },
        STUDENT_ROLE() {
            return 2;
        },
        SUPERVISOR_ROLE() {
            return 1;
        },
    },
    methods: {
        logout() {
            store.dispatch("logout");
        },
    },
};
</script>
