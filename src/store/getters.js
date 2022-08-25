const getters = {
    /*---菜单数据---*/
    menuData: (state) => state.data.menu.data,
    menuCheckedKeys: (state) => state.data.menu.checkedKeys,
    menuExpandedKeys: (state) => state.data.menu.expandedKeys,
    menuSelectedKey: (state) => state.data.menu.selectedKey,

    /*---渲染条件控制---*/
    displayRow: (state) => state.display.displayRow,
    displayCategory: (state) => state.display.displayCategory,
    displayCategoryMap: (state) => state.display.displayCategoryMap,
    displayCategoryLabel: (state, getters) =>
        getters.displayCategoryMap.get(getters.displayCategory),
    displayFilters: (state) => state.data.menu.filters,

    /*---原始数据---*/
    originData: (state) => state.data.originData,

    /*---菜单过滤后的数据---*/
    filteredData: (state, getters) => {
        let originData = getters.originData;
        let displayFilters = getters.displayFilters;
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

    /*---分类菜单过滤后的数据---*/
    classifiedData: (state, getters) => {
        let filteredData = getters.filteredData;
        console.log('filteredData',filteredData);
        let displayCategory = getters.displayCategory;
        let displayCategoryLabel = getters.displayCategoryLabel;
        console.log("displayCategoryLabel", getters.displayCategoryLabel);

        let result = [];
        switch (displayCategory) {
            case "1":
                result = filteredData;
                break;
            case "2": 
            case "3":
                result = filteredData.filter((item) => {
                    if (item.status === displayCategoryLabel) {
                        return item;
                    }
                });
                break;
            case "4":
                result = filteredData.filter((item) => {
                    if (item.qty > 0) {
                        return item;
                    }
                });
                break;
        }

        return result;
    },

    /*---渲染数据---*/
    renderData: (state, getters) => {
        // return getters.filteredData;
        return getters.classifiedData;
    },

    /*---分类数据---*/
    allDataNum : (state, getters) => getters.filteredData.length,
    inBedNum : (state, getters) => {
        return getters.filteredData.filter((item) => {
            if (item.status === '在床') {
                return item;
            }
        }).length
    },
    offBedNum : (state, getters) => {
        return getters.filteredData.filter((item) => {
            if (item.status === '离床') {
                return item;
            }
        }).length
    },
    alarmBedNum : (state, getters) => {
        let beds = getters.filteredData.filter((item) => {
            if (item.qty > 0) {
                return item;
            }
        })

        let alarmNum = beds.reduce((total, item) => {
            total += item.qty;
            return total
        },0)

        return alarmNum;
    },

};

export default getters;
