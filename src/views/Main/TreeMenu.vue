<template>
<!-- :default-checked-keys="menuCheckedKeys" -->
    <el-tree
        class="treemenu"
        ref="treeMenu"
        :data="menuData"
        node-key="id"
        :default-checked-keys="menuCheckedKeys"
        :default-expanded-keys="menuExpandedKeys"
        :props="defaultProps"
        :highlight-current="true"
        :show-checkbox="true"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @node-click="handleNodeClick"
        @check-change="handleCheckedChange"
    ></el-tree>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            defaultProps: {
                children: "items",
                label: "index",
            },
        };
    },

    computed: {
        ...mapGetters(["menuData", "menuCheckedKeys", "menuExpandedKeys", "menuSelectedKey", "renderData"]),
    },

    watch : {
        // setCheckedNodes
        menuCheckedKeys : {
            handler(newValue){
                console.log('menuCheckedKeys-newValue', newValue);
                this.setCheckedNodes(newValue)
            },
        }
    },

    created() {
        this.initData().then((res) => {
            //设置当前高亮选中行
            this.$refs.treeMenu.setCurrentKey(this.menuSelectedKey);
        });
    },

    methods: {
        ...mapActions("data", ["fetchData", "fetchOfflineData", "fetchRoomData", "changeMenuChecked", "setMenuFilters"]),

        //初始化所有数据
        async initData(){
            await this.fetchData();
            await this.fetchOfflineData();
            await this.fetchRoomData();
        },

        //处理菜单点击事件
        handleNodeClick(data,node) {
            // console.log('data', data);
            let payload = [data.id];
            //修改菜单选中项
            this.changeMenuChecked(payload);
        },

        //设置菜单选择项
        setCheckedNodes(nodes){  
            console.log('nodes', nodes);
            // this.$nextTick(() => {
            //     this.$refs.treeMenu.setCheckedNodes(nodes)
            // })

            this.$refs.treeMenu.setCheckedNodes(nodes)
            
        },

        //处理菜单选中
        handleCheckedChange(data, node){
            console.log("changeing----------", data);
            let checkedNodes = this.$refs.treeMenu.getCheckedNodes();
            let checkedKeys = this.$refs.treeMenu.getCheckedKeys();
            console.log('checkedNodes', checkedNodes);
            console.log('checkedKeys', checkedKeys);

            let menuFilterData = checkedNodes.map(item => {
                let id = item.id;
                let node = this.$refs.treeMenu.getNode(item);
                return {
                    id,
                    parentId : node?.parent?.id,
                    level : node.level,
                }
            })

            //设置菜单过滤项
            this.setMenuFilters(menuFilterData);
        }
    },
};
</script>

<style>
.treemenu.el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content
    > .el-tree-node__label {
    color: #439df7 !important;
}

.treemenu .el-checkbox {
    margin-left: 1rem;
}
</style>

<style scoped>
::v-deep .el-tree-node__content {
    position: relative;
    height: 5.6rem;
    line-height: 5.6rem;
    font-size: 1.4rem;
}

::v-deep .el-tree-node__expand-icon {
    position: absolute;
    right: 0;
    line-height: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem !important;
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
    background: none;
}

::v-deep
    .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #ecf5ff !important;
}

::v-deep .el-tree-node__label {
    margin-left: 1rem;
}

/* ::v-deep .is-current .el-tree-node__label{
    color: #439DF7 !important
} */

/* ::v-deep .el-tree-node__expand-icon:hover{
    background: #eee;
} */

/* ::v-deep .el-tree-node__expand-icon.expanded{
    transform: none;
}

::v-deep .el-tree-node__expand-icon.expanded .el-icon-caret-right::before{
    transform: rotate(90deg);
} */
</style>