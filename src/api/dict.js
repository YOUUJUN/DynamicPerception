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
        intelligent_call : require("@/static/media/urgent.mp3"), //智能呼叫
        heart: require("@/static/media/heart.mp3"), // 心率异常
        breath: require("@/static/media/breath.mp3"), // 呼吸异常
        turn: "",
    };

    if(audioUrl[name]){
        return `${audioUrl[name]}`
    }else{
        return ""
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
        "fyt:smart_call_alarm":require("@/static/offlineImg/personal_emerg_button.png"), //智能呼叫设备
        female: require("@/static/offlineImg/female.png"),
        male: require("@/static/offlineImg/male.png"),
    };

    if(devicePic[name]){
        return `${devicePic[name]}`
    }else{
        return `${devicePic.gateway_device}`
    }
}
