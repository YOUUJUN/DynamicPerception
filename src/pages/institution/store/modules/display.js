const state = {
    displayRow: "X6",
    /**
     * 全部 1
     * 在床 2
     * 离床 3
     * 告警 4
     * 设备离线 5
     * 房间告警 6
     * displayCategory
     */
    displayCategory : '1',
    displayCategoryMap : new Map([
        ['1' , '全部'],
        ['2' , '在床'],
        ['3' , '离床'],
        ['4' , '告警'],
        ['5' , '设备离线'],
        ['6' , '房间告警'],
    ]),
};

const mutations = {
    CHANGE_DISPLAY_ROW(state, payload) {
        state.displayRow = payload;
    },

    CHANGE_DISPLAY_CATEGORY(state, payload) {
        state.displayCategory = payload;
    },
};

const actions = {
    changeDisplayRow({ commit }, payload) {
        commit("CHANGE_DISPLAY_ROW", payload);
    },

    changeDisplayCategory({ commit }, payload) {
        commit("CHANGE_DISPLAY_CATEGORY", payload);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
