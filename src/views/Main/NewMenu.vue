<template>
    <el-menu
        default-active="2"
        :unique-opened="true"
        :collapse-transition="true"
        class="menu"
        @open=""
        @close=""
    >
        <template v-for="(housing, index) in menuData">
            <submenu :index="housing.code">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{housing.name}}</span>
                </template>

                <template v-for="(building, index) in housing.buildings">
                    <submenu :index="housing.code + building.code" :popper-append-to-body="true">
                        <template slot="title">{{building.name}}</template>

                        <template v-for="(floor, index) in building.floors">
                            <el-menu-item :index="housing.code + building.code + floor.code" @click="openFloor(`${housing.code}#${building.code}#${floor.code}`)">{{floor.name}}</el-menu-item>
                        </template>
                    </submenu>
                </template>

                
            </submenu>
        </template>
        

    </el-menu>
</template>

<script>

import {Message} from "element-ui";
import {mapActions, mapGetters} from "vuex";
const menu = () => import('@/components/menu/src/menu.vue');
const Submenu = () => import('@/components/menu/src/submenu.vue');

export default {
    components: { Submenu, menu },

    data() {
        return {
            originData: {},
        };
    },

    computed: {

        menuData() {
            return this.originData.housings;
        },
    },

    created() {
        this.originData = this.initData();

        this.openFloor();
    },

    methods: {
        ...mapActions('display', [
            'initUserInfo'
        ]),

        openFloor(code){
            console.log('code',code);
            let payload = new Array(30);
            payload.fill({
                name : 'YOUJUN',
                age : 90
            })
            
            let result = this.initUserInfo(payload);
            console.log('result', result);

            Message({
                message: code,
                type: 'warning'
            });
        },

        initData() {
            let originData = {
                housings: [
                    {
                        name: "小区一",
                        code : "h1",
                        buildings: [
                            {
                                name: "栋一",
                                code : "b1",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                ],
                            },
                            {
                                name: "栋二",
                                code : "b2",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                    {
                                        name: "层三",
                                        code : "l3",
                                    },
                                    {
                                        name: "层四",
                                        code : "l4",
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        name: "小区一",
                        code : "h2",
                        buildings: [
                            {
                                name: "栋一",
                                code : "b1",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                ],
                            },
                            {
                                name: "栋二",
                                code : "b2",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                    {
                                        name: "层三",
                                        code : "l3",
                                    },
                                    {
                                        name: "层四",
                                        code : "l4",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            return originData;
        },
    },
};
</script>

<style>
</style>

<style scoped>
.menu {
    user-select: none;
}
</style>