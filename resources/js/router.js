import Vue from "vue";
import Router from "vue-router";
import store from "./vuex";
import PageLayout from "./views/components/layout.vue";
import Login from "./views/page/login";
import CoursesList from "./views/page/coursesList";
import Contents from "./views/page/contents";
import Content from "./views/page/content";
import DashboardLogin from "./views/page/dashboardLogin";
import DashboardStudent from "./views/page/dashboardStudent";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: '/nakamura-remake/',
    routes: [

        // 視聴画面設定（role:user）
        {
            path: "/",
            redirect: '/login',
            name: "login",
            component: Login
        },
        {
            path: "/login/:user_id?",
            name: "login",
            component: Login
        },
        {
            path: "/courses-list",
            name: "courses-list",
            component: CoursesList,
            meta: {
                requiresAuth: true,
                role:"user",
                layout: PageLayout,
            }
        },
        {
            path: "/contents/:cid",
            name: "contents",
            component: Contents,
            props:true,
            meta: {
                requiresAuth: true,
                role:"user",
                layout: PageLayout,
            }
        },
        {
            path: "/content/:cid/:contents_id",
            name: "content",
            component: Content,
            props:route=>({
                cid: route.params.cid,
                contents_id: route.params.contents_id,
            }),
            meta: {
                requiresAuth: true,
                role:"user",
                layout: PageLayout,
            }
        },

        // 管理者画面設定（role:admin）
        {
            path: "/admin/dashboard/login",
            name: "dashboard-login",
            component: DashboardLogin,
        },
        {
            path: "/admin/dashboard/student",
            name: "dashboard-student",
            component: DashboardStudent,
            meta: {
                requiresAuth: true,
                role:"admin",
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = store.getters.user;
        const requiredRole = to.meta.role; // ルートで指定されたロール
        if (user) {
            const userRole = user.role; // "admin" か "user"
            // ルートにroleが指定されている場合の処理
            if (to.matched.some(record => record.meta.role)) {
                if (userRole === requiredRole) {
                    // ロールが一致すればアクセス許可
                    next();
                } else {
                    // ロールが一致しない場合、アクセス拒否。ロールに応じてリダイレクト
                    if (requiredRole === "admin") {
                        next("/admin/dashboard/login"); // adminにリダイレクト
                    } else if (requiredRole === "user") {
                        next("/login"); // userにリダイレクト
                    }
                }
            } else {
                // ルートにロール指定がない場合、通常の認証のみでアクセス許可
                next();
            }
        } else {
            // 未認証の場合、ロールに応じてリダイレクト
            if (requiredRole === "admin") {
                next("/admin/dashboard/login"); // admin用のログインページ
            } else if (requiredRole === "user") {
                next("/login"); // user用のログインページ
            } else {
                next("/login"); // デフォルトとしてログインページ
            }
        }
    } else {
        // 認証が不要なルートの場合、そのまま進む
        next();
    }
});

export default router;