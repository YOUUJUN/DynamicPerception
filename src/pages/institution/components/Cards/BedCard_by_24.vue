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

        <el-card slot="reference" class="bed-card-by24-wrap" :class="[alertClass, notCheckInClass]">
            <div class="card-header">
                <el-popover
                    popper-class="bedBySix-popover"
                    placement="right"
                    trigger="click"
                >
                    <bed-card-by-six :renderInfo="renderInfo"></bed-card-by-six>
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
                        @click="fetchUnsolvedAlarms(renderInfo.id)"
                        >{{ renderInfo.qty }}</el-button
                    >
                </el-popover>
            </div>
        </el-card>
    </el-popover>
</template>

<script>
const AlarmProcessDlg = () => import("../Dialogs/AlarmProcessDlg.vue");
const BedCardBySix = () => import("../Cards/BedCard_by_6.vue");
const AlertPopover = () => import("../Dialogs/AlertPopover.vue");
import { getUnsolvedAlarmInfo } from "../../api/dataSource.js";
import {mapGetters} from "vuex"

export default {
    components: {
        BedCardBySix,
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
        ...mapGetters(['displayRow']),

        alertVisible: {
            get() {
                let alertFlag = this.renderInfo?.alertFlag ?? false;

                if(alertFlag && this.displayRow === 'X24'){
                    return true
                }else{
                    return false
                }
            },

            set(visible) {},
        },

        notCheckInClass (){
            let notCheckInClass = "";
            let {partner_id} = this.renderInfo;
            if(!partner_id){
                notCheckInClass = "not-check-in"
            }
            return notCheckInClass;
        }
    },

    watch: {
        renderInfo: {
            deep: true,
            handler(newValue) {
                let { msg_text, alertFlag } = newValue;
                let alertClass = "";

                if (!alertFlag) {
                    this.alertClass = "";
                    return alertClass;
                }
                switch (msg_text) {
                    case "跌倒告警":
                    case "烟雾告警":
                    case "燃气告警":
                    case "紧急呼叫":
                    case "智能呼叫":
                        alertClass = "alert-card-level-1";
                        break;
                    case "心率异常":
                    case "呼吸异常":
                    case "离床未归":
                    case "翻身护理":
                    case "水流异常":
                    case "用水异常":
                        alertClass = "alert-card-level-2";
                        break;
                }

                this.alertClass = alertClass;
            },
        },
    },

    methods: {
        //获取待处理告警信息
        fetchUnsolvedAlarms(id) {
            let params = {
                id,
                belong: "nursing",
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

.bedBySix-popover {
    width: 24rem;
    padding: 0;
}
</style>

<style scoped>
@import url("~@/styles/alarmPopover.css");

.bed-card-by24-wrap {
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
.bedBySix-popover .bed-card-by6-wrap {
    box-shadow: unset;
    border: none;
}
</style>