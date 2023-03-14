export function getAudioUrl(name) {
    const audioUrl = {
        fall: require("@/static/media/fall.mp3"), // 跌倒告警
        out: require("@/static/media/level_bed.mp3"), // 离床未归
        smoke: require("@/static/media/smoke.mp3"), // 烟雾告警
        gas: require("@/static/media/gas.mp3"), // 燃气告警
        abnormal: require("@/static/media/use_water.mp3"), // 用水异常
        device: "", // 设备离线
        flow: require("@/static/media/water_flow.mp3"), // 水流异常
        emergency: require("@/static/media/urgent.mp3"), // 紧急呼叫
        intelligent_call: require("@/static/media/urgent.mp3"), //智能呼叫
        heart: require("@/static/media/heart.mp3"), // 心率异常
        breath: require("@/static/media/breath.mp3"), // 呼吸异常
        retention: require("@/static/media/retention.mp3"), //滞留告警
        turn: "",
    };

    if (audioUrl[name]) {
        return `${audioUrl[name]}`;
    } else {
        return "";
    }
}

export function getDeviceImgUrl(name) {
    const devicePic = {
        gateway_device: require("@/static/offlineImg/gateway_device.png"), // 网关
        "fanmis:vital_signs_millimeter_wave": require("@/static/offlineImg/vital_signs_millimeter_wave.png"), // 体征监测雷达   两个统一为一个
        "whst:vital_signs": require("@/static/offlineImg/vital_signs_millimeter_wave.png"), // 体征监测雷达   两个统一为一个
        "fanmis:pressure_sensor": require("@/static/offlineImg/pressure_sensor.png"), // 压力传感器
        "fanmis:water_flow_sensor": require("@/static/offlineImg/water_flow_sensor.png"), // 水流探测器
        "fanmis:water_sensor": require("@/static/offlineImg/water_sensor.png"), // 水浸传感器
        "fanmis:fire_sensor": require("@/static/offlineImg/fire_sensor.png"), // 烟感探测器
        "fanmis:gas_sensor": require("@/static/offlineImg/gas_sensor.png"), // 燃气探测器
        "fanmis:millimeter_wave": require("@/static/offlineImg/millimeter_wave.png"), // 跌倒监测雷达
        "fanmis:door_sensor": require("@/static/offlineImg/door_sensor.png"), // 门磁
        "fanmis:motion_sensor": require("@/static/offlineImg/motion_sensor.png"), // 红外
        "fanmis:personal_emerg_button": require("@/static/offlineImg/personal_emerg_button.png"), // 紧急按钮
        "fyt:smart_call_alarm": require("@/static/offlineImg/personal_emerg_button.png"), //智能呼叫设备
        female: require("@/static/offlineImg/female.png"),
        male: require("@/static/offlineImg/male.png"),
        nomen: require("@/static/offlineImg/nomen.png"),
    };

    if (devicePic[name]) {
        return `${devicePic[name]}`;
    } else {
        return `${devicePic.gateway_device}`;
    }
}

//获取告警级别类
export function getAlertLevelClass(msg_text, alertFlag) {
    let alertClass = "";

    if (!alertFlag) {
        this.alertClass = "";
        return alertClass;
    }
    switch (msg_text) {
        case "跌倒告警":
        case "烟雾告警":
        case "燃气告警":
        case "紧急呼叫":
        case "智能呼叫":
        case "滞留告警":
            alertClass = "alert-card-level-1";
            break;
        case "心率异常":
        case "呼吸异常":
        case "离床未归":
        case "翻身护理":
        case "水流异常":
        case "用水异常":
            alertClass = "alert-card-level-2";
            break;
    }

    return alertClass;
}

//获取告警图片
export function getAlertLevelImg(msg_text) {
    let imgPath = "";
    let alertClass = "";
    switch (msg_text) {
        case "跌倒告警":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/alarming-fall.png");
            break;
        case "烟雾告警":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/smokeAlarm.png");
            break;
        case "燃气告警":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/gasAlarm.png");
            break;
        case "紧急呼叫":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/SOS.png");
            break;
        case "智能呼叫":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/SOS.png");
            break;
        case "滞留告警":
            alertClass = "level_1_warning";
            imgPath = require("@/static/img/lingeringAlarm.png");
            break;
        case "心率异常":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/alarmingHeart.png");
            break;
        case "呼吸异常":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/alarmingbreathing.png");
            break;
        case "离床未归":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/alarmingOffbed.png");
            break;
        case "翻身护理":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/alarmingturning.png");
            break;
        case "水流异常":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/abnormalWater.png");
            break;
        case "用水异常":
            alertClass = "level_2_warning";
            imgPath = require("@/static/img/usingWater.png");
            break;
        case "设备离线":
            alertClass = "level_offline_warning";
            imgPath = require("@/static/img/offline.png");
            break;
    }

    return {
        imgPath,
        alertClass,
    };
}
