import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@components/Layout/Layout.vue";
import Menu from "@views/Main/TreeMenu.vue";

Vue.use(VueRouter);

export const constantRoutes = [

    // {
    //     path: '/404',
    //     component: () => import('@/views/Error/404.vue'),
    // },

    // {
    //     path: "/",
    //     redirect: "/Main",
    //     name: "Index",
    //     meta : {
    //         title : "首页"
    //     }
    // },


    {
        path: "/",
        // redirect: "/Main",
        component: Layout,
        name: "Index",
        children: [
            {
				path : "",
				name : "userList",
				components : {
                    default : () => import('@views/Main/Index.vue'),
                    breadCtrl : () => import('@views/Main/Ctrl/CategoryCtrl.vue'),
                    navCtrl : () => import('@views/Main/Ctrl/DisplayCtrl.vue'),
                    sideMenu : Menu,
                }
			}
        ]
    },

    {
        path: "/Main",
        redirect: "/Main/list",
        component: Layout,
        meta : {
            title : "用户展示"
        },
        children: [
			{
				path : "list",
				name : "userList",
				components : {
                    default : () => import('@views/Main/Index.vue'),
                    breadCtrl : () => import('@views/Main/Ctrl/CategoryCtrl.vue'),
                    navCtrl : () => import('@views/Main/Ctrl/DisplayCtrl.vue'),
                    sideMenu : Menu,
                },
                meta : {
                    title : "用户列表"
                },
			},

            {
                path : "Info",
                name : "userInfo",
                components : {
                    default : () => import('@views/Main/Detail.vue'),
                    breadCtrl : () => import('@views/Main/Ctrl/CategoryCtrl.vue'),
                    navCtrl : () => import('@views/Main/Ctrl/DisplayCtrl.vue'),
                    sideMenu : Menu,
                },
                meta : {
                    title : "用户信息"
                },
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
