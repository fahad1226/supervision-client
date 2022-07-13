import Api from "../api";

export default {
    notifications() {
        return Api().get("notification");
    },
};
