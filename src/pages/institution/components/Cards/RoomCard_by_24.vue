<template>
    <el-popover
        popper-class="alert-popover"
        width="150"
        placement="right-start"
        trigger="manual"
        v-model="alertVisible"
    >
        <alert-popover
            ref="alertPop"
            :renderInfo="renderInfo"
            :alertVisible="alertVisible"
        ></alert-popover>
        <el-card
            class="room-card-by24-wrap"
            slot="reference"
            :class="alertClass"
        >
            <div class="card-header">
                <el-popover
                    popper-class="roomBySix-popover"
                    placement="right"
                    trigger="click"
                >
                    <room-card-by-six
                        :renderInfo="renderInfo"
                    ></room-card-by-six>
                    <span slot="reference" class="card-name">{{
                        renderInfo.name
                    }}</span>
                </el-popover>
            </div>

            <div class="card-body">
                <el-popover
                    popper-class="alarm-popover"
                    placement="right"
                    trigger="click"
                    v-model="popOverVisible"
                >
                    <alarm-process-dlg
                        :alarmData="alarmList"
                        :bedInfo="renderInfo"
                        :popOverVisible.sync="popOverVisible"
                    ></alarm-process-dlg>

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
    </el-popover>
</template>

<script>
const RoomCardBySix = () => import("./RoomCard_by_6.vue");
const AlarmProcessDlg = () => import("../Dialogs/AlarmProcessDlg.vue");
const AlertPopover = () => import("../Dialogs/AlertPopover.vue");
import { getAllRoomAlarmInfo } from "../../api/dataSource.js";
import { mapGetters } from "vuex";
import { getAlertLevelClass } from "@/api/dict";

export default {
    components: {
        RoomCardBySix,
        AlarmProcessDlg,
        AlertPopover,
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

            //报警卡片类
            alertClass: "",
        };
    },

    computed: {
        ...mapGetters(["displayRow"]),

        alertVisible: {
            get() {
                let alertFlag = this.renderInfo?.alertFlag ?? false;

                if (alertFlag && this.displayRow === "X24") {
                    return true;
                } else {
                    return false;
                }
            },

            set(visible) {},
        },
    },

    watch: {
        renderInfo: {
            deep: true,
            handler(newValue) {
                let { msg_text, alertFlag } = newValue;
                this.alertClass = getAlertLevelClass(msg_text, alertFlag);
            },
        },
    },

    methods: {
        //获取待处理告警信息
        fetchAllRoomAlarmInfo(id) {
            let params = {
                id,
                belong: "nursing",
                type: "all",
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
.room-card-by24-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.roomBySix-popover {
    padding: 0;
}
</style>

<style scoped>
@import url("~@/styles/alarmPopover.css");

.room-card-by24-wrap {
    width: auto;
    height: 8rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 0.2rem;
}

.card-name {
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
.roomBySix-popover .room-card-by6-wrap {
    box-shadow: unset;
    border: none;
}
</style>
