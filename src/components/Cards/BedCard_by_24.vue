<template>
    <el-card class="bed-card-by24-wrap">
        <div class="card-header">
            <el-popover
                popper-class="bedBySix-popover"
                placement="right"
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

                <alarm-process-dlg :alarmData="alarmList" :bedInfo="renderInfo"></alarm-process-dlg>

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
    </el-card>
</template>

<script>
const AlarmProcessDlg = () => import('@/components/Dialogs/AlarmProcessDlg.vue')
const BedCardBySix = () => import("@/components/Cards/BedCard_by_6.vue");
import { getUnsolvedAlarmInfo } from "@/api/dataSource.js";
export default {

    components : {
        BedCardBySix,
        AlarmProcessDlg
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
    },
};
</script>

<style>
.bed-card-by24-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.bedBySix-popover{
    width:24rem;
    padding:0;
}
</style>

<style scoped>

.bed-card-by24-wrap {
    width: auto;
    height: 8rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 0.2rem;
}

.card-name {
    display: inline-block;
    font-size: 1.1rem;
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
</style>

<style scoped>
.bedBySix-popover .bed-card-by6-wrap{
    box-shadow: unset;
    border: none;
}
</style>