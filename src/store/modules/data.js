import request from "@/utils/http";
import { getAction, postAction } from "@/api/manage.js";
import { getAllData, getOfflineData } from "@/api/dataSource.js";

import qs from "qs";

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
    offlineData : [],
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
};

const actions = {
    //获取所有数据
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

    fetchOfflineData({ state, commit }) {
        return new Promise((resolve, reject) => {
            getOfflineData({
                uid: state.uid,
            });
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
