<template>
    <section ref="cardsWrap" class="main-wrap" :class="displayClass">
        <template>
            <component
                v-for="(item, index) in renderData.data"
                :renderInfo="item"
                :is="displayComponentName"
                :key="index"
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

        <div ref="audioWrap" style="display: none"></div>
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
import AlertNotification from "../components/Dialogs/AlertNotification.vue";

import moment from "moment";

import { isInViewPort, sleep } from "@/utils/index.js";

import { getAudioUrl } from "@/api/dict.js";

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

        AlertNotification,
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

            //告警弹窗队列
            alertNotifyQueue: [],
        };
    },

    computed: {
        ...mapGetters(["renderData", "displayRow", "roomData", "originData", "offlineData"]),

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

    watch: {
        renderData: {
            handler(newValue) {
                console.log("renderData--now", newValue);
            },
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

        this.setSocketHandler();
    },

    methods: {
        ...mapActions("data", [
            "updateRoomData",
            "setRoomAlertStatus",
            "resolveRoomAlarm",
            "addRoomData",
            "deleteRoomData",
            "updateBedData",
            "setBedAlertStatus",
            "resolveBedAlarm",
            "updateBedVitalData",
            "updateOfflineData",
        ]),

        //设置socket数据处理
        setSocketHandler() {
            this.$socket.registerCallBack("init", (msg) => {
                let jsonData = "";
                try {
                    jsonData = JSON.parse(msg?.data ?? null);
                } catch (err) {
                    return;
                }

                console.log("jsonData", jsonData);

                let operation = jsonData?.operation;
                let data = jsonData?.data ?? [];
                switch (operation) {
                    //处理床位告警
                    case "f_bed_warning_iot":
                        data = data.map((item) => {
                            Object.assign(item, {
                                alarm_msg: item.alarming,
                                persons: [
                                    {
                                        name: item.pop_show.name,
                                    },
                                ],
                            });
                            return item;
                        });

                        //触发语音告警
                        data.forEach(item => {
                            this.doTalk(getAudioUrl(item.audio_name));
                        })

                        this.handleBedSocket(data);
                        break;

                    //处理房间告警
                    case "fm_room_all_iot":
                        //触发语音告警
                        data.forEach(item => {
                            this.doTalk(getAudioUrl(item.audio_name));
                        })
                        
                        this.handleRoomSocket(data);
                        break;

                    //处理设备离线告警
                    case "fm_offline_iot":

                        let audioAlert = data.find(item => {
                            return item.sign === '1';
                        })

                        //触发语音告警
                        if (audioAlert) {
                            this.doTalk(getAudioUrl(item.audio_name));
                        }

                        this.handleOfflineSocket(data);
                        break;

                    case "f_bed_vital_iot":
                        this.handleVitalSignSocket(data);
                        break;
                }
            });
        },

        //处理socket床位告警
        handleBedSocket(data) {
            let { id } = data[0];
            if (this.originData.find((item) => item.id === id)) {
                this.updateBedData(data);
            }

            let cards = [...this.$refs.cardsWrap.querySelectorAll(".el-card")];
            let alertCardIndex = this.renderData.data.findIndex(
                (item) => item.id === id
            );

            if (alertCardIndex === -1) {
                //未渲染当前卡片右下角弹窗
                this.openAlarmNotification(data, this.handleResolveBedAlert);
                return;
            } else if (!isInViewPort(cards[alertCardIndex])) {
                //卡片不在可视区域内右下角弹窗
                this.openAlarmNotification(data, this.handleResolveBedAlert);
            } else {
                //卡片在可视区域内卡片弹窗
                this.setBedAlertStatus({
                    id,
                    alertFlag: true,
                });
            }
        },

        //处理socket房间告警
        handleRoomSocket(data) {
            let { id } = data[0];
            if (this.roomData.find((item) => item.id === id)) {
                this.updateRoomData(data);
            } else {
                this.addRoomData(data);
            }
            console.log("renderData", this.renderData);

            let cards = [...this.$refs.cardsWrap.querySelectorAll(".el-card")];
            let alertCardIndex = this.renderData.data.findIndex(
                (item) => item.id === id
            );

            if (alertCardIndex === -1) {
                //未渲染当前卡片右下角弹窗
                this.openAlarmNotification(data, this.handleResolveRoomAlert);
                return;
            } else if (!isInViewPort(cards[alertCardIndex])) {
                //卡片不在可视区域内右下角弹窗
                this.openAlarmNotification(data, this.handleResolveRoomAlert);
            } else {
                //卡片在可视区域内卡片弹窗
                this.setRoomAlertStatus({
                    id,
                    alertFlag: true,
                });
            }

            // isInViewPort
            // setTimeout(() => {
            //     this.setRoomAlertStatus({
            //         id,
            //         alertFlag: true,
            //     });
            // }, 500);

            // this.openAlarmNotification(data, this.handleResolveRoomAlert);
        },

        //处理设备离线告警
        handleOfflineSocket(data) {
            let { id } = data[0];
            if (this.offlineData.find((item) => item.id === id)) {
                this.updateOfflineData(data);
            }

            this.openAlarmNotification(data, this.handleResolveOfflineAlert);
        },

        //处理生命体征消息推送
        handleVitalSignSocket(data) {
            this.updateBedVitalData(data);
        },

        //打开页面右下角告警弹窗
        openAlarmNotification(data, alertCallBack) {
            console.log("this-->", this);
            let vm = this;
            console.log("data-->", data);
            let params = Object.assign({}, data[0], {
                msg_text: data[0].alarm_msg,
            });
            const h = this.$createElement;

            if (this.alertNotifyQueue.length > 4) {
                this.handleAlarmPopoverClose();
            }

            let notifyInstance = this.$notify({
                message: h(AlertNotification, {
                    props: {
                        renderInfo: params,
                    },

                    on: {
                        countover: this.handleAlarmPopoverClose,
                        resolveAlert: alertCallBack,
                    },
                }),
                duration: 0,
                showClose: false,
                customClass: "alert-notification",
                position: "bottom-right",
            });

            this.alertNotifyQueue.push(notifyInstance);
        },

        //处理页面右下角告警弹窗关闭
        handleAlarmPopoverClose(target) {
            console.log("close--");
            if (target) {
                let instanceIndex = this.alertNotifyQueue.findIndex(
                    (item) => item === target
                );
                this.alertNotifyQueue[instanceIndex]?.close();
                this.alertNotifyQueue.splice(instanceIndex, 1);
                return;
            }

            let instance = this.alertNotifyQueue.shift();
            instance?.close();
        },

        //处理页面右下角床铺弹窗告警
        handleResolveBedAlert(params) {
            let { id, alertFlag, notifyInstance, qty } = params;
            this.resolveBedAlarm({ id, alertFlag });
            this.handleAlarmPopoverClose(notifyInstance);
        },

        //处理页面右下角房间弹窗告警
        handleResolveRoomAlert(params) {
            let { id, alertFlag, notifyInstance, qty } = params;
            this.resolveRoomAlarm({ id, alertFlag });
            this.handleAlarmPopoverClose(notifyInstance);

            if (qty === 1) {
                console.log("无剩余未处理");
                this.deleteRoomData({
                    id,
                });
            }
        },

        //处理页面右下角设备离线告警
        handleResolveOfflineAlert(params){
            let {notifyInstance} = params;
            this.handleAlarmPopoverClose(notifyInstance);
        },

        //打开老人信息窗体
        openElderDlg(id) {
            getElderlyData({
                bed_id: id,
                belong: "household",
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
                            moment().subtract(1, "days").format("YYYY-MM-DD")
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
                belong: "household",
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
            date = moment().subtract(1, "days").format("YYYY-MM-DD")
        ) {
            return getElderlyHealthReport({
                partner_id: id,
                report_date: date,
            });
        },

        //创建语音播报
        creatAudio(url) {
            let shell = this.$refs.audioWrap;
            let audio = document.createElement("audio");
            audio.autoplay = true;
            setTimeout(() => {
                audio.src = url;
            }, 0);

            shell.appendChild(audio);
            audio.play();
        },

        //开启语音播报
        async doTalk(url) {
            console.log('url', url);
            this.creatAudio(url);
            await sleep(5500);
            this.creatAudio(url);
            await sleep(5500);
            this.creatAudio(url);
        },
    },
};
</script>

<style scoped>
@import url("~@/styles/alertNotification.css");

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