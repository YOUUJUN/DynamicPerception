export function generateNavData(data){
    if(Array.isArray(data)){
        let res = [];
        data.forEach(item => {
            let obj = {}
            Object.assign(obj, {
                label : item.index,
                children : item.items
            })
        })
    }
}