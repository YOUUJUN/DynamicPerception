import {
    getAllData,
    getOfflineData,
    getRoomData,
} from "../../api/dataSource.js";

const state = {
    uid: window.uid,

    menu: {
        checkedKeys: [],
        expandedKeys: [],
        selectedKey: "",
        data: [],
        filters: [], //菜单过滤项
    },

    //所有房间数据
    allRoomDic: [],

    //初始床位和房间数据源
    originData: [],

    //离线数据源
    offlineData: [],

    //告警房间数据源
    roomData: [],
};

const mutations = {
    SET_MENU_DATA(state, payload) {
        state.menu.data = payload;
        state.menu.checkedKeys = [payload[0].id];
        state.menu.expandedKeys = [payload[0].id];
        state.menu.selectedKey = payload[0].id;
        state.menu.filters = [
            {
                id: payload[0].id,
                level: 1,
            },
        ];
    },

    SET_ALL_ROOM_DIC(state, payload) {
        let rooms = [];
        for (let plot of payload[0].items) {
            let roomData = plot.items.map((item) => {
                Object.assign(item, {
                    res_community_id: payload[0].id,
                    community_id: plot.id,
                });
                return item;
            });
            rooms.push(...roomData);
        }
        state.allRoomDic = rooms;
    },

    SET_ORIGIN_DATA(state, payload) {
        let originData = payload.map((item) => {
            Object.assign(item, {
                persons: [
                    {
                        name: item.pop_show.name,
                    },
                ],
                alertFlag: false,
                category: "bed",
                in_out_bed: item.status,
            });
            return item;
        });
        state.originData = originData;
    },

    SET_OFFLINE_DATA(state, payload) {
        state.offlineData = payload;
    },

    SET_ROOM_DATA(state, payload) {
        let roomData = payload.map((item) => {
            Object.assign(item, {
                alertFlag: false,
                category: "room",
            });
            return item;
        });
        state.roomData = roomData;
    },

    CHANGE_MENU_CHECKED(state, payload) {
        console.log("payload", payload);
        if (Array.isArray(payload)) {
            state.menu.checkedKeys = payload;
            console.log(("state.menu.checkedKeys", state.menu.checkedKeys));
        }
    },

    SET_MENU_FILTERS(state, payload) {
        state.menu.filters = payload;
    },

    /*---------房间-----------*/

    CHANGE_ROOM_ALARM_QTY(state, payload) {
        let { id, warn_qty } = payload;
        let rowData = state.roomData.find((data) => data.id === id);
        rowData.qty = warn_qty;
    },

    REDUCE_ROOM_ALARM_QTY(state, payload) {
        let { id } = payload;
        let rowData = state.roomData.find((data) => data.id === id);
        rowData.qty--;
    },

    UPDATE_ROOM_DATA(state, payload) {
        let rooms = payload;
        for (let room of rooms) {
            let oldRoom = state.roomData.find((item) => item.id === room.id);
            Object.assign(oldRoom, {
                persons: room.persons,
                qty: room.qty,
                msg_text: room.alarm_msg,
                warn_id: room.warn_id,
            });
        }
    },

    ADD_ROOM_DATA(state, payload) {
        let newRooms = payload.map((item) => {
            console.log("state.allRoomDic", state.allRoomDic);
            let roomData = state.allRoomDic.find((room) => room.id === item.id);
            console.log("roomData1", roomData);
            Object.assign(item, roomData, {
                alertFlag: true,
                msg_text: item.alarm_msg,
                category: "room",
            });
            return item;
        });
        console.log("newRooms", newRooms);
        state.roomData.unshift(...newRooms);
        console.log("roomData", state.roomData);
    },

    DELETE_ROOM_DATA(state, payload) {
        let { id } = payload;
        let roomIndex = state.roomData.findIndex((item) => item.id === id);
        state.roomData.splice(roomIndex, 1);
    },

    CHANGE_ROOM_ALERT_STATUS(state, payload) {
        let { id, alertFlag } = payload;
        let rowData = state.roomData.find((data) => data.id === id);
        if (alertFlag === true) {
            rowData.alertFlag = false;
            setTimeout(() => {
                rowData.alertFlag = alertFlag;
            }, 500);
        } else {
            rowData.alertFlag = alertFlag;
        }
    },

    /*---------床位-----------*/

    UPDATE_BED_DATA(state, payload) {
        let beds = payload;
        for (let bed of beds) {
            let oldBed = state.originData.find((item) => item.id === bed.id);
            Object.assign(oldBed, {
                qty: bed.qty,
                alarming: bed.pop_show.state,
                msg_text: bed.alarming,
                warn_id: bed.warn_id,
                status: bed.status ?? "--",
                heart: bed?.heart ?? "--",
                breathing: bed?.breathing ?? "--",
                alarming: bed?.alarming ?? "--",
                pop_show: bed?.pop_show,
            });
        }
    },

    UPDATE_BED_Vital_DATA(state, payload) {
        let beds = payload;
        for (let bed of beds) {
            let oldBed = state.originData.find((item) => item.id === bed.id);
            if (oldBed) {
                Object.assign(oldBed, {
                    status: bed?.status ?? "--",
                    in_out_bed: bed?.in_out_bed ?? "",
                    heart: bed?.heart ?? "--",
                    breathing: bed?.breathing ?? "--",
                });
            }
        }
    },

    CHANGE_BED_ALERT_STATUS(state, payload) {
        let { id, alertFlag } = payload;
        let rowData = state.originData.find((data) => data.id === id);
        if (alertFlag === true) {
            rowData.alertFlag = false;
            setTimeout(() => {
                rowData.alertFlag = alertFlag;
            }, 500);
        } else {
            rowData.alertFlag = alertFlag;
        }
    },

    CHANGE_BED_ALARM_QTY(state, payload) {
        let { id, warn_qty } = payload;
        let rowData = state.originData.find((data) => data.id === id);
        rowData.qty = warn_qty;
    },

    REDUCE_BED_ALARM_QTY(state, payload) {
        let { id } = payload;
        let rowData = state.originData.find((data) => data.id === id);
        rowData.qty--;
    },

    /*---------离线-----------*/

    UPDATE_OFFLINE_DATA(state, payload) {
        let devices = payload;
        for (let device of devices) {
            let oldDevice = state.offlineData.find(
                (item) => item.id === device.id
            );
            Object.assign(oldDevice, {
                devices: device.devices,
                qty: device.qty,
                off_qty: device.off_qty,
                sign: "0",
            });
        }
    },
};

