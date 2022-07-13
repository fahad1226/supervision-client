import Api from "../api";

export default {
    login(payload) {
        return Api().post("login", payload);
    },

    postIdea(payload) {
        return Api().post("project", payload);
    },

    getPublicIdeas() {
        return Api().get("all-idea-lists");
    },

    getTeamInfo() {
        return Api().get("my-team");
    },

    getScheduledMeetings() {
        return Api().get(`project-meeting-list/${1}`);
    },

    getAllProjects() {
        return Api().get("team");
    },

    getSubmittedProjects() {
        return Api().get("project/user/list");
    },

    getStudentInfo(data) {
        return Api().get("user", {
            params: {
                search: data,
            },
        });
    },

    getTags() {
        return Api().get('tag')
    },

    updateProject(project) {
        return Api().put(`project/${project.ID}`, project);
    },

    confirmDelete(projectid) {
        return Api().delete(`project/${projectid}`);
    },
};
