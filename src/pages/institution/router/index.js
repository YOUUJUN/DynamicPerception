import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/components/Layout/Layout.vue";
import Menu from "../modules/TreeMenu.vue";

Vue.use(VueRouter);

export const constantRoutes = [

    // {
    //     path: '/404',
    //     component: () => import('@/views/Error/404.vue'),
    // },

    {
        path: "/institution",
        component: Layout,
        children: [
            {
				path : "",
				name : "institution",
				components : {
                    default : () => import('../modules/Index.vue'),
                    breadCtrl : () => import('../modules/Ctrl/CategoryCtrl.vue'),
                    navCtrl : () => import('../modules/Ctrl/DisplayCtrl.vue'),
                    sideMenu : Menu,
                }
			}
        ]
    },

];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes : constantRoutes,
});

export default router;
