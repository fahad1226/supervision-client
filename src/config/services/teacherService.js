import Api from "../api";

export default {
    postNewGroup(payload) {
        return Api().post("team", payload);
    },
    getProjects(page, limit) {
        return Api().get("supervisor-project", {
            params: {
                page: page,
                limit: limit,
            },
        });
    },
    getRequestedIdeas(teamID) {
        return Api().get(`team/${teamID}`);
    },
    createAssignment(payload) {
        return Api().post("assignment", payload);
    },
    createTask(id, payload) {
        return Api().post(`assignment/task/${id}`, payload);
    },
    getAllTask(id) {
        return Api().get(`assignment/${id}`);
    },
    getTeamInfo(projectId) {
        return Api().get(`project/${projectId}`);
    },
    getAllTeam() {
        return Api().get("supervisor-project/team-count");
    },
    acceptIdea(projectId, payload) {
        return Api().put(`project/status/${projectId}`, payload);
    },
    rejectIdea(projectId, payload) {
        return Api().put(`project/status/${projectId}`, payload);
    },
    updateProjectStatus(projectId, payload) {
        return Api().put(`project/status/${projectId}`, payload);
    },
    scheduleMeet(payload) {
        return Api().post("meeting", payload);
    },
    getAllMeetings(projectId) {
        return Api().get(`project-meeting-list/${projectId}`);
    },
    postComment(payload) {
        return Api().post("project/user/comment", payload);
    },
    getComments(projectID, payload) {
        return Api().get(`project/comments/${projectID}`);
    },
    getSingleTeam(teamID) {
        return Api().get(`team/${teamID}`);
    },

    updateAssignment(assignment) {
        return Api().put(`assignment/${assignment.id}`, assignment);
    },

    deleteAssignment(assignmentID) {
        return Api().delete(`assignment/${assignmentID}`);
    },

    updateTask(task) {
        return Api().post(`task-update/${task.id}`, task);
    },
    deleteTask(taskID) {
        return Api().post(`task-delete/${taskID}`);
    },
    getAssignment(id) {
        return Api().get(`assignment/${id}`);
    },
    getPaginatedTask(taskID, page, limit) {
        return Api().get(`task-list/${taskID}`, {
            params: {
                page: page,
                limit: limit,
            },
        });
    },
    getPaginateAssignments(assignmentID, page, limit) {
        return Api().get(`assignment-list/${assignmentID}`, {
            params: {
                page: page,
                limit: limit,
            },
        });
    },

    deleteProject(projectID) {
        return Api().delete(`project/${projectID}`);
    },

    getSingleProject(projectID) {
        return Api().get(`project/${projectID}`);
    },

    updateComment(comment) {
        return Api().post(
            `project/user/comment/${comment.id}`,
            comment
        );
    },

    deleteComment(commentID) {
        return Api().get(`project/user/comment-delete/${commentID}`);
    },
};
