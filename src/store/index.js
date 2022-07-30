import studentService from "@/config/services/studentService.js";
import userService from "@/config/services/userService.js";
import router from "@/router/index";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import notificationModule from "./modules/notifications";
import studentsModule from "./modules/students";
import teachersModule from "./modules/teachers";

export default createStore({
    state: {
        access_token: "",
        isLoggedIn: false,
        paginationLimit: 4,
        avatar: "",
        role: null,
        user: {},
        welcomeAlert: false,
        alert: {
            open: false,
            status: "",
            message: "",
            color: "",
        },
    },
    mutations: {
        UPDATE_LOGIN(state, payload) {
            state.welcomeAlert = true;
            state.user = payload;
            state.avatar = payload.user.image;
            state.access_token = payload.token;
            state.isLoggedIn = true;
            state.role = payload.user.role;
        },
        UPDATE_ALERT(state) {
            state.alert.open = true;
            state.alert.message = "Email or Password is incorrect";
            state.alert.status = "unsuccess";
            state.alert.color = "red";
        },
        updateLogout(state) {
            state.user = {};
            state.access_token = "";
            state.isLoggedIn = false;
            state.role = "";
        },
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const response = await studentService.login(payload);
                commit("UPDATE_LOGIN", response.data);
                if (response.status === 201) {
                    const user = response.data?.user;
                    console.log("Hello user role", user.role);
                    if (user.role == 1) {
                        router.push({
                            name: "teachersSection",
                            params: { teacherId: user.id },
                        });
                    } else if (user.role == 2) {
                        console.log(
                            "pass changed is tt",
                            response.data.user.pass_changed
                        );
                        if (!response.data.user.pass_changed) {
                            router.push({ name: "profile" });
                        } else {
                            router.push({ name: "studentSection" });
                        }
                    }
                }
            } catch (error) {
                commit("UPDATE_ALERT");
            }
        },

        async logout({ commit }) {
            const response = await userService.logout();
            if (response.status === 200) {
                router.push({ name: "Login" });
                commit("updateLogout");
            }
        },
    },
    getters: {
        getUser: (state) => state.user,
        authStatus: (state) => state.isLoggedIn,
        accessToken: (state) => state.access_token,
    },
    modules: {
        studentsModule,
        teachersModule,
        notificationModule,
    },
    plugins: [
        createPersistedState({
            paths: [
                "access_token",
                "user",
                "role",
                "isLoggedIn",
                "paginationLimit",
                "avatar",
            ],
        }),
    ],
});
