<template>
    <div v-if="!loading">
        <div
            class="lg:flex items-center justify-cente lg:px-0 px-4"
            v-if="ideas?.length > 0"
        >
            <div
                aria-label="group of cards"
                tabindex="0"
                class="focus:outline-none py-8 w-full"
            >
                <div
                    class="container mx-auto grid grid-cols-2 gap-4 w-full mt-7"
                >
                    <div
                        v-for="idea in ideas"
                        :key="idea"
                        aria-label="card 5"
                        tabindex="0"
                        class="focus:outline-none lg:w-full border border-gray-300 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded"
                    >
                        <div class="flex items-center pb-6">
                            <div
                                class="flex items-start justify-between w-full"
                            >
                                <div class="pl-3 w-full">
                                    <p
                                        tabindex="0"
                                        class="focus:outline-none text-xl font-medium leading-5 text-gray-800"
                                    >
                                        {{ idea.title }}
                                    </p>
                                    <p
                                        tabindex="0"
                                        class="focus:outline-none text-xs font-semibold font-mono pt-2 text-gray-500"
                                    >
                                        {{ idea.created_at }}
                                    </p>
                                </div>

                                <div
                                    aria-label="bookmark"
                                    role="img"
                                    v-if="idea.status === 'accepted'"
                                >
                                    <button
                                        @click.prevent="rejectProposal(idea.id)"
                                        class="bg-yellow-500 border border-gray-400 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Reject
                                    </button>
                                </div>
                                <div aria-label="bookmark" role="img" v-else>
                                    <button
                                        @click.prevent="acceptProposal(idea.id)"
                                        class="bg-white hover:bg-gray-200 text-black border border-gray-400 font-semibold py-2 px-5 rounded-lg"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="px-2">
                            <p
                                v-html="idea.details"
                                tabindex="0"
                                class="focus:outline-none text-sm leading-5 py-4 text-gray-600"
                            ></p>
                            <div tabindex="0" class="focus:outline-none flex">
                                <div
                                    v-for="tag in idea.tag"
                                    :key="tag"
                                    class="py-2 ml-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100"
                                >
                                    #{{ tag.name }}
                                </div>
                            </div>
                        </div>

                        <div class="pt-5">
                            <div class="w-full ml-3">
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="comments.comment[idea.id]"
                                        @keyup.enter="postComment(idea.id)"
                                        placeholder="leave a comment"
                                        class="appearance-none rounded-2xl block w-full border border-gray-400 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    />
                                    <div
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                    >
                                        <svg
                                            class="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M.018 15.258L1.37 9.405a.626.626 0 0 1 .533-.48l7.558-.783c.213-.017.213-.338 0-.373l-7.558-.73a.587.587 0 0 1-.533-.462L.018.742C-.106.244.428-.165.89.066l14.777 7.4a.623.623 0 0 1 0 1.103L.89 15.934c-.463.23-.996-.178-.872-.676z"
                                                fill="#A3B1BF"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex pt-6"
                            v-for="(comment, index) in idea.comment"
                            :key="index"
                        >
                            <div
                                tabindex="0"
                                class="focus:outline-none h-6 w-6 mb-4 lg:mb-0 mr-4"
                            >
                                <img
                                    :src="comment.avatar"
                                    alt="man avatar"
                                    class="h-full w-full rounded-full overflow-hidden shadow"
                                />
                            </div>
                            <div class="rounded-lg w-full h-auto bg-gray-200">
                                <div class="inline-flex">
                                    <h3 class="text-lg ml-4 float-left">
                                        {{ comment.commented_by }}
                                    </h3>
                                </div>

                                <Listbox class="inline-flex float-right mr-10">
                                    <div class="relative">
                                        <ListboxButton
                                            class="relative rounded-md w-6 py-1 text-left bg-transparent cursor-default focus:outline-none"
                                        >
                                            <div class="pl-4 cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                                                    />
                                                </svg>
                                            </div>
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
                                                class="absolute mt-6 ml-5 w-20 z-50 origin-top-right bg-white divide-y divide-gray-100 rounded-md border border-gray-300"
                                            >
                                                <ListboxOption
                                                    @click.prevent="
                                                        showEditModal(comment)
                                                    "
                                                    class="cursor-pointer"
                                                    as="template"
                                                >
                                                    <li
                                                        class="inline-flex cursor-default select-none relative py-2 pl-2 pr-4"
                                                    >
                                                        <span
                                                            class="font-mono font-thin text-sm"
                                                            >Edit
                                                        </span>
                                                        <div class="pl-5">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                                                                />
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                </ListboxOption>
                                                <ListboxOption
                                                    @click.prevent="
                                                        confirmDelete(comment)
                                                    "
                                                    class="cursor-pointer"
                                                    as="template"
                                                >
                                                    <li
                                                        class="inline-flex cursor-default select-none relative py-2 px-6 pl-2 pr-4"
                                                    >
                                                        <span
                                                            class="font-mono font-thin text-sm"
                                                            >Delete
                                                        </span>
                                                        <div class="pl-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </Listbox>
                                <div
                                    v-if="showEditArea && editIndex === comment"
                                >
                                    <div
                                        class="w-full md:w-full px-3 mb-2 mt-2"
                                    >
                                        <textarea
                                            @keydown.enter.exact.prevent="
                                                updateComment(comment, idea)
                                            "
                                            v-model="comment.comment"
                                            class="bg-gray-100 rounded-lg border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                        ></textarea>
                                    </div>
                                    <div class="ml-4 pb-4">
                                        <button
                                            @click="
                                                updateComment(comment, idea)
                                            "
                                            class="bg-indigo-600 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-indigo-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            @click="showEditArea = false"
                                            class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <p v-else class="text-sm font-thin ml-4 mb-2">
                                    {{ comment.comment }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="flex justify-center mt-8">
                <img
                    src="@/assets/logos/nothing.svg"
                    height="350"
                    width="350"
                    alt=""
                />
            </div>
            <div
                class="container mx-auto font-semibold text-center py-1 mt-2 pb-2 rounded-lg"
            >
                <h2 class="text-black font-mono pl-8 text-3xl">
                    No Ideas Submitted Yet.
                </h2>
                <p class="text-xs text-gray-700 font-thin font-sansz">
                    this team didn't submit any ideas yet, contact the team if
                    needs.
                </p>
            </div>
        </div>
    </div>

    <div class="text-center mt-44" v-else>
        <div class="flex justify-center items-center">
            <div
                class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
            ></div>
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/vue";
export default {
    name: "Ideas",
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
    },
    data() {
        return {
            ideas: [],
            loading: true,
            showEditArea: false,
            editIndex: {},
            comments: {
                projectId: null,
                comment: [],
            },
        };
    },
    mounted() {
        this.getAllIdeas();
    },
    methods: {
        async getAllIdeas() {
            try {
                const response = await teacherService.getRequestedIdeas(
                    this.$route.params.team
                );

                this.ideas = response.data.project;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async acceptProposal(projectId) {
            const response = await teacherService.acceptIdea(projectId, {
                status: 1,
            });
            this.getAllIdeas();
        },
        async rejectProposal(projectId) {
            const response = await teacherService.rejectIdea(projectId, {
                status: 2,
            });
            this.getAllIdeas();
        },
        async updateComment(comment, { id }) {
            const info = {
                id: comment.id,
                comment: comment.comment,
            };
            try {
                await teacherService.updateComment(info);
                this.showEditArea = false;
            } catch (error) {}
        },
        async postComment(ideaID) {
            const response = await teacherService.postComment({
                project_id: ideaID,
                comment: this.comments.comment[ideaID],
            });
            this.comments.comment[ideaID] = [];
            this.getAllIdeas();
        },
        showEditModal(comment) {
            console.log("from show Edit modal");
            this.showEditArea = true;
            this.editIndex = comment;
        },
        async confirmDelete(comment) {
            if (confirm("Are you sure you?")) {
                const response = await teacherService.deleteComment(comment.id);
                this.getAllIdeas();
            }
        },
    },
};
</script>

<style>
.checkbox:checked + .check-icon {
    display: flex;
}
</style>
