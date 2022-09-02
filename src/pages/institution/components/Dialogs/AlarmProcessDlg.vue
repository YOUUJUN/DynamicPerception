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
    },

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
        ...mapActions("data", ["resolveBedAlarm", "resolveRoomAlarm"]),

        //处理告警
        handleAlarmResolve(item, index) {
            if (["1", "2", "3", "4"].includes(this.displayCategory)) {
                this.doBedAlarmResolve(item, index);
            } else if (["6"].includes(this.displayCategory)) {
                this.doRoomAlarmResolve(item, index);
            }
        },

        //处理床铺告警
        doBedAlarmResolve({ id: alarmId }, index) {
            let { id: roomId, partner_id } = this.bedInfo;
            let params = {
                id: alarmId,
                belong: "household",
                type: "",
                room_id: "",
                partner_id,
            };

            handleAlarmPrompt(params)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let warn_qty = res.data.warn_qty;
                        this.renderData.splice(index, 1);
                        this.resolveBedAlarm({
                            partner_id,
                            warn_qty,
                        });

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
                belong: "household",
                type: "all",
                room_id,
                partner_id: "",
            });

            handleAlarmPrompt(params)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let warn_qty = res.data.warn_qty;
                        this.renderData.splice(index, 1);
                        this.resolveRoomAlarm({
                            room_id,
                            warn_qty,
                        });

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
    },
};
</script>

<style scoped>
@import url("~@/styles/alarmDlg.css");

::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
}
</style>