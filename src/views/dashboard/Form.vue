<template>
    <Alert
        :open="alert.open"
        :status="alert.status"
        :message="alert.message"
        :color="alert.color"
    />

    <div class="bg-white rounded w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
        <p
            tabindex="0"
            class="inline-flex focus:outline-none pb-8 text-2xl font-extrabold leading-6 text-gray-800"
        >
            Create new group
        </p>

        <div class="float-right cursor-pointer" @click="closeEntryForm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>

        <div class="mt-5">
            <div>
                <label
                    for="email"
                    class="text-sm font-medium leading-none text-gray-800"
                    >Team Name</label
                >
                <br />
                <input
                    id="team_name"
                    aria-labelledby="team_name"
                    v-model="team_name"
                    required
                    type="text"
                    placeholder="Team Name"
                    :class="
                        v$.team_name.$error
                            ? 'border border-red-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            : 'appearance-none border rounded  w-full py-2 px-3 text-gray-700 focus:outline-indigo-400'
                    "
                />
                <div v-for="error of v$.$errors" :key="error.$uid">
                    <div
                        v-if="
                            error.$validator === 'required' &&
                            error.$property === 'team_name'
                        "
                        class="text-red-700 ml-1 appearance-none"
                    >
                        <span class="block sm:inline font-thin"
                            >Team name cannot be empty.</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th scope="col" class="px-2 py-3">ID</th>
                        <th scope="col" class="px-2 py-3">Student Name</th>
                        <!-- <th scope="col" class="px-2 py-3">Student Email</th>
                        <th scope="col" class="px-2 py-3">Student Contact</th> -->
                        <th scope="col" class="px-2 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(student, index) in students"
                        :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                        <th
                            scope="row"
                            class="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                            <input
                                id="team_name"
                                autocomplete="off"
                                aria-labelledby="team_name"
                                @keyup="getStudentInfo(index)"
                                v-model="student.studentID"
                                required
                                type="text"
                                placeholder="Student ID"
                                class="bg-gray-50 border rounded text-xs font-medium leading-none placeholder:text-gray-400 text-gray-800 py-3 w-60 pl-3 mt-2"
                            />
                        </th>
                        <td class="px-2 py-4">
                            <input
                                id="team_name"
                                aria-labelledby="team_name"
                                v-model="student.name"
                                required
                                type="text"
                                placeholder="Student name"
                                class="bg-gray-50 border rounded text-xs font-medium leading-none placeholder:text-gray-400 text-gray-800 py-3 w-60 pl-3 mt-2"
                            />
                        </td>
                        <!-- <td class="px-2 py-4">
                            <input
                                id="team_name"
                                aria-labelledby="team_name"
                                v-model="student.email"
                                required
                                type="email"
                                placeholder="Student email"
                                class="bg-gray-50 border rounded text-xs font-medium leading-none placeholder:text-gray-400 text-gray-800 py-3 w-60 pl-3 mt-2"
                            />
                        </td> -->
                        <!-- <td class="px-2 py-4">
                            <input
                                id="team_name"
                                aria-labelledby="team_name"
                                v-model="student.contact"
                                required
                                type="text"
                                placeholder="Student contact"
                                class="bg-gray-50 border rounded text-xs font-medium leading-none placeholder:text-gray-400 text-gray-800 py-3 w-60 pl-3 mt-2"
                            />
                        </td> -->
                        <td class="px-2 py-4 inline-flex mt-3">
                            <div
                                class="mt-2 pl-1 cursor-pointer"
                                @click.prevent="addCol"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div
                                class="mt-2 ml-3 cursor-pointer"
                                @click.prevent="removeCol(student)"
                                v-if="students.length > 1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div class="mt-2 ml-3 cursor-not-allowed" v-else>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </td>
                    </tr>
                    <div
                        v-show="showList"
                        class="relative w-60 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div
                            v-show="showList"
                            v-for="(item, index) in items"
                            :key="index"
                            class="z-50 cursor-pointer font-bold text-blue-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                        >
                            <span
                                @click="enterStudent(item, index)"
                                class="cursor-pointer font-bold text-gray-600 group flex rounded-md items-center w-full text-sm"
                            >
                                <img
                                    class="h-8 w-8 border border-gray-200 rounded-3xl mr-2"
                                    :src="item.image"
                                    alt=""
                                />
                                {{ item.name }}
                            </span>
                        </div>
                    </div>
                </tbody>
            </table>
        </div>

        <div class="mt-8">
            <button
                type="submit"
                :disabled="isDisabled"
                @click.prevent="createNewTeam"
                role="button"
                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                :class="
                    isDisabled ? 'disabled:opacity-25 cursor-not-allowed' : ''
                "
            >
                Submit
            </button>
        </div>
    </div>
</template>

<script>
import studentService from "@/config/services/studentService";
import teacherService from "@/config/services/teacherService";
import Alert from "@/views/shared/Alert.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import * as debounce from "lodash.debounce";
export default {
    name: "EntryForm",
    emits: ["closeEntryForm"],
    components: {
        Alert,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
            team_name: "",
            items: [],
            showList: false,
            indexID: null,
            index: 0,
            students: [
                {
                    ID: null,
                    studentID: null,
                    name: "",
                },
            ],

            batch: "",
        };
    },
    validations() {
        return {
            team_name: {
                required,
                $autoDirty: true,
                $lazy: true,
            },
            students: {
                required,
                $each: {
                    ID: required,
                    $autoDirty: true,
                    $lazy: true,
                },
            },
        };
    },
    computed: {
        isDisabled() {
            if (this.students[0].ID) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        addCol() {
            this.students.push({
                ID: "",
                studentID: "",
                name: "",
            });
        },

        removeCol(id) {
            const index = this.students.indexOf(id);
            console.log(index);
            if (index > -1) {
                this.students.splice(index, 1); // 2nd parameter means remove one item only
            }
        },

        enterStudent(item, index) {
            this.students[this.index].studentID = item.student_id;
            this.students[this.index].name = item.name;
            this.students[this.index].ID = item.id;
            this.showList = false;

            this.index += 1;
        },

        getStudentInfo: debounce(async function (index) {
            // this.processing = true;
            try {
                const response = await studentService.getStudentInfo(
                    this.students[index].studentID
                );
                this.items = response.data.data;
                this.showList = true;
                this.indexID = index;
            } catch (e) {
                // this.processing = false;
            }
        }, 500),

        closeEntryForm() {
            this.$emit("closeEntryForm");
        },

        async createNewTeam() {
            let user = [];
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) return;
            this.students.forEach((student) => {
                console.log(student.ID);
                user.push(student.ID);
            });
            try {
                const response = await teacherService.postNewGroup({
                    student: user,
                    team_name: this.team_name,
                });
                if (response.status === 200) {
                    this.alert.open = true;
                    this.alert.message = "New team created!";
                    this.alert.status = "success";
                    this.alert.color = "green";
                }
                setTimeout(() => {
                    this.alert = {};
                    this.$emit("closeForm");
                    this.$router.push({ name: "TeamLists" });
                }, 2000);
            } catch (error) {
                this.alert.open = true;
                this.alert.message =
                    "Sorry the student already exist in a team";
                this.alert.status = "Failed";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                    this.closeEntryForm();
                }, 2000);
            }
        },
    },
};
</script>
