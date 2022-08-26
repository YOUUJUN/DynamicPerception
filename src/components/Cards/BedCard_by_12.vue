<template>
    <el-card class="bed-card-by12-wrap">
        <div class="card-header">
            <span class="card-name">{{ renderInfo.name }}</span>
        </div>

        <div class="card-body">
            <el-popover
                popper-class="alarm-popover"
                width="220"
                placement="right"
                trigger="click"
            >
                <section class="alarm-list-wrap">
                    <el-scrollbar style="height: 100%">
                        <ul class="alarm-list">
                            <li class="alarm-item">
                                <div class="alarm-item-left">呼吸异常</div>

                                <div class="alarm-item-right">
                                    <el-button type="text" size="small"
                                        >立即处理</el-button
                                    >
                                </div>
                            </li>
                        </ul>
                    </el-scrollbar>
                </section>

                <el-button
                    v-if="renderInfo.qty != 0"
                    slot="reference"
                    class="card-num"
                    type="danger"
                    circle
                    size="mini"
                    >{{ renderInfo.qty }}</el-button
                >
            </el-popover>
        </div>

        <div class="card-footer">
            <el-button class="btn" type="info" size="mini" round
                >查看报告</el-button
            >
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        renderInfo: {
            type: Object,
        },
    },

    methods: {},
};

</script>

<style>
.bed-card-by12-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: .7rem 0 !important;
}

</style>

<style scoped>
@import url('~@/styles/alarmDlg.css');

.bed-card-by12-wrap {
    width: auto;
    height: 13rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 .8rem;
}

.card-name {
    font-size: 2rem;
    color: #18171d;
}

.card-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 1.5rem;
}

.card-num {
    display: flex;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
}

.card-footer{
    padding: 0 .5rem;
}

.card-footer .btn {
    width: 100%;
}

</style>