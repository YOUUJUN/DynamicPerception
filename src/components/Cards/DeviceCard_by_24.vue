<template>
    <el-card class="device-card-by24-wrap">
        <div class="card-header">
            <el-popover
                popper-class="device-popover"
                placement="right"
                width="240"
                trigger="click"
            >
                
                <device-card-by-six :renderInfo="renderInfo"></device-card-by-six>

                <span slot="reference" class="card-name">{{
                    renderInfo.name
                }}</span>
            </el-popover>
        </div>
    </el-card>
</template>

<script>
const DeviceCardBySix = () => import("@/components/Cards/DeviceCard_by_6.vue");
import { getUnsolvedAlarmInfo } from "@/api/dataSource.js";
export default {

    components : {
        DeviceCardBySix
    },

    props: {
        renderInfo: {
            type: Object,
        },
    },

    data() {
        return {

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
.device-card-by24-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.device-popover{
    padding: 0;
}
</style>

<style scoped>
@import url("~@/styles/alarmDlg.css");

.device-card-by24-wrap {
    width: auto;
    height: 8rem;
}

.device-card-by24-wrap .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 0.2rem;
}

.device-card-by24-wrap .card-name {
    font-size: 1.4rem;
    color: #18171d;
    text-align: center;
    cursor: pointer;
}

.device-card-by24-wrap .card-name:hover {
    color: #439df7;
}

</style>


<style scoped>
.card-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 26rem;
}

.device-popover .card-name{
    font-size: 2.6rem;
    color: #18171d;
}

.card-body {
    flex: auto;
    display: flex;
    height: 100%;
    overflow: hidden;
}

.card-list {
    font-size: 1.5rem;
    list-style: none;
    padding: 0 1.5rem;
    width: 100%;
}

.card-list .card-item {
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
    width: 14rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.status-name {
    font-size: 1.4rem;
}
</style>

<style scoped>
.device-popover .device-card-by6-wrap{
    box-shadow: unset;
    border: none;
}
</style>
