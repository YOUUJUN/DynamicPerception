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
            slot="reference"
            class="bed-card-by6-wrap"
            :class="[alertClass, notCheckInClass]"
        >
            <div class="card-header">
                <img
                    class="card-avatar"
                    :src="elderAvatar(renderInfo)"
                    @click="openElderDlg(renderInfo)"
                />

                <span class="card-name">{{ renderInfo.name }}</span>

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

            <ul class="card-body">
                <li class="card-item">
                    <div class="card-item-left">
                        <img
                            src="@/static/img/normalStatus_l.png"
                            class="status-icon"
                            v-if="renderInfo.partner_id"
                        />
                        <img
                            src="@/static/img/normalStatus.png"
                            class="status-icon"
                            v-else
                        />
                        <span class="status-label">状态</span>
                    </div>
                    <div class="card-item-right">
                        <span class="status-name">{{ renderInfo.status }}</span>
                    </div>
                </li>

                <li class="card-item">
                    <div class="card-item-left">
                        <img
                            src="@/static/img/normalHeart_l.png"
                            class="status-icon"
                            v-if="renderInfo.partner_id"
                        />
                        <img
                            src="@/static/img/normalHeart.png"
                            class="status-icon"
                            v-else
                        />
                        <span class="status-label">心率</span>
                    </div>
                    <div class="card-item-right">
                        <span class="status-name">{{ renderInfo.heart }}</span>
                    </div>
                </li>

                <li class="card-item">
                    <div class="card-item-left">
                        <img
                            src="@/static/img/normalBreathing_l.png"
                            class="status-icon"
                            v-if="renderInfo.partner_id"
                        />
                        <img
                            src="@/static/img/normalBreathing.png"
                            class="status-icon"
                            v-else
                        />
                        <span class="status-label">呼吸</span>
                    </div>
                    <div class="card-item-right">
                        <span class="status-name">{{
                            renderInfo.breathing
                        }}</span>
                    </div>
                </li>

                <li class="card-item alert-card-item">
                    <div class="card-item-left">
                        <img
                            src="@/static/img/normalAlarming_r.png"
                            class="status-icon"
                            v-if="renderInfo.alertFlag"
                        />
                        <img
                            src="@/static/img/normalAlarming_l.png"
                            class="status-icon"
                            v-else-if="renderInfo.partner_id"
                        />
                        <img
                            src="@/static/img/normalAlarming.png"
                            class="status-icon"
                            v-else
                        />
                        <span class="status-label">告警</span>
                    </div>
                    <div class="card-item-right">
                        <el-tooltip
                            effect="dark"
                            :content="renderInfo.pop_show.state"
                            placement="top-start"
                        >
                            <span class="status-name">{{
                                renderInfo.pop_show.state
                            }}</span>
                        </el-tooltip>
                    </div>
                </li>
            </ul>

            <div class="card-footer">
                <el-button
                    class="btn"
                    type="primary"
                    size="small"
                    round
                    @click="openHealthReportDlg(renderInfo)"
                    >查看报告</el-button
                >
            </div>
        </el-card>
    </el-popover>
</template>

<script>
const AlarmProcessDlg = () => import("../Dialogs/AlarmProcessDlg.vue");
const AlertPopover = () => import("../Dialogs/AlertPopover.vue");
import { getUnsolvedAlarmInfo } from "../../api/dataSource.js";
import { mapGetters } from "vuex";
import { getDeviceImgUrl, getAlertLevelClass } from "@/api/dict.js";

export default {
    components: {
        AlarmProcessDlg,
        AlertPopover,
    },

    props: {
        renderInfo: {
            type: Object,
        },

        reportDlgVisible: {},
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

        elderAvatar() {
            return (elderInfo) => {
                if (elderInfo?.pop_show?.gender === "男") {
                    return getDeviceImgUrl("male");
                } else if (elderInfo?.pop_show?.gender === "女") {
                    return getDeviceImgUrl("female");
                } else {
                    return getDeviceImgUrl("nomen");
                }
            };
        },

        alertVisible: {
            get() {
                let alertFlag = this.renderInfo?.alertFlag ?? false;

                if (alertFlag && this.displayRow === "X6") {
                    return true;
                } else {
                    return false;
                }
            },

            set(visible) {},
        },

        notCheckInClass() {
            let notCheckInClass = "";
            let { partner_id } = this.renderInfo;
            if (!partner_id) {
                notCheckInClass = "not-check-in";
            }
            return notCheckInClass;
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

    inject: ["openElderDlg_inject", "openHealthReportDlg_inject"],

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

        //打开老人信息窗体
        openElderDlg({ id, partner_id }) {
            if (!partner_id) {
                return;
            }
            this.openElderDlg_inject(id);
        },

        //打开健康报告窗体
        openHealthReportDlg({ partner_id }) {
            if (!partner_id) {
                return;
            }
            this.openHealthReportDlg_inject(partner_id);
        },
    },
};
</script>

<style>
.bed-card-by6-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem 0 !important;
}
</style>

<style scoped>
@import url("~@/styles/alarmPopover.css");

.bed-card-by6-wrap {
    width: auto;
    height: 26rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
}

.card-name {
    font-size: 2rem;
    color: #18171d;
    text-align: center;
    padding: 0 0.6rem;
}

.card-num {
    display: flex;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
}

.card-body {
    font-size: 1.5rem;
    list-style: none;
    padding: 0 1.5rem;
}

.card-body .card-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #999;
    padding: 0.6rem 0;
}

.card-item-left {
    display: flex;
    align-items: center;
}

.card-avatar {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    cursor: pointer;
}

.status-icon {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
}

.status-label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.status-name {
    font-size: 1.4rem;
}

.card-item-right {
    width: 11rem;
    overflow: hidden;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.card-footer {
    padding: 0 1.5rem;
}

.card-footer .btn {
    width: 100%;
}
</style>
