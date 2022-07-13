<template>
    <Navbar />
    <div class="mx-auto container">
        <div class="container mx-auto">
            <div class="flex justify-center mt-2">
                <div
                    class="flex justify-center border border-gray-400 bg-gray-300 w-4/12 rounded-lg"
                >
                    <h1
                        class="text-lg font-semibold text-center font-mono rounded-lg mt-1 py-2 text-gray-600"
                    >
                        {{ idea.team_name }}
                    </h1>
                    <div class="pt-3 pl-3">
                        <img
                            height="30"
                            width="30"
                            src="@/assets/logos/team.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <!-- 
        <div class="pl-8 mt-4">
            <BreadCrumbs :crumbs="crumbs" @selected="selected" />
        </div> -->

            <div class="grid grid-rows-1 pt-4">
                <div class="grid grid-cols-3">
                    <div class="col-start-1 col-span-2">
                        <div class="-mt-8">
                            <div class="mx-auto container py-10 px-6">
                                <div>
                                    <div
                                        aria-label="card 5"
                                        tabindex="0"
                                        class="focus:outline-none w-full border border-gray-400 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 rounded-lg"
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
                                                        class="inline-flex focus:outline-none text-2xl font-bold font-mono leading-5 text-gray-800"
                                                    >
                                                        {{ idea.title }}
                                                    </p>
                                                    <div
                                                        tabindex="0"
                                                        class="mt-4 flex"
                                                    >
                                                        <div
                                                            v-for="tag in idea.tag"
                                                            :key="tag"
                                                            class="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100"
                                                        >
                                                            #{{ tag.name }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="px-2">
                                            <p
                                                v-html="idea.details"
                                                tabindex="0"
                                                class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                                            ></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 ml-28">
                        <div class="mt-6">
                            <h1 class="text-xl font-mono font-bold">
                                Team members
                            </h1>
                        </div>

                        <ul class="mt-2">
                            <li
                                v-for="member in idea.team_member"
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
                    </div>
                </div>
            </div>

            <div class="h-32"></div>
        </div>
    </div>
</template>

<script>
import userService from "@/config/services/userService";
import Navbar from "@/views/header/Navbar.vue";
import {
    Dialog,
    DialogOverlay,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/vue";
export default {
    name: "Idea",
    components: {
        Dialog,
        DialogOverlay,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Navbar,
    },
    data() {
        return {
            idea: {},
        };
    },
    mounted() {
        this.getPublicIdea();
    },
    methods: {
        async getPublicIdea() {
            try {
                const response = await userService.getPublicIdea(
                    this.$route.params.ID
                );
                this.idea = response.data;
            } catch (error) {
                if (error.response.status == 401) {
                    this.$router.push("/login");
                }
            }
        },
    },
};
</script>
