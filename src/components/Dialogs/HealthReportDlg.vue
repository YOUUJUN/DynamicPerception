<template>
    <el-dialog
        custom-class="report-dlg"
        :visible.sync="visible"
        width="20%"
        :before-close="handleClose"
    >

    <section class="blank-body" v-if="!ifReport">
        <div class="blank-body-top">
            <img src="@/static/img/noReport.png">
        </div>

        <div class="blank-body-bottom">
            <span>暂无报告</span>
        </div>
    </section>

    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        reportInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {};
    },

    computed : {
        ifReport (){
            return Object.keys(this.reportInfo) > 0 ? true : false
        }
    },

    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style>
.report-dlg{
    font-family: Source Han Sans CN;
}

.report-dlg .el-dialog__header {
    padding: 0;
}

.elder-dlg .el-dialog__body {
    padding: 3rem 2rem;
}
</style>

<style scoped>

.blank-body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.blank-body-top{
    width: 100%;
}

.blank-body-top img{
    width:100%;
    height: 22rem;
}

.blank-body-bottom{
    font-size: 2.8rem;
    font-weight: 400;
    color: #444444;
}


</style>