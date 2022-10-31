<template>
    <div id="app">
        <layout>
            <template v-slot:header>
                <nav-bar>

                    <template v-slot:breadCtrl>
                        <category-ctrl></category-ctrl>
                    </template>

                    <template v-slot:navCtrl>
                        <display-ctrl></display-ctrl>
                    </template>
                    
                </nav-bar>
            </template>

            <template v-slot:aside>
                <side-bar>
                    <tree-menu></tree-menu>
                </side-bar>
            </template>

            <index></index>

        </layout>
    </div>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';
import NavBar from '@/components/Layout/Parts/NavBar.vue';
import SideBar from '@/components/Layout/Parts/SideBar.vue';

import Index from './modules/Index.vue';
import CategoryCtrl from './modules/Ctrl/CategoryCtrl.vue';
import DisplayCtrl from './modules/Ctrl/DisplayCtrl.vue';
import TreeMenu from './modules/TreeMenu.vue';     


export default {
    components: { Index, Layout, CategoryCtrl, DisplayCtrl, TreeMenu, NavBar, SideBar },
    name: "App",
    data() {
        return {};
    },

    mounted() {
        this.flexible();
    },

    methods: {
        //控制rem
        flexible() {
            var docEl = document.documentElement;
            var dpr = window.devicePixelRatio || 1;
            function setRemUnit() {
                var rem = docEl.clientWidth / 192;
                docEl.style.fontSize = rem + "px";
            }
            setRemUnit();

            // reset rem unit on page resize
            window.addEventListener("resize", setRemUnit);
            window.addEventListener("pageshow", function (e) {
                if (e.persisted) {
                    setRemUnit();
                }
            });
        },
    },
};
</script>

<style>
@import url("~@/styles/global_ele.css");

* {
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    font-family: Poppins, sans-serif;
    box-sizing: border-box;
    -webkit-text-size-adjust:none;
}

ul {
    margin: 0;
    padding: 0;
}

#app {
    height: 100%;
}
</style>
