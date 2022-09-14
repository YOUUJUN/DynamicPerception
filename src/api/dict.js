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
        heart: require("@/static/media/heart.mp3"), // 心率异常
        breath: require("@/static/media/breath.mp3"), // 呼吸异常
        turn: "",
    };

    return audioUrl[name] ?? ''
}
