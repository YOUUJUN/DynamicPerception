import request from "@/utils/http";
import qs from "qs";

export function getAllData(params) {
    return request({
        url: `/home/elderly/data/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

export function getOfflineData(params) {
    return request({
        url: `/dev/home/offline/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

export function getRoomData(params) {
    return request({
        url: `/warn/home/all/alarm/api`,
        method: "post",
        data: qs.stringify(params),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
}

