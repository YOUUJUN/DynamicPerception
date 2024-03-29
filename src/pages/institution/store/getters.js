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
    ifDisplayEmptyBeds : (state) => state.display.ifDisplayEmptyBeds,
    displayCategoryLabel: (state, getters) =>
        getters.displayCategoryMap.get(getters.displayCategory),
    displayFilters: (state) => state.data.menu.filters,

    /*---原始数据---*/
    originData: (state) => state.data.originData,
    offlineData: (state) => state.data.offlineData,
    roomData: (state) => state.data.roomData,

    /*---菜单过滤后的数据---*/
    filteredBedData: (state, getters) => {
        let originData = getters.originData;
        console.log("originData", originData);
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
                        (data) => item.id === data.nursing_id ?? item
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
                        (data) => item.id === data.nursing_building_id ?? item
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
                        (data) => item.id == data.nursing_floor_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 4:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === 4) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = originData.filter(
                        (data) => item.id == data.room_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 5:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === 5) {
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

    filteredDeviceData: (state, getters) => {
        let offlineData = getters.offlineData;
        let displayFilters = getters.displayFilters;
        let result = [];
        let levelQueue = displayFilters
            .map((item) => {
                return item.level;
            })
            .sort((a, b) => a - b);
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
                    let cache = offlineData.filter(
                        (data) => item.id === data.nursing_id ?? item
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
                    let cache = offlineData.filter(
                        (data) => item.id === data.nursing_building_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 3:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = offlineData.filter(
                        (data) => item.id === data.nursing_floor_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 4:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = offlineData.filter(
                        (data) => item.id === data.room_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 5:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = offlineData.filter(
                        (data) => item.id === data.id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
        }

        console.log("result-->2", result);
        return result;
    },

    filteredRoomData: (state, getters) => {
        let roomData = getters.roomData;
        console.log("roomData", roomData);
        let displayFilters = getters.displayFilters;
        console.log("displayFilters", displayFilters);
        let result = [];
        let levelQueue = displayFilters
            .map((item) => {
                return item.level;
            })
            .sort((a, b) => a - b);
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
                    let cache = roomData.filter(
                        (data) => item.id === data.nursing_id ?? item
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
                    let cache = roomData.filter(
                        (data) => item.id === data.nursing_building_id ?? item
                    );
                    console.log("filter-cache", cache, item);
                    result = result.concat(cache);
                });
                break;
            case 3:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = roomData.filter(
                        (data) => item.id === data.nursing_floor_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 4:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = roomData.filter(
                        (data) => item.parentId === data.room_id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
            case 5:
                filterArr = displayFilters.filter((item) => {
                    if (item.level === firstLevel) {
                        return item;
                    }
                });

                filterArr.forEach((item) => {
                    let cache = roomData.filter(
                        (data) => item.parentId === data.id ?? item
                    );
                    result = result.concat(cache);
                });
                break;
        }

        console.log("result-->3", result);
        return result;
    },

    /*---分类菜单过滤后的数据---*/
    classifiedData: (state, getters) => {
        let filteredBedData = getters.filteredBedData;
        let filteredDeviceData = getters.filteredDeviceData;
        let filteredRoomData = getters.filteredRoomData;
        let displayCategory = getters.displayCategory;
        let displayCategoryLabel = getters.displayCategoryLabel;
        console.log("displayCategoryLabel", getters.displayCategoryLabel);

        let result = [];
        switch (displayCategory) {
            //床铺
            case "1":
                result = filteredBedData;
                break;
            case "2":
            case "3":
                result = filteredBedData.filter((item) => {
                    if (item.in_out_bed === displayCategoryLabel) {
                        return item;
                    }
                });
                break;
            case "4":
                result = filteredBedData.filter((item) => {
                    if (item.qty > 0) {
                        return item;
                    }
                });
                break;

            //设备
            case "5":
                result = filteredDeviceData.filter(item => {
                    if (item.sign === "0") {
                        return item;
                    }
                });
                break;

            //房间
            case "6":
                result = filteredRoomData;
                break;
        }

        return result;
    },

    /*---渲染数据---*/
    renderData: (state, getters) => {
        let displayCategory = getters.displayCategory;
        let role = "";

        if (displayCategory === "5") {
            //设备
            role = "device";
        } else if (displayCategory === "6") {
            //房间
            role = "room";
        } else {
            //床铺
            role = "bed";
        }

        console.log("renderData==>", getters.classifiedData);

        //重置告警flag
        getters.classifiedData.forEach(data => {
            Object.assign(data, {
                alertFlag: false,
            })
        })

        let renderData = getters.classifiedData;
        //控制是否显示空床位
        if(getters.ifDisplayEmptyBeds === false && displayCategory !== "5" && displayCategory !== "6"){
            renderData = getters.classifiedData.filter(data => {
                if(data.partner_id){
                    return data;
                }
            })
        }

        return {
            role, //渲染角色
            data: renderData,
        };
    },

    /*---分类数据---*/
    allDataNum: (state, getters) => {
        return getters.filteredBedData.filter(data => {
            if(data.partner_id){
                return data;
            }
        }).length
    },
    inBedNum: (state, getters) => {
        return getters.filteredBedData.filter((item) => {
            if (item?.in_out_bed === "在床") {
                return item;
            }
        }).length;
    },
    offBedNum: (state, getters) => {
        return getters.filteredBedData.filter((item) => {
            if (item?.in_out_bed === "离床") {
                return item;
            }
        }).length;
    },
    alarmBedNum: (state, getters) => {
        let beds = getters.filteredBedData.filter((item) => {
            if (item.qty > 0) {
                return item;
            }
        });

        let alarmNum = beds.reduce((total, item) => {
            total += item.qty;
            return total;
        }, 0);

        return alarmNum;
    },

    offlineDeviceNum: (state, getters) => {
        let offlineNum = getters.filteredDeviceData.reduce((total, item) => {
            total += item.off_qty;
            return total;
        }, 0);

        return offlineNum;
    },

    alarmRoomNum: (state, getters) => {
        let roomNum = getters.filteredRoomData.reduce((total, item) => {
            total += item.qty;
            return total;
        }, 0);

        return roomNum;
    },
};

export default getters;
