<template>
    <Navbar />
    <div v-if="!loading">
        <div class="flex justify-center mt-2" v-show="hasProject">
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
        <div
            class="lg:flex items-center justify-cente lg:px-0 px-4"
            v-if="hasProject"
        >
            <div
                aria-label="group of cards"
                tabindex="0"
                class="focus:outline-none py-8 w-full"
            >
                <div
                    class="container mx-auto grid grid-cols-3 gap-4 w-full mt-7"
                >
                    <div
                        aria-label="card 5"
                        tabindex="0"
                        class="focus:outline-none col-start-1 col-span-2 lg:w-full lg:mr-7 lg:mb-0 mb-7 bg-white p-6 border border-gray-300 rounded-lg"
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

                        <div class="pt-6">
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
                                                        showEditModal(index)
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
                                <div v-if="showEditArea && editIndex === index">
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

                    <div>
                        <div class="xl:ml-28 lg:ml-14">
                            <h1
                                class="text-xl font-mono text-gray-700 font-bold"
                            >
                                Team members
                            </h1>

                            <hr />

                            <ul class="mt-6">
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
            </div>
        </div>
        <div v-else>
            <div
                class="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28"
            >
                <div class="w-full lg:w-1/2">
                    <img
                        class="hidden lg:block"
                        src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                    />
                    <img
                        class="hidden md:block lg:hidden"
                        src="https://i.ibb.co/c1ggfn2/Group-193.png"
                    />
                    <img
                        class="md:hidden"
                        src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                    />
                </div>
                <div class="w-full lg:w-1/2">
                    <h1
                        class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800"
                    >
                        Looks like you've found the doorway to the great nothing
                    </h1>
                    <p class="py-4 text-base text-gray-800">
                        The content you’re looking for doesn’t exist. Either it
                        was removed, or you mistyped the link.
                    </p>
                    <p class="py-2 text-base text-gray-800">
                        Sorry about that! Please visit our hompage to get where
                        you need to go.
                    </p>
                    <button
                        @click="this.$router.push('/')"
                        class="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    >
                        Go back to Homepage
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="text-center mt-44">
            <svg
                role="status"
                class="inline w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
    </div>
</template>

<script>
import teacherService from "@/config/services/teacherService";
import Navbar from "@/views/header/Navbar.vue";
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/vue";
export default {
    name: "ProjectRequest",
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        Navbar,
    },
    data() {
        return {
            idea: {},
            hasProject: true,
            loading: true,
            showEditArea: false,
            editIndex: null,
            comments: {
                projectId: null,
                comment: [],
            },
        };
    },
    mounted() {
        this.getRequestedProject();
    },
    methods: {
        async getRequestedProject() {
            try {
                const response = await teacherService.getSingleProject(
                    this.$route.params.ID
                );
                this.idea = response.data;
                this.hasProject = true;
                this.loading = false;
            } catch (error) {
                console.log("from error bro");
                this.loading = false;
                this.hasProject = false;
            }
        },
        async acceptProposal(projectId) {
            const response = await teacherService.acceptIdea(projectId, {
                status: 1,
            });
            this.getRequestedProject();
        },
        async rejectProposal(projectId) {
            const response = await teacherService.rejectIdea(projectId, {
                status: 2,
            });
            this.getRequestedProject();
            console.log(response.data);
        },
        async updateComment({ comment }, { id }) {
            const info = {
                project_id: id,
                comment: comment,
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
            this.getRequestedProject();
        },
        showEditModal(index) {
            this.showEditArea = true;
            this.editIndex = index;
        },
        confirmDelete(comment) {
            if (confirm("Are you sure you?")) {
                console.log("deleted");
                // const response = await teacherService.deleteComment();
            }
        },
    },
};
</script>
