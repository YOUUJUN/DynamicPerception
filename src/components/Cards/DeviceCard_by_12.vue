<template>
    <el-card class="device-card-by12-wrap">
        <div class="card-header">
            <el-popover
                popper-class="device-popover"
                placement="right"
                width="240"
                trigger="click"
            >
                <section class="card-wrap">
                    <div class="card-header">
                        <span class="card-name">{{
                            renderInfo.room_name
                        }}</span>
                    </div>
                    <div class="card-body">
                        <el-scrollbar style="height: 100%">
                            <ul class="card-list">
                                <li
                                    class="card-item"
                                    v-for="(item, index) in renderInfo.devices"
                                    :key="index"
                                >
                                    <div class="card-item-left">
                                        <img
                                            :src="item.img"
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
                                        <span class="status-name">{{
                                            item.status
                                        }}</span>
                                    </div>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>
                </section>

                <span slot="reference" class="card-name">{{
                    renderInfo.name
                }}</span>
            </el-popover>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        renderInfo: {
            type: Object,
        },
    },

    data() {
        return {

        };
    },

    methods: {

    },
};
</script>

<style>
.device-card-by12-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 0.7rem 0 !important;
}

.device-popover{
    padding:10px 0;
}
</style>

<style scoped>
.device-card-by12-wrap {
    width: auto;
    height: 13rem;
}

.device-card-by12-wrap .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 0.8rem;
}

.device-card-by12-wrap .card-name {
    font-size: 2.6rem;
    color: #18171d;
    cursor: pointer;
    text-align: center;
}

.device-card-by12-wrap .card-name:hover {
    color: #439df7;
}

</style>


<style scoped>
.card-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 26rem;
}

.device-popover .card-name{
    font-size: 2.6rem;
    color: #18171d;
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
</style>
