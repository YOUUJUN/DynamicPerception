
<template>
    <el-card class="room-card-by6-wrap">
        <div class="card-header">
            <div class="card-header-left"></div>

            <span class="card-name" @click="openRoomInfoDlg(renderInfo.id)">{{ renderInfo.name }}</span>

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

        <div class="card-body-wrap">
            <el-scrollbar style="height: 100%">
                <ul class="card-body">
                    <li
                        class="card-item"
                        v-for="(item, index) in renderInfo.persons"
                    >
                        <div class="card-item-left">
                            <img
                                src="@/static/img/normalStatus.png"
                                class="status-icon"
                            />
                            <span class="status-label">床位</span>
                        </div>
                        <div class="card-item-right">
                            <span class="status-name">{{ item.name }}</span>
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
        </div>

        <div class="card-footer">
            <el-alert class="card-warning" type="warning" :closable="false">
                <template slot="title">
                    <div class="warning-wrap">
                        <div class="warning-wrap-left">
                            <img
                                class="warning-icon"
                                src="@/static/img/redAlarming.png"
                            />
                            <span class="warning-label">告警</span>
                        </div>

                        <div class="warning-wrap-right">
                            <span class="warning-status">{{
                                renderInfo.msg_text
                            }}</span>
                        </div>
                    </div>
                </template>
            </el-alert>
        </div>
    </el-card>
</template>

<script>
const AlarmProcessDlg = () => import('@/components/Dialogs/AlarmProcessDlg.vue')
import { getAllRoomAlarmInfo } from "@/api/dataSource.js";
export default {

    components : {
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

    inject : ['openRoomInfoDlg_inject'],

    methods: {
        //打开房间信息窗体
        openRoomInfoDlg(id){
            this.openRoomInfoDlg_inject(id)
        },

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
.room-card-by6-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem 0 !important;
}

.card-warning .el-alert__content {
    width: 100%;
}
</style>

<style scoped>
@import url("~@/styles/alarmDlg.css");

.room-card-by6-wrap {
    width: auto;
    height: 26rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    flex: none;
}

.card-header-left{
    width:3rem;
}

.card-name {
    font-size: 2.2rem;
    font-weight: bold;
    color: #18171d;
    text-align: center;
    padding: 0 .6rem;
    cursor: pointer;
}

.card-name:hover {
    color: #439df7;
}

.card-num {
    display: flex;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
}

.card-body-wrap {
    flex: auto;
    overflow: auto;
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
    padding: 0.8rem 0;
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
    width: 8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.status-name {
    font-size: 1.4rem;
}

.card-footer {
    flex: none;
    padding: 0 1.5rem;
}

/*---页脚警告---*/
.warning-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.warning-wrap-left {
    display: flex;
    align-items: center;
}

.warning-icon {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
}
</style>