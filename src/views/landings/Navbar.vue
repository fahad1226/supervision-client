<template>
    <body class="overflow-y-hidden" style="min-height: 80px">
        <div class="2xl:mx-auto">
            <div class="bg-white rounded border border-gray-300 py-5 px-7">
                <nav class="flex justify-center">
                    <div
                        class="flex items-center space-x-3 lg:pr-16 pr-6"
                        @click.prevent="this.$router.push('/')"
                    >
                        <img
                            class="cursor-pointer"
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg"
                            alt="circle"
                        />
                        <h2
                            class="text-lg font-semibold font-mono leading-6 text-gray-800 cursor-pointer"
                        >
                            Supervision
                        </h2>
                    </div>

                    <!-- For medium and plus sized devices -->
                    <ul class="hidden md:flex flex--1 space-x-2">
                        <li
                            @click.prevent="
                                this.$router.push({ name: 'studentDashboard' })
                            "
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                            :class="
                                $route.name === 'SignUp'
                                    ? 'bg-blue-700 text-white'
                                    : ''
                            "
                        >
                            Public Ideas
                        </li>

                        <!-- <li
                            @click.prevent="
                                this.$router.push({
                                    name: 'teachersSection',
                                })
                            "
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                            :class="
                                $route.name === 'SignUp'
                                    ? 'bg-blue-700 text-white'
                                    : ''
                            "
                        >
                            Dashboard
                        </li> -->

                        <li
                            @click.prevent="this.$router.push('/feature')"
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                            :class="
                                $route.name === 'Feature'
                                    ? 'bg-blue-700 text-white'
                                    : ''
                            "
                        >
                            Feature
                        </li>

                        <li
                            @click.prevent="this.$router.push('/about')"
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                            :class="
                                $route.name === 'About'
                                    ? 'bg-blue-700 text-white'
                                    : ''
                            "
                        >
                            About
                        </li>

                        <li
                            v-if="!this.$store.state.isLoggedIn"
                            @click.prevent="this.$router.push('/login')"
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                            :class="
                                $route.name === 'Login'
                                    ? 'bg-blue-700 text-white'
                                    : ''
                            "
                        >
                            Login
                        </li>
                        <li
                            v-else
                            @click="logout"
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                        >
                            Logout
                        </li>
                    </ul>
                </nav>
                <!-- for smaller devcies -->

                <div class="block md:hidden w-full mt-5">
                    <div
                        class="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
                    >
                        <div class="flex space-x-2">
                            <span
                                id="s1"
                                class="font-semibold text-sm leading-3 hidden"
                                >Selected:</span
                            >
                            <p
                                id="textClicked"
                                class="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer"
                            >
                                Collections
                            </p>
                        </div>
                        <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg4.svg"
                            alt="down arrow"
                        />
                    </div>
                    <div class="relative">
                        <ul
                            id="list"
                            class="hidden font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md"
                        >
                            <li
                                class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                Arts
                            </li>
                            <li
                                class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                Space
                            </li>
                            <li
                                class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                Game
                            </li>
                            <li
                                class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                Utility
                            </li>
                            <li
                                class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                Cards
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    name: "LandingsNav",
    data() {
        return {};
    },
    computed: {
        STUDENT_ROLE() {
            return 2;
        },
    },
    methods: {
        logout() {
            store.dispatch("logout");
        },
    },
};
</script>
