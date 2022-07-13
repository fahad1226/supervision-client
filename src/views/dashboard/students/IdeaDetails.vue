<template>
    <div
        class="fixed inset-y-0 right-0 pl-10 max-w-full flex"
        role="dialog"
        aria-modal="true"
    >
        <div class="absolute inset-0 overflow-hidden">
            <!--
				Background overlay, show/hide based on slide-over state.
		
				Entering: "ease-in-out duration-500"
				  From: "opacity-0"
				  To: "opacity-100"
				Leaving: "ease-in-out duration-500"
				  From: "opacity-100"
				  To: "opacity-0"
			 -->
            <div
                class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            ></div>
            <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <!--
				  Slide-over panel, show/hide based on slide-over state.
		
				  Entering: "transform transition ease-in-out duration-500 sm:duration-700"
					 From: "translate-x-full"
					 To: "translate-x-0"
				  Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
					 From: "translate-x-0"
					 To: "translate-x-full"
				-->
                <div class="relative w-full max-w-2xl">
                    <!--
					 Close button, show/hide based on slide-over state.
		
					 Entering: "ease-in-out duration-500"
						From: "opacity-0"
						To: "opacity-100"
					 Leaving: "ease-in-out duration-500"
						From: "opacity-100"
						To: "opacity-0"
				  -->
                    <div
                        class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
                    >
                        <button
                            @click="closePanel"
                            type="button"
                            class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <span class="sr-only">Close panel</span>
                            <!-- Heroicon name: outline/x -->
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Slide-over panel, show/hide based on slide-over state. -->
                    <div class="h-full bg-white p-6 overflow-y-auto">
                        <div class="pb-16 space-y-6">
                            <div>
                                <div class="pb-1 sm:pb-6">
                                    <div>
                                        <div class="sm:flex sm:items-end">
                                            <div class="sm:flex-1">
                                                <div
                                                    class="flex items-center mr-2"
                                                >
                                                    <div>
                                                        <div
                                                            class="flex items-center justify-between"
                                                        >
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <h3
                                                                    class="font-bold text-2xl text-gray-900"
                                                                >
                                                                    {{
                                                                        project.title
                                                                    }}
                                                                </h3>
                                                                <span
                                                                    class="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                                                >
                                                                    <span
                                                                        class="sr-only"
                                                                        >Online</span
                                                                    >
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p
                                                    class="text-gray-500 px-2 py-1"
                                                >
                                                    2 hours ago.
                                                </p>

                                                <div
                                                    class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3"
                                                >
                                                    <div
                                                        tabindex="0"
                                                        class="focus:outline-none flex"
                                                    >
                                                        <div
                                                            v-for="tag in project.tag"
                                                            :key="tag"
                                                            class="py-2 ml-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100"
                                                        >
                                                            #{{ tag.name }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="prose prose-lg">
                                    <article class="prose">
                                        <p v-html="project.details"></p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "IdeaDetails",
    props: ["project"],
    data() {
        return {};
    },
    methods: {
        closePanel() {
            this.$emit("closePanel");
        },
    },
};
</script>
