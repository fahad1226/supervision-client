<template>
    <Navbar />
    <Alert
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
    />
    <!-- <EditProfile /> -->


    <div class="bg-gray-100">
        <!-- End of Navbar -->
        <div class="container mx-auto my-5 p-5">
            <div
                v-if="user.pass_changed"
                id="alert-border-4"
                class="flex p-4 mb-4 bg-yellow-100 border-t-4 border-yellow-500 dark:bg-yellow-200"
                role="alert"
            >
                <svg
                    class="flex-shrink-0 w-5 h-5 text-yellow-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <div class="ml-3 text-sm font-medium text-yellow-700">
                    <span class="font-bold">Change your default Password</span>
                    <span class="ml-4 font-thin">Your current password is the default one. Change this before something bad happens!</span>
                </div>
                <button
                    type="button"
                    class="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 dark:bg-yellow-200 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 dark:hover:bg-yellow-300 inline-flex h-8 w-8"
                    data-dismiss-target="#alert-border-4"
                    aria-label="Close"
                >
                    <span class="sr-only">Dismiss</span>
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <div class="md:flex no-wrap md:-mx-2">
                <!-- Left Side -->
                <div class="w-full md:w-3/12 md:mx-2">
                    <!-- Profile Card -->
                    <div class="bg-white p-3 border-t-4 border-green-400">
                        <div class="image overflow-hidden">
                            <input
                                v-show="showImage"
                                type="file"
                                @change="imageChanged"
                            />
                            <div class="grid grid-cols-2">
                                <img
                                    @click="showImage = !showImage"
                                    class="h-auto w-full mx-auto"
                                    :src="profile.image"
                                />
                            </div>
                        </div>
                        <h1
                            class="text-gray-900 font-bold text-xl leading-8 my-1"
                        >
                            {{ profile.name }}
                        </h1>
                        <h3
                            v-if="profile.role === 1"
                            class="text-gray-600 font-thin leading-6"
                        >
                            Supervisor
                        </h3>
                        <h3
                            v-else
                            class="text-gray-600 font-lg text-semibold leading-6"
                        >
                            Student
                        </h3>
                        <p
                            class="text-sm text-gray-500 hover:text-gray-600 leading-6"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit, eligendi dolorum sequi illum
                            qui unde aspernatur non deserunt
                        </p>
                        <ul
                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
                        >
                            <!-- <li class="flex items-center py-3">
                                <span>Status</span>
                                <span class="ml-auto"
                                    ><span
                                        class="bg-green-500 py-1 px-2 rounded text-white text-sm"
                                        >Active</span
                                    ></span
                                >
                            </li> -->
                            <li class="flex items-center py-3">
                                <span>Member since</span>
                                <span class="ml-auto">Nov 07, 2016</span>
                            </li>
                        </ul>
                    </div>
                    <!-- End of profile card -->
                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-64">
                    <!-- Profile tab -->
                    <!-- About Section -->
                    <div class="bg-white p-3 shadow-sm rounded-sm">
                        <div
                            class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
                        >
                            <span clas="text-green-500">
                                <svg
                                    class="h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            <span class="tracking-wide">About</span>
                        </div>
                        <div class="text-gray-700">
                            <div class="grid md:grid-cols-2 text-sm">
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Name
                                    </div>
                                    <div class="px-4 font-bold font-mono py-2">
                                        {{ profile.name }}
                                    </div>
                                </div>

                                <!-- <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Gender
                                    </div>
                                    <div class="px-4 py-2">Male</div>
                                </div> -->
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Contact No.
                                    </div>
                                    <div class="px-4 py-2">
                                        +88{{ profile.phone }}
                                    </div>
                                </div>
                                <!-- <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Current Address
                                    </div>
                                    <div class="px-4 py-2">
                                        Beech Creek, PA, Pennsylvania
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Permanant Address
                                    </div>
                                    <div class="px-4 py-2">
                                        Arlington Heights, IL, Illinois
                                    </div>
                                </div> -->
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Email.
                                    </div>
                                    <div class="px-4 py-2">
                                        <a
                                            class="text-blue-800"
                                            href="mailto:jane@example.com"
                                            >{{ profile.email }}</a
                                        >
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">
                                        Your ID
                                    </div>
                                    <div
                                        class="px-4 py-2 font-bold text-red-400"
                                    >
                                        {{ profile.student_id }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <button
                            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                        >
                            Show Full Information
                        </button> -->
                    </div>
                    <!-- End of about section -->

                    <div class="my-4"></div>

                    <hr />
                    <div class="col-start-2 col-span-2">
                        <label
                            for="password"
                            class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Old Password</label
                        >
                        <div class="relative flex items-center justify-center">
                            <input
                                v-model="resetPassword.oldPassword"
                                :type="showOldPas ? 'password' : 'text'"
                                id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                required
                            />

                            <div class="absolute right-0 mr-3 cursor-pointer">
                                <div
                                    id="show"
                                    @click="showOldPas = false"
                                    v-if="showOldPas"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                            fill="#71717A"
                                        />
                                    </svg>
                                </div>
                                <div
                                    @click="showOldPas = true"
                                    v-if="showOldPas === false"
                                    class
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-eye-off"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#27272A"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <line x1="3" y1="3" x2="21" y2="21" />
                                        <path
                                            d="M10.584 10.587a2 2 0 0 0 2.828 2.83"
                                        />
                                        <path
                                            d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div
                            v-for="error of v$.$errors"
                            :key="error.$uid"
                            class="text-left"
                        >
                            <div
                                v-if="
                                    error.$validator === 'required' &&
                                    error.$property === 'oldPassword'
                                "
                                class="text-red-700 pl-2 appearance-none w-64"
                            >
                                <span class="block sm:inline font-thin"
                                    >password cannot be empty.</span
                                >
                            </div>
                        </div>
                        <div class="mt-4">
                            <label
                                for="confirm_password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >New password</label
                            >
                            <div
                                class="relative flex items-center justify-center"
                            >
                                <input
                                    v-model="resetPassword.newPassword"
                                    :type="showNewPas ? 'password' : 'text'"
                                    id="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••"
                                    required
                                />

                                <div
                                    class="absolute right-0 mr-3 cursor-pointer"
                                >
                                    <div
                                        id="show"
                                        @click="showNewPas = false"
                                        v-if="showNewPas"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                                fill="#71717A"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        @click="showNewPas = true"
                                        v-if="showNewPas === false"
                                        class
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="icon icon-tabler icon-tabler-eye-off"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="#27272A"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            />
                                            <line
                                                x1="3"
                                                y1="3"
                                                x2="21"
                                                y2="21"
                                            />
                                            <path
                                                d="M10.584 10.587a2 2 0 0 0 2.828 2.83"
                                            />
                                            <path
                                                d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-for="error of v$.$errors"
                            :key="error.$uid"
                            class="text-left"
                        >
                            <div
                                v-if="
                                    error.$validator === 'required' &&
                                    error.$property === 'newPassword'
                                "
                                class="text-red-700 pl-2 appearance-none w-64"
                            >
                                <span class="block sm:inline font-thin"
                                    >password cannot be empty.</span
                                >
                            </div>
                            <div
                                v-if="error.$validator === 'minLength'"
                                class="text-red-400 relative appearance-none"
                            >
                                <span class="block sm:inline font-thin"
                                    >password should be minimum of 8 characters.
                                </span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label
                                for="confirm_password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >Confirm password</label
                            >
                            <div
                                class="relative flex items-center justify-center"
                            >
                                <input
                                    v-model="resetPassword.confirmPassword"
                                    :type="
                                        showConfirmPass ? 'password' : 'text'
                                    "
                                    id="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••"
                                    required
                                />

                                <div
                                    class="absolute right-0 mr-3 cursor-pointer"
                                >
                                    <div
                                        id="show"
                                        @click="showConfirmPass = false"
                                        v-if="showConfirmPass"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                                fill="#71717A"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        @click="showConfirmPass = true"
                                        v-if="showConfirmPass === false"
                                        class
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="icon icon-tabler icon-tabler-eye-off"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="#27272A"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            />
                                            <line
                                                x1="3"
                                                y1="3"
                                                x2="21"
                                                y2="21"
                                            />
                                            <path
                                                d="M10.584 10.587a2 2 0 0 0 2.828 2.83"
                                            />
                                            <path
                                                d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-for="error of v$.$errors"
                            :key="error.$uid"
                            class="text-left"
                        >
                            <div
                                v-if="
                                    error.$validator === 'required' &&
                                    error.$property === 'confirmPassword'
                                "
                                class="text-red-700 pl-2 appearance-none w-64"
                            >
                                <span class="block sm:inline font-thin"
                                    >password cannot be empty.</span
                                >
                            </div>
                            <div
                                v-if="
                                    error.$validator === 'sameAsPassword' &&
                                    error.$property === 'confirmPassword'
                                "
                                class="text-red-700 pl-2 appearance-none w-64"
                            >
                                <span class="block sm:inline font-thin"
                                    >both password should be matched!
                                </span>
                            </div>
                        </div>
                        <div class="mt-8 px-4 py-3 text-right sm:px-6">
                            <button
                                @click="changePassword"
                                class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                Update password
                            </button>
                        </div>
                    </div>
                    <!-- End of profile tab -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from "@/config/services/userService";
import Navbar from "@/views/header/Navbar.vue";
import Alert from "@/views/shared/Alert.vue";
import useVuelidate from "@vuelidate/core";
import { minLength, required, sameAs } from "@vuelidate/validators";
import EditProfile from "./EditProfile.vue";
export default {
    name: "Profile",
    components: {
        Navbar,
        Alert,
        EditProfile,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            showImage: false,
            showOldPas: false,
            showNewPas: false,
            showConfirmPass: false,
            loaded: false,
            preview: false,
            profile: {},
            resetPassword: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
        };
    },
    validations() {
        return {
            resetPassword: {
                oldPassword: {
                    required,
                    $autoDirty: true,
                    $lazy: true,
                },
                newPassword: {
                    required,
                    minLength: minLength(8),
                    $autoDirty: true,
                    $lazy: true,
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs(this.resetPassword.newPassword),
                    minLength: minLength(8),
                    $autoDirty: true,
                    $lazy: true,
                },
            },
        };
    },
    computed: {
        // profile_photo_url
        user() {
            return this.$store.getters.getUser.user;
        },
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const { data } = await userService.getUserInfo();
            this.profile = data.data;
            store.state.avatar = data.data.image;
        },
        async uploadImage(image) {
            await userService.uploadImage({
                image: image,
            });
        },
        async changePassword() {
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) return;
            try {
                const response = await userService.changePassword({
                    old_password: this.resetPassword.oldPassword,
                    password: this.resetPassword.newPassword,
                    password_confirmation: this.resetPassword.confirmPassword,
                });
                this.alert.open = true;
                this.alert.message = "Your current password has been changed.";
                this.alert.status = "success";
                this.alert.color = "green";

                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
            } catch (error) {
                this.alert.open = true;
                this.alert.message =
                    "something went wrong chaning the password, try again!";
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                }, 2000);
            }
        },
        imageChanged(e) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
                this.profile.image = e.target.result;
                this.uploadImage(this.profile.image);
            };
            this.preview = true;
            this.loaded = true;
            this.showImage = false;
        },
        cancel() {
            this.preview = false;
            this.loaded = false;
            this.user.profile_photo_url = "";
        },
    },
};
</script>
