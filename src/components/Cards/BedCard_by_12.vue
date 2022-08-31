<template>
    <el-card class="bed-card-by12-wrap">
        <div class="card-header">
            <el-popover
                popper-class="bedBySix-popover"
                placement="right"
                width="240"
                trigger="click"
            >
                <bed-card-by-six :renderInfo="renderInfo"></bed-card-by-six>
                <span slot="reference" class="card-name">{{ renderInfo.name }}</span>
            </el-popover>
        </div>

        <div class="card-body">
            <el-popover
                popper-class="alarm-popover"
                width="220"
                placement="right"
                trigger="click"
                v-model="popOverVisible"
            >

                <alarm-process-dlg :alarmData="alarmList"></alarm-process-dlg>

                <el-button
                    v-if="renderInfo.qty != 0"
                    slot="reference"
                    class="card-num"
                    type="danger"
                    circle
                    size="mini"
                    trigger="manual"
                    @click="fetchUnsolvedAlarms(renderInfo.id)"
                    >{{ renderInfo.qty }}</el-button
                >
            </el-popover>
        </div>

        <div class="card-footer">
            <el-button class="btn" type="info" size="mini" round @click="openHealthReportDlg(renderInfo.partner_id)"
                >查看报告</el-button
            >
        </div>
    </el-card>
</template>

<script>
const AlarmProcessDlg = () => import('@/components/Dialogs/AlarmProcessDlg.vue')
const BedCardBySix = () => import("@/components/Cards/BedCard_by_6.vue");
import { getUnsolvedAlarmInfo } from "@/api/dataSource.js";
export default {

    components : {
        BedCardBySix,
        AlarmProcessDlg,
    },

    props: {
        renderInfo: {
            type: Object,
        },
    },

    data() {
        return {
            //弹窗控制
            popOverVisible: false,

            //报警列表
            alarmList: [],
        };
    },


    inject : ['openHealthReportDlg_inject'],

    methods: {
        //获取待处理告警信息
        fetchUnsolvedAlarms(id) {
            let params = {
                id,
                belong: "household",
            };
            getUnsolvedAlarmInfo(params)
                .then((res) => {
                    console.log("res", res);
                    if (res.status === 200) {
                        this.alarmList = res.data.data;
                        this.popOverVisible = true;
                    }
                })
                .catch((err) => {
                    console.warn("err", err);
                });
        },

        //打开健康报告窗体
        openHealthReportDlg(id){
            this.openHealthReportDlg_inject(id)
        }
    },
};
</script>

<style>
.bed-card-by12-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.bedBySix-popover{
    padding:0;
}
</style>

<style scoped>
.bed-card-by12-wrap {
    width: auto;
    height: 13rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 0.8rem;
}

.card-name {
    display: inline-block;
    font-size: 1.8rem;
    color: #18171d;
    text-align: center;
    cursor: pointer;
}

.card-name:hover {
    color: #439df7;
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

.card-footer {
    padding: 0 0.5rem;
}

.card-footer .btn {
    width: 100%;
}
</style>

<style scoped>
.bedBySix-popover .bed-card-by6-wrap{
    box-shadow: unset;
    border: none;
}
</style>