const actions = {
    //获取所有床铺数据
    fetchData({ state, commit }) {
        return new Promise((resolve, reject) => {
            getAllData({
                uid: state.uid,
            })
                .then((res) => {
                    console.log("res-->", res);
                    let navData = res.data.navs;
                    let originData = res.data.data;
                    commit("SET_MENU_DATA", navData);
                    commit("SET_ORIGIN_DATA", originData);
                    commit("SET_ALL_ROOM_DIC", navData);
                    resolve();
                })
                .catch((err) => {
                    console.log("err", err);
                    reject();
                });
        });
    },

    //获取离线设备数据
    fetchOfflineData({ state, commit }) {
        return new Promise((resolve, reject) => {
            getOfflineData({
                uid: state.uid,
            })
                .then((res) => {
                    console.log("offline res", res);
                    if (res.status === 200) {
                        let result = res.data.data;
                        let offlineData = result.filter((item) => {
                            if (item.mech_name === state.menu.data[0].name) {
                                return item;
                            }
                        });
                        console.log("offlineData", offlineData);
                        commit("SET_OFFLINE_DATA", offlineData);
                    }

                    resolve();
                })
                .catch((err) => {
                    console.error("err", err);
                    reject();
                });
        });
    },

    //获取房间告警数据
    fetchRoomData({ state, commit }) {
        return new Promise((resolve, reject) => {
            getRoomData({
                uid: state.uid,
            })
                .then((res) => {
                    console.log("room res", res);
                    if (res.status === 200) {
                        let result = res.data.data;
                        let roomData = result;
                        console.log("roomData", roomData);
                        commit("SET_ROOM_DATA", roomData);
                    }

                    resolve();
                })
                .catch((err) => {
                    console.error("err", err);
                    reject();
                });
        });
    },

    //处理房间告警
    resolveRoomAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("REDUCE_ROOM_ALARM_QTY", payload);
                commit("CHANGE_ROOM_ALERT_STATUS", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //修改菜单选中项
    changeMenuChecked({ state, commit }, payload) {
        commit("CHANGE_MENU_CHECKED", payload);
    },

    //设置菜单过滤条件
    setMenuFilters({ state, commit }, payload) {
        commit("SET_MENU_FILTERS", payload);
    },

    /*---------房间-----------*/

    //更新房间信息
    updateRoomData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("UPDATE_ROOM_DATA", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //添加新告警房间
    addRoomData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("ADD_ROOM_DATA", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //删除告警房间
    deleteRoomData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("DELETE_ROOM_DATA", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //改变房间告警状态
    setRoomAlertStatus({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("CHANGE_ROOM_ALERT_STATUS", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    /*---------床位-----------*/

    //更新床位信息
    updateBedData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("UPDATE_BED_DATA", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //更新床位生命体征信息
    updateBedVitalData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("UPDATE_BED_Vital_DATA", payload);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    },

    //改变床位告警状态
    setBedAlertStatus({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("CHANGE_BED_ALERT_STATUS", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    //处理床位告警
    resolveBedAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("REDUCE_BED_ALARM_QTY", payload);
                commit("CHANGE_BED_ALERT_STATUS", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },

    /*---------离线-----------*/

    updateOfflineData({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("UPDATE_OFFLINE_DATA", payload);
                resolve();
            } catch {
                reject();
            }
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
