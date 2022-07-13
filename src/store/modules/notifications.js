import notificationService from "@/config/services/notificationService";

const notificationModule = {
    state: () => ({
        totalNotifications: 0,
        notifications: [],
        
    }),
    mutations: {
        updateNotifications(state, payload) {
            console.log("hello", payload);
            state.notifications = payload;
        },
    },
    actions: {
        async getNotifications({ commit }) {
            const response = await notificationService.notifications();
            console.log("notification is ", response.data);
            commit("updateNotifications", response.data.data);
        },
    },
    getters: {
        allNotifications: (state) => state.notifications,
    },
};

export default notificationModule;
