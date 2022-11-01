<template>
    <section class="alarm-list-wrap">
        <el-scrollbar style="height: 100%">
            <ul class="alarm-list">
                <li
                    class="alarm-item"
                    v-for="(item, index) in renderData"
                    :key="index"
                >
                    <el-tooltip
                        effect="dark"
                        :content="item.msg_text"
                        placement="top-start"
                    >
                        <div class="alarm-item-left">
                            {{ item.msg_text }}
                        </div>
                    </el-tooltip>

                    <div class="alarm-item-right">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleAlarmResolve(item, index)"
                            >立即处理</el-button
                        >

                        <el-button
                            v-if="item.msg_text === '智能呼叫'"
                            type="success"
                            icon="el-icon-phone"
                            size="mini"
                            :circle="true"
                            class="phone-btn"
                            @click="handleRTCCall(item, index)"
                        ></el-button>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </section>
</template>

<script>
import { handleAlarmPrompt } from "../../api/dataSource.js";

import { mapGetters, mapActions } from "vuex";

export default {
    props: {
        alarmData: {
            type: Array,
            required: true,
        },

        bedInfo: {
            type: Object,
            required: true,
        },

        popOverVisible : {
            type : Boolean,
        },
    },

    inject: ["openRTCCallDlg_inject", "stopTalk_inject"],

    data() {
        return {
            renderData: [],
        };
    },

    computed: {
        ...mapGetters(["displayCategory"]),
    },

    watch: {
        alarmData: {
            handler(newValue) {
                this.renderData = newValue;
            },
        },
    },

    methods: {
        ...mapActions("data", ["resolveBedAlarm", "resolveRoomAlarm", "deleteRoomData"]),

        //处理告警
        handleAlarmResolve(item, index) {
            let {alarmId} = item;
            //中止语音告警
            this.stopTalk_inject(alarmId);
            
            if (["1", "2", "3", "4"].includes(this.displayCategory)) {
                this.doBedAlarmResolve(item, index);
            } else if (["6"].includes(this.displayCategory)) {
                this.doRoomAlarmResolve(item, index);
            }
        },

        //处理床铺告警
        doBedAlarmResolve({ id: alarmId }, index) {
            let { id, partner_id, } = this.bedInfo;
            let params = {
                id: alarmId,
                belong: "nursing",
                type: "",
                room_id: "",
                bed_id : id,
                partner_id,
            };

            handleAlarmPrompt(params)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let warn_qty = res.data.warn_qty;
                        this.renderData.splice(index, 1);
                        this.resolveBedAlarm({
                            id,
                            warn_qty,
                        });

                        if(this.renderData.length === 0){
                            console.log("无剩余未处理")
                            this.$emit('update:popOverVisible', false);
                        }

                        this.$message({
                            showClose: true,
                            message: "处理成功!",
                            type: "success",
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        showClose: true,
                        message: "处理失败!",
                        type: "warning",
                    });
                    console.warn("err", err);
                });
        },

        //处理房间告警
        doRoomAlarmResolve({ id: alarmId }, index) {
            let { id: room_id, partner_id } = this.bedInfo;
            let params = (params = {
                id: alarmId,
                belong: "nursing",
                type: "all",
                room_id,
                bed_id : "",
                partner_id: "",
            });

            handleAlarmPrompt(params)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let warn_qty = res.data.warn_qty;
                        this.renderData.splice(index, 1);
                        this.resolveRoomAlarm({
                            id : room_id,
                            warn_qty,
                        });

                        if(this.renderData.length === 0){
                            console.log("无剩余未处理")
                            this.deleteRoomData({
                                id : room_id,
                            })
                            this.$emit('update:popOverVisible', false);
                        }

                        this.$message({
                            showClose: true,
                            message: "处理成功!",
                            type: "success",
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        showClose: true,
                        message: "处理失败!",
                        type: "warning",
                    });
                    console.warn("err", err);
                });
        },

        //处理智能告警实时语音
        handleRTCCall(item, index) {
            let { talk_url, alarming_date } = item;
            let alarmDate = new Date(alarming_date).getTime();
            let currentDate = new Date().getTime();
            if (Math.abs(alarmDate - currentDate) > 29 * 60 * 1000) {
                this.$message({
                    showClose: true,
                    message: "超时：无法通话-语音通话仅限报警发生30分钟内，请尝试其他联系方式.",
                    type: "warning",
                });
                return;
            }
            this.openRTCCallDlg_inject(talk_url);
            this.handleAlarmResolve(item, index);
        },
    },
};
</script>

<style scoped>
@import url("~@/styles/alarmDlg.css");

::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
}

/*---按钮---*/
.alarm-item-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.alarm-item-right .phone-btn {
    padding: 0.3rem;
}
</style>