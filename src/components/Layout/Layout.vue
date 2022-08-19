<template>
    <el-container class="root-wrap">
        <el-header class="header-wrap">
            <nav-bar></nav-bar>
        </el-header>

        <el-container class="main-wrap">
            
            <el-aside class="aside-wrap" width="24rem">
                <div class="aside">
                    <el-scrollbar style="height: 100%;">
                    <side-bar></side-bar>
                    </el-scrollbar>
                </div>
            </el-aside>

            <el-container>
                <el-main class="content-wrap">
                    <div class="content">
                        <el-scrollbar style="height: 100%;">
                            <router-view />
                        </el-scrollbar>
                    </div>
				</el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>

    </el-container>
</template>

<script>
const SideBar = () => import('./Parts/SideBar.vue')
const NavBar = () => import('./Parts/NavBar.vue')

import {mapGetters} from "vuex";

export default {
    name: "Layout",

    components : {
        SideBar,
        NavBar
    },

    computed : {

    },

    methods: {},
};
</script>



<style scoped>
	.root-wrap{
		height: 100%;
	}

	.header-wrap{
		flex:none;
        height: 6rem;
        padding:0;
        border-bottom: 1px solid #E2DEDE;
	}

	.main-wrap{
		flex:auto;
	}

    .content-wrap, .aside-wrap{
        /* width:24rem !important; */
        position: relative;
        transition:width .3s;
        border-right: 1px solid #E2DEDE;
    }

    .content, .aside{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        overflow: hidden;
    }

    .content-wrap{
        background: #f5f5f5;
    }

    /deep/ .el-scrollbar__wrap {
        overflow-x: auto;
    }

    /deep/ .el-scrollbar__view{
        height:100%;
    }
	

</style>












