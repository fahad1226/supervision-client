<template>
<body>
    <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div class="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
            <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.1665 4H12.8332"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M1.1665 4L4.49984 7.33333"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M1.1665 4.00002L4.49984 0.666687"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <p class="text-sm ml-3 font-medium leading-none">Previous</p>
            </div>
            <div class="sm:flex hidden">
                <p
                    v-for="n in 8"
                    :key="n"
                    class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-2 pb-4 mr-4 px-2"
                >{{ n }}</p>
            </div>
            <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <p class="text-sm cursor-pointer font-medium leading-none mr-3">Next</p>
                <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.1665 4H12.8332"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.5 7.33333L12.8333 4"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.5 0.666687L12.8333 4.00002"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
    </div>
</body>
</template>

<script>
export default {
    name: "MyComponent",
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped></style>
