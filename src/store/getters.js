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

    /*---菜单过滤后的数据---*/
    filteredData: (state) => {
        let originData = state.data.originData;
        let displayFilters = state.data.menu.filters;
        let result = [];
        let levelQueue = displayFilters
            .map((item) => {
                return item.level;
            })
            .sort((a, b) => a - b);
        console.log("levelQueue", levelQueue);
        let firstLevel = levelQueue[0];
        let filterArr = [];
        switch (firstLevel) {
            case 1:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === 1) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = originData.filter(
                        (data) => item.id === data.res_community_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 2:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === 2) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = originData.filter(
                        (data) => item.id === data.community_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 3:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === 3) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = originData.filter(
                        (data) => item.id == data.house_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 4:
                let filterArr = displayFilters.filter((item) => {
                    if (item.level === 4) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = originData.filter(
                        (data) => item.id == data.id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
        }

        console.log("result-->", result);

        return result;
    },


    /*---渲染数据---*/
    renderData : (state, getters) => {
        return getters.filteredData;
    }
};

export default getters;
