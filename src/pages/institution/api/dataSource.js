import request from "@/utils/http";
import qs from "qs";

//获取菜单数据，床铺数据
export function getAllData(params) {
    return request({
        url: `/inst/elderly/data/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取离线设备数据
export function getOfflineData(params) {
    return request({
        url: `/dev/inst/offline/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取房间告警数据
export function getRoomData(params) {
    return request({
        url: `/warn/inst/all/alarm/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取所有待处理信息
export function getUnsolvedAlarmInfo(params) {
    return request({
        url: `/get/all/data/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取所有房间告警数据
export function getAllRoomAlarmInfo(params) {
    return request({
        url: `/get/untreated/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}


//获取老人信息
export function getElderlyData(params){
    return request({
        url: `/elderly/detail/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取老人健康报告
export function getElderlyHealthReport(params){
    return request({
        url: `/elderly/health/report/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//处理告警提示接口
export function handleAlarmPrompt(params){
    return request({
        url: `/imm/process/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//获取房间信息数据
export function getRoomInfo(params){
    return request({
        url: `/get/room/info/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

//处理弹窗告警
export function handlePopAlarm(params){
    return request({
        url: `/warn/handle/data/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

