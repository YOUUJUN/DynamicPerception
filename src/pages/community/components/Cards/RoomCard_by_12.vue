<template>
    <el-card class="room-card-by12-wrap">
        <div class="card-header">
            <el-popover
                popper-class="roomBySix-popover"
                placement="right"
                trigger="click"
            >
                <room-card-by-six :renderInfo="renderInfo"></room-card-by-six>
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
                    @click="fetchAllRoomAlarmInfo(renderInfo.id)"
                    >{{ renderInfo.qty }}</el-button
                >
            </el-popover>
        </div>
    </el-card>
</template>

<script>
const RoomCardBySix = () => import("./RoomCard_by_6.vue");
const AlarmProcessDlg = () => import('../Dialogs/AlarmProcessDlg.vue')
import { getAllRoomAlarmInfo } from "../../api/dataSource.js";
export default {

    components : {
        RoomCardBySix,
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
        fetchAllRoomAlarmInfo(id) {
            let params = {
                id,
                belong: "household",
                type : 'all',
            };
            getAllRoomAlarmInfo(params)
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
.room-card-by12-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.roomBySix-popover{
    width:24rem;
    padding:0;
}
</style>

<style scoped>

.room-card-by12-wrap {
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

</style>

<style scoped>
.roomBySix-popover .room-card-by6-wrap{
    box-shadow: unset;
    border: none;
}
</style>