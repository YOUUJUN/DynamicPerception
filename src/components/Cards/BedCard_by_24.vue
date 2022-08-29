<template>
    <el-card class="bed-card-by24-wrap">
        <div class="card-header">
            <span class="card-name">{{ renderInfo.name }}</span>
        </div>

        <div class="card-body">
            <el-popover
                popper-class="alarm-popover"
                width="220"
                placement="right"
                trigger="click"
                v-model="popOverVisible"
            >
                <section class="alarm-list-wrap">
                    <el-scrollbar style="height: 100%">
                        <ul class="alarm-list">
                            <li
                                class="alarm-item"
                                v-for="(item, index) in alarmList"
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
                    trigger="manual"
                    @click="fetchUnsolvedAlarms(renderInfo.id)"
                    >{{ renderInfo.qty }}</el-button
                >
            </el-popover>
        </div>
    </el-card>
</template>

<script>
import { getUnsolvedAlarmInfo } from "@/api/dataSource.js";
export default {
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
</style>

<style scoped>
@import url("~@/styles/alarmDlg.css");

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
    font-size: 1.1rem;
    color: #18171d;
    text-align: center;
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