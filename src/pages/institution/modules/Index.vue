<template>
    <section class="main-wrap" :class="displayClass">
        <template>
            <component
                v-for="item in renderData.data"
                :renderInfo="item"
                :is="displayComponentName"
            ></component>
        </template>

        <elder-info-dlg
            ref="elderDlg"
            :elderInfo="elderInfo"
            :visible.sync="elderDlgVisible"
        ></elder-info-dlg>

        <health-report-dlg
            ref="reportDlg"
            :partnerId="partner_id"
            :reportInfo="reportInfo"
            :visible.sync="reportDlgVisible"
        ></health-report-dlg>

        <room-info-dlg
            :visible.sync="roomDlgVisible"
            :roomInfo="roomInfo"
        ></room-info-dlg>
    </section>
</template>

<script>
const BedCardBySix = () => import("../components/Cards/BedCard_by_6.vue");
const BedCardByTwelve = () => import("../components/Cards/BedCard_by_12.vue");
const BedCardByTwentyfour = () =>
    import("../components/Cards/BedCard_by_24.vue");
const DeviceCardBySix = () => import("../components/Cards/DeviceCard_by_6.vue");
const DeviceCardByTwelve = () =>
    import("../components/Cards/DeviceCard_by_12.vue");
const DeviceCardByTwentyfour = () =>
    import("../components/Cards/DeviceCard_by_24.vue");
const RoomCardBySix = () => import("../components/Cards/RoomCard_by_6.vue");
const RoomCardByTwelve = () => import("../components/Cards/RoomCard_by_12.vue");
const RoomCardByTwentyfour = () =>
    import("../components/Cards/RoomCard_by_24.vue");

const ElderInfoDlg = () => import("../components/Dialogs/ElderInfoDlg.vue");
const HealthReportDlg = () =>
    import("../components/Dialogs/HealthReportDlg.vue");
const RoomInfoDlg = () => import("../components/Dialogs/RoomInfoDlg.vue");

import { mapGetters, mapActions } from "vuex";
import {
    getElderlyData,
    getElderlyHealthReport,
    getRoomInfo,
} from "../api/dataSource.js";

export default {
    components: {
        BedCardBySix,
        BedCardByTwelve,
        BedCardByTwentyfour,
        DeviceCardBySix,
        DeviceCardByTwelve,
        DeviceCardByTwentyfour,
        RoomCardBySix,
        RoomCardByTwelve,
        RoomCardByTwentyfour,

        ElderInfoDlg,
        HealthReportDlg,
        RoomInfoDlg,
    },

    data() {
        return {
            //老人信息窗体控制
            elderDlgVisible: false,
            //老人窗体信息数据
            elderInfo: {},

            //老人健康报告窗体控制
            reportDlgVisible: false,
            reportInfo: {},
            //老人健康报告获取数据id
            partner_id: 0,
            reportId: 0,

            //房间信息窗体控制
            roomDlgVisible: false,
            roomInfo: {},
        };
    },

    computed: {
        ...mapGetters(["renderData", "displayRow"]),

        displayClass() {
            let displayRow = this.displayRow;
            let className = "";
            switch (displayRow) {
                case "X6":
                    className = "grid-by-6";
                    break;
                case "X12":
                    className = "grid-by-12";
                    break;
                case "X24":
                    className = "grid-by-24";
                    break;
            }
            return className;
        },

        displayComponentName() {
            let role = this.renderData.role;
            let displayRow = this.displayRow;
            let componentName = "";
            switch (displayRow) {
                case "X6":
                    if (role === "bed") {
                        componentName = "BedCardBySix";
                    } else if (role === "device") {
                        componentName = "DeviceCardBySix";
                    } else if (role === "room") {
                        componentName = "RoomCardBySix";
                    }
                    break;
                case "X12":
                    if (role === "bed") {
                        componentName = "BedCardByTwelve";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwelve";
                    } else if (role === "room") {
                        componentName = "RoomCardByTwelve";
                    }
                    break;
                case "X24":
                    if (role === "bed") {
                        componentName = "BedCardByTwentyfour";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwentyfour";
                    } else if (role === "room") {
                        componentName = "RoomCardByTwentyfour";
                    }
                    break;
            }
            return componentName;
        },
    },

    provide() {
        return {
            openElderDlg_inject: this.openElderDlg,
            openHealthReportDlg_inject: this.openHealthReportDlg,
            openRoomInfoDlg_inject: this.openRoomInfoDlg,
            fetchElderHealthReportByTime_inject:
                this.fetchElderHealthReportByTime,
        };
    },

    created() {
        console.log("renderData", this.renderData);
    },

    methods: {
        //打开老人信息窗体
        openElderDlg(id) {
            getElderlyData({
                bed_id: id,
                belong: "nursing",
            })
                .then((res) => {
                    console.log("res -->", res);
                    if (res.status === 200) {
                        let bedInfo = res.data.data[0];
                        this.elderInfo = bedInfo;
                        this.elderDlgVisible = true;
                    }
                })
                .catch((err) => {
                    console.warn("err", err);
                });
        },

        //打开老人健康报告窗体
        openHealthReportDlg(id) {
            this.fetchElderHealthReportByTime(id)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        let reportInfo = res.data.data[0] ?? {};
                        this.partner_id = id;
                        this.$refs.reportDlg.setReportDate(
                            new Date().Format("yyyy-MM-dd")
                        );
                        this.reportInfo = reportInfo;
                        console.log("reportInfo", this.reportInfo);
                        this.reportDlgVisible = true;
                    }
                })
                .catch((err) => {
                    console.warn("err", err);
                });
        },

        //打开房间信息窗体
        openRoomInfoDlg(id) {
            getRoomInfo({
                room_id: id,
                belong: "nursing",
            })
                .then((res) => {
                    console.log("res -->", res);
                    if (res.status === 200) {
                        let roomInfo = res.data;
                        this.roomInfo = roomInfo;
                        this.roomDlgVisible = true;
                    }
                })
                .catch((err) => {
                    console.warn("err", err);
                });
            
        },

        //通过时间获取老人健康报告信息
        fetchElderHealthReportByTime(
            id,
            date = new Date().Format("yyyy-MM-dd")
        ) {
            return getElderlyHealthReport({
                partner_id: id,
                report_date: date,
            });
        },
    },
};
</script>

<style scoped>
.main-wrap {
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 2rem;
}

.grid-by-6 {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 5rem;
    grid-row-gap: 5rem;
    align-items: start;
}

.grid-by-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 1rem !important;
}

.grid-by-24 {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(24, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    padding: 0.5rem !important;
}
</style>