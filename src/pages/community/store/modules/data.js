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
    allRoomDic : [],

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

    SET_ALL_ROOM_DIC(state, payload){
        let rooms = [];
        for(let plot of payload[0].items){
            let roomData = plot.items.map(item => {
                Object.assign(item, {
                    res_community_id : payload[0].id,
                    community_id : plot.id,
                })
                return item;
            })
            rooms.push(...roomData);
        }
        state.allRoomDic = rooms;
    },

    SET_ORIGIN_DATA(state, payload) {
        state.originData = payload;
    },

    SET_OFFLINE_DATA(state, payload) {
        state.offlineData = payload;
    },

    SET_ROOM_DATA(state, payload) {
        let roomData = payload.map((item) => {
            Object.assign(item, {
                alertFlag: false,
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

    CHANGE_BED_ALARM_QTY(state, payload) {
        let { partner_id, warn_qty } = payload;
        let rowData = state.originData.find(
            (data) => data.partner_id === partner_id
        );
        rowData.qty = warn_qty;
    },

    CHANGE_ROOM_ALARM_QTY(state, payload) {
        let { room_id, warn_qty } = payload;
        let rowData = state.roomData.find((data) => data.id === room_id);
        rowData.qty = warn_qty;
    },

    REDUCE_ROOM_ALARM_QTY(state, payload) {
        let { room_id } = payload;
        let rowData = state.roomData.find((data) => data.id === room_id);
        rowData.qty--;
    },

    UPDATE_ROOM_DATA(state, payload) {
        let rooms = payload;
        for (let room of rooms) {
            let oldRoom = state.roomData.find((item) => item.id === room.id);
            Object.assign(oldRoom, {
                alertFlag: false,
            });
            setTimeout(() => {
                Object.assign(oldRoom, {
                    persons: room.persons,
                    qty: room.qty,
                    msg_text: room.alarm_msg,
                    warn_id : room.warn_id,

                    alertFlag: true,
                });
            }, 500);
        }
    },

    ADD_ROOM_DATA(state, payload){
        let newRooms = payload.map(item => {
            console.log('state.allRoomDic', state.allRoomDic);
            let roomData = state.allRoomDic.find(room => room.id === item.id)
            console.log('roomData1', roomData);
            Object.assign(item, roomData, {
                alertFlag: true,
            })
            return item;
        });
        console.log('newRooms', newRooms);
        state.roomData.unshift(...newRooms);
        console.log('roomData', state.roomData);
    },

    DELETE_ROOM_DATA(state, payload){
        let { room_id } = payload;
        let roomIndex = state.roomData.findIndex(item => item.id === room_id);
        state.roomData.splice(roomIndex, 1);
    },

    CHANGE_ROOM_ALERT_STATUS(state, payload) {
        let { room_id, alertFlag } = payload;
        let rowData = state.roomData.find((data) => data.id === room_id);
        rowData.alertFlag = alertFlag;
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
                            if (
                                item.sign === "0" &&
                                item.mech_name === state.menu.data[0].name
                            ) {
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

    //处理床铺告警
    resolveBedAlarm({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            try {
                commit("CHANGE_BED_ALARM_QTY", payload);
                resolve();
            } catch {
                reject();
            }
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
    addRoomData({ state, commit }, payload){
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
    deleteRoomData({ state, commit }, payload){
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
