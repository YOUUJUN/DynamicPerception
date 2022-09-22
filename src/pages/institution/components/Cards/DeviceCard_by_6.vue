
<template>
    <el-card class="device-card-by6-wrap">
        <div class="card-header">
            <span class="card-name" @click="openRoomInfoDlg(renderInfo.id)">{{
                renderInfo.room_name
            }}</span>
        </div>

        <div class="card-body">
            <el-scrollbar style="height: 100%;width:100%;">
                <ul class="card-list">
                    <li
                        class="card-item"
                        v-for="(item, index) in renderInfo.devices"
                        :key="index"
                        :class="{ offlineAlert: item.status === '离线' }"
                    >
                        <div class="card-item-left">
                            <img
                                :src="getDeviceImgUrl(item.type_uid)"
                                class="status-icon"
                            />
                            <el-tooltip
                                effect="dark"
                                :content="item.name"
                                placement="top-start"
                            >
                                <span class="status-label">
                                    {{ item.name }}
                                </span>
                            </el-tooltip>
                        </div>
                        <div class="card-item-right">
                            <span class="status-name">{{ item.status }}</span>
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
    </el-card>
</template>

<script>
import { getDeviceImgUrl } from "@/api/dict.js";

export default {
    props: {
        renderInfo: {
            type: Object,
        },
    },

    data() {
        return {};
    },

    created() {
        console.log("renderInfo", this.renderInfo);
    },

    computed: {},

    inject: ["openRoomInfoDlg_inject"],

    methods: {
        //打开房间信息窗体
        openRoomInfoDlg(id) {
            this.openRoomInfoDlg_inject(id);
        },

        //获取设备图片路径
        getDeviceImgUrl(...params) {
            return getDeviceImgUrl.apply(this, params);
        },
    },
};
</script>

<style>
.device-card-by6-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1.5rem 0 !important;
}
</style>

<style scoped>
.device-card-by6-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 26rem;
}

.card-header {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-name {
    font-weight: bold;
    color: #18171d;
    font-size: 2.2rem;
    cursor: pointer;
}

.card-name:hover {
    color: #439df7;
}

.card-body {
    flex: auto;
    display: flex;
    height: 100%;
    overflow: hidden;
}

.card-list {
    font-size: 1.5rem;
    list-style: none;
    padding: 0 1.5rem;
    width: 100%;
}

.card-list .card-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #999;
    padding: 0.8rem 0;
}

.card-item-left {
    display: flex;
    align-items: center;
}

.card-avatar {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    cursor: pointer;
}

.status-icon {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
}

.status-label {
    width: 14rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.status-name {
    font-size: 1.4rem;
}

.offlineAlert {
    color: #dd1d1d !important;
}
</style>

<style scoped>
::v-deep .el-scrollbar .el-scrollbar__bar.is-horizontal {
    display: none;
}

::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    scrollbar-width: none;
}

::v-deep .el-scrollbar__view {
    height: 100%;
}
</style>

