const state = {
    displayRow: "X8",
    displayCategory : '1',
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
