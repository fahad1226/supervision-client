<template>
    <div
        class="container mx-auto font-bold text-center py-1 mt-2 pb-2 rounded-lg bg-indigo-500"
    >
        <h2 class="text-white font-mono text-3xl">Open Ideas</h2>
        <p class="text-xs text-white font-thin font-sansz">
            list of projects that are completed by the previous batch students
            and made them open for everyone.
        </p>
    </div>

    <div class="lg:flex items-center justify-cente lg:px-0 px-4">
        <div
            aria-label="group of cards"
            tabindex="0"
            class="focus:outline-none py-8 w-full"
        >
            <div
                class="container mx-auto grid grid-cols-2 gap-4 w-full mt-7"
                v-if="ideas.length"
            >
                <div
                    v-for="idea in ideas"
                    :key="idea"
                    aria-label="card 5"
                    tabindex="0"
                    class="focus:outline-none lg:w-full border border-gray-300 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded"
                >
                    <div
                        class="flex items-center border-b border-gray-200 pb-6"
                    >
                        <div class="flex items-start justify-between w-full">
                            <div class="w-full">
                                <p
                                    @click="
                                        this.$router.push({
                                            name: 'public-idea',
                                            params: { ID: idea.id },
                                        })
                                    "
                                    tabindex="0"
                                    class="focus:outline-none text-xl font-medium leading-5 text-gray-800"
                                >
                                    {{ idea.title }}
                                </p>
                                <div tabindex="0" class="mt-4 flex">
                                    <div
                                        v-for="tag in idea.tag"
                                        :key="tag"
                                        class="py-2 px-4 text-xs ml-2 font-semibold text-indigo-700 rounded-full bg-indigo-100"
                                    >
                                        #{{ tag.name }}
                                    </div>
                                </div>
                            </div>
                            <span class="text-xs pl-4 w-24">
                                {{ idea.created_at }}
                            </span>
                        </div>
                    </div>
                    <div class="px-2">
                        <p
                            v-html="subStrText(idea.details, 550)"
                            tabindex="0"
                            class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                        ></p>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="flex 2xl:justify-center mt-8">
                    <img
                        src="@/assets/images/no_open_ideas.svg"
                        height="400"
                        width="500"
                        alt=""
                    />
                </div>
                <div
                    class="container mx-auto font-semibold 2xl:text-center py-1 mt-2 pb-2 rounded-lg"
                >
                    <h2
                        class="text-black font-thin font-mono 2xl:pl-8 text-2xl"
                    >
                        No public ideas to show yet.
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import studentService from "@/config/services/studentService";
export default {
    name: "StudentDashboard",
    data() {
        return {
            ideas: [],
        };
    },

    mounted() {
        this.getAllIdeas();
    },
    methods: {
        async getAllIdeas() {
            try {
                const response = await studentService.getPublicIdeas();
                this.ideas = response.data.data;
            } catch (er) {}
        },
        subStrText(str, limit = 20) {
            return str && str.length > limit
                ? str.substr(0, limit) + "..."
                : str;
        },
    },
};
</script>

<style>
.checkbox:checked + .check-icon {
    display: flex;
}
</style>
