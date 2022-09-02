
import { getAllData, getOfflineData, getRoomData } from "../../api/dataSource.js";

const state = {
    uid: window.uid,

    menu: {
        checkedKeys: [],
        expandedKeys: [],
        selectedKey: "",
        data: [],
        filters: [], //菜单过滤项
    },

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

    SET_ORIGIN_DATA(state, payload) {
        state.originData = payload;
    },

    SET_OFFLINE_DATA(state, payload) {
        state.offlineData = payload;
    },

    SET_ROOM_DATA(state, payload) {
        state.roomData = payload;
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
        let rowData = state.roomData.find(
            (data) => data.id === room_id
        );
        rowData.qty = warn_qty;
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
                commit("CHANGE_ROOM_ALARM_QTY", payload);
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
