import Overview from "@/components/dashboard/activities/Overview.vue";
import TeamAssignment from "@/components/dashboard/students/Assignment.vue";
import StudentDashboard from "@/components/dashboard/students/Dashboard.vue";
import NewIdea from "@/components/dashboard/students/Idea.vue";
import studentSection from "@/components/dashboard/students/StudentSection.vue";
import SubmittedIdeas from "@/components/dashboard/students/SubmittedIdeas.vue";
import Assignment from "@/components/dashboard/teachers/Assignment.vue";
import TeacherDashboard from "@/components/dashboard/teachers/Dashboard.vue";
import Ideas from "@/components/dashboard/teachers/StudentIdeas.vue";
import TeachersTask from "@/components/dashboard/teachers/TeachersTask.vue";
import singleTeam from "@/components/dashboard/teachers/Team.vue";
import About from "@/components/landings/About.vue";
import Feature from "@/components/landings/Feature.vue";
import Landing from "@/components/landings/Landing.vue";
import Login from "@/components/users/SignIn.vue";
import SignUp from "@/components/users/SignUp.vue";
import Profile from "@/views/accounts/Profile.vue";
import ProjectRequest from "@/views/dashboard/teachers/ProjectRequest.vue";
import TeamLists from "@/views/dashboard/teachers/TeamLists.vue";
import PublicIdea from "@/views/public/Idea.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: (to, from) => {
            if (store.state.isLoggedIn) {
                return { path: "/public-ideas" };
            }
        },
    },
    {
        path: "/register",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/feature",
        name: "Feature",
        component: Feature,
    },
    {
        path: "/teachers/section",
        name: "teachersSection",
        component: TeacherDashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/teachers/section/:projectId",
        name: "teachersTask",
        component: TeachersTask,
        meta: { requiresAuth: true },
    },
    {
        path: "/teachers/section/teamlists",
        name: "TeamLists",
        component: TeamLists,
        meta: { requiresAuth: true },
    },
    {
        path: "/public-ideas",
        name: "studentDashboard",
        component: StudentDashboard,
    },
    {
        path: "/students/section",
        name: "studentSection",
        component: studentSection,
        meta: { requiresAuth: true },
    },
    {
        path: "/overview",
        name: "Overview",
        component: Overview,
    },
    {
        path: "/teachers/team-ideas/:team",
        name: "Ideas",
        component: Ideas,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (store.state.role == 1) {
                next();
            } else {
                return { path: "/students/section" };
            }
        },
    },
    {
        path: "/students/section/submitted-ideas",
        name: "SubmittedIdeas",
        component: SubmittedIdeas,
        meta: { requiresAuth: true },
    },
    {
        path: "/my-profile",
        name: "profile",
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: "/new-idea",
        name: "new-idea",
        component: NewIdea,
        meta: { requiresAuth: true },
    },
    {
        path: "/single-team/:teamID",
        name: "single-team",
        component: singleTeam,
        meta: { requiresAuth: true },
    },

    {
        path: "/teachers/assignment/:ID",
        name: "assignment",
        component: Assignment,
        meta: { requiresAuth: true },
    },
    {
        path: "/students/assignment/:ID",
        name: "team-assignment",
        component: TeamAssignment,
        meta: { requiresAuth: true },
    },
    {
        path: "/public-ideas/:ID",
        name: "public-idea",
        component: PublicIdea,
    },
    {
        path: "/teachers/project-request/:ID",
        name: "project-request",
        component: ProjectRequest,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

// function canUserAccess(to) {
//     console.log('role is', store.state.role);
//     console.log('can user access to', to);
//     return true;
// }

// router.beforeEach(async (to, from) => {
//     // canUserAccess() returns `true` or `false`
//     const canAccess = await canUserAccess(to)
//     if (!canAccess) return '/login'
//   })

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
