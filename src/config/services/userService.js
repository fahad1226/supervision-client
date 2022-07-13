import Api from "../api";

export default {
    logout() {
        return Api().post("logout");
    },

    getUserInfo() {
        return Api().get("profile/view");
    },

    getPublicIdea(ID) {
        return Api().get(`project/${ID}`);
    },

    uploadImage(image) {
        return Api().post("profile/photo-update", image);
    },

    changePassword(password) {
        return Api().post("password-update", password);
    },
};
