<template>
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
        ...mapGetters(["menuData", "menuCheckedKeys", "menuExpandedKeys", "menuSelectedKey"]),
    },

    watch : {
        // setCheckedNodes
        menuCheckedKeys : {
            handler(newValue){
                console.log('newValue', newValue);
                this.setCheckedNodes(newValue)
            }
        }
    },

    created() {
        this.fetchData().then((res) => {
            //设置当前高亮选中行
            this.$refs.treeMenu.setCurrentKey(this.menuSelectedKey);
        });
    },

    methods: {
        ...mapActions("data", ["fetchData", "changeMenuChecked"]),

        //处理菜单点击事件
        handleNodeClick(data) {
            console.log('data', data);
            let payload = [data.id];
            this.changeMenuChecked(payload);
        },

        //设置菜单选择项
        setCheckedNodes(nodes){
            this.$refs.treeMenu.setCheckedNodes(nodes)
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
    margin-left: 10px;
}
</style>

<style scoped>
::v-deep .el-tree-node__content {
    position: relative;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
}

::v-deep .el-tree-node__expand-icon {
    position: absolute;
    right: 0;
    line-height: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px !important;
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
    margin-left: 10px;
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