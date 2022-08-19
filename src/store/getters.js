const getters = {
    /*---菜单数据---*/
    menuData: (state) => state.data.menu.data,
    menuCheckedKeys: (state) => state.data.menu.checkedKeys,
    menuExpandedKeys: (state) => state.data.menu.expandedKeys,
    menuSelectedKey: (state) => state.data.menu.selectedKey,

    /*---渲染条件控制---*/
    displayRow: (state) => state.display.displayRow,
    displayCategory: (state) => state.display.displayCategory,
    displayFilters: (state) => state.data.menu.filters,

    /*---渲染数据---*/
    renderData: (state) => {
        let displayFilters = state.data.menu.filters;

        displayFilters.forEach((item) => {
            let level = item.level;
            let id = item.id;

            switch (level) {
                case "1":
                    
                    break;
                case "2":
                    break;
                case "3":
                    break;
                case "4":
                    break;
            }
        });

        return state.data.originData;
    },
};

export default getters;
