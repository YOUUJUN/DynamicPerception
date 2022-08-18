const getters = {
    
    /*---菜单数据---*/
    menuData : state => state.data.menu.data,
    menuCheckedKeys : state => state.data.menu.checkedKeys,
    menuExpandedKeys : state => state.data.menu.expandedKeys,
    menuSelectedKey : state => state.data.menu.selectedKey,

    /*---渲染条件控制---*/
    displayRow : state => state.display.displayRow,
    displayCategory : state => state.display.displayCategory,

    /*---渲染数据---*/
    renderData : state => state.data.originData,
}

export default getters;