
<template>
    <el-card class="bed-card-by6-wrap">
        <div class="card-header">
            <img
                v-if="getGender === 'male'"
                class="card-avatar"
                src="@/static/offlineImg/male.png"
                @click="openElderDlg(renderInfo.id)"
            />

            <img
                v-else
                class="card-avatar"
                src="@/static/offlineImg/female.png"
                @click="openElderDlg(renderInfo.id)"
            />

            <span class="card-name">{{ renderInfo.name }}</span>

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

        <ul class="card-body">
            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalStatus.png"
                        class="status-icon"
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
                        src="@/static/img/normalHeart.png"
                        class="status-icon"
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
                        src="@/static/img/normalBreathing.png"
                        class="status-icon"
                    />
                    <span class="status-label">呼吸</span>
                </div>
                <div class="card-item-right">
                    <span class="status-name">{{ renderInfo.breathing }}</span>
                </div>
            </li>

            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalAlarming.png"
                        class="status-icon"
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
            <el-button class="btn" type="info" size="small" round @click="openHealthReportDlg(renderInfo.partner_id)"
                >查看报告</el-button
            >
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

    computed: {
        getGender() {
            let info = this.renderInfo;
            console.log("info");
            let avatarUrl = info?.pop_show?.img;
            let imgName = avatarUrl && avatarUrl.split("/").pop();
            if (imgName?.trim() === "male.png") {
                return "male";
            } else {
                return "female";
            }
        },
    },

    inject : ['openElderDlg_inject', 'openHealthReportDlg_inject'],

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

        //打开老人信息窗体
        openElderDlg(id) {
            this.openElderDlg_inject(id)
        },

        //打开健康报告窗体
        openHealthReportDlg(id){
            this.openHealthReportDlg_inject(id)
        }
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
@import url("~@/styles/alarmDlg.css");

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
    font-size: 2.2rem;
    color: #18171d;
    text-align: center;
    padding: 0 6px;
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