
<template>
    <el-card class="bed-card-by8-wrap">
        <div class="card-header">
            <img
                v-if="getGender === 'male'"
                class="card-avatar"
                src="@/static/offlineImg/male.png"
            />

            <img
                v-else
                class="card-avatar"
                src="@/static/offlineImg/female.png"
            />

            <span class="card-name">{{bedInfo.name}}</span>

            <el-popover
                popper-class="alarm-popover"
                width="220"
                placement="right"
                trigger="click"
            >
                <section class="alarm-list-wrap">
                    <el-scrollbar style="height: 100%">
                        <ul class="alarm-list">
                            <li class="alarm-item">
                                <div class="alarm-item-left">呼吸异常</div>

                                <div class="alarm-item-right">
                                    <el-button type="text" size="small"
                                        >立即处理</el-button
                                    >
                                </div>
                            </li>
                        </ul>
                    </el-scrollbar>
                </section>

                <el-button
                    v-if="bedInfo.qty != 0"
                    slot="reference"
                    class="card-num"
                    type="danger"
                    circle
                    size="mini"
                    >{{bedInfo.qty}}</el-button
                >
            </el-popover>
        </div>

        <ul class="card-body">
            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalStatus.png"
                        class="status-icon"
                    />
                    <span class="status-label">状态</span>
                </div>
                <div class="card-item-right">
                    <span class="status-name">{{ bedInfo.status }}</span>
                </div>
            </li>

            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalHeart.png"
                        class="status-icon"
                    />
                    <span class="status-label">心率</span>
                </div>
                <div class="card-item-right">
                    <span class="status-name">{{ bedInfo.heart }}</span>
                </div>
            </li>

            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalBreathing.png"
                        class="status-icon"
                    />
                    <span class="status-label">呼吸</span>
                </div>
                <div class="card-item-right">
                    <span class="status-name">{{ bedInfo.breathing }}</span>
                </div>
            </li>

            <li class="card-item">
                <div class="card-item-left">
                    <img
                        src="@/static/img/normalAlarming.png"
                        class="status-icon"
                    />
                    <span class="status-label">告警</span>
                </div>
                <div class="card-item-right">
                    <span class="status-name">{{ bedInfo.alarming }}</span>
                </div>
            </li>
        </ul>

        <div class="card-footer">
            <el-button class="btn" type="info" size="small" round
                >查看报告</el-button
            >
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        bedInfo: {
            type: Object,
        },
    },

    data() {
        return {};
    },

    computed: {
        getGender() {
            let info = this.bedInfo;
            console.log("info");
            let avatarUrl = info?.pop_show?.img;
            let imgName = avatarUrl.split("/").pop();
            console.log("imgName.trim()", imgName.trim());
            if (imgName.trim() === "male.png") {
                return "male";
            } else {
                return "female";
            }
        },
    },

    methods: {},
};
</script>

<style>
.bed-card-by8-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem 0 !important;
}

</style>

<style scoped>
@import url('~@/styles/alarmDlg.css');

.bed-card-by8-wrap {
    width: auto;
    height: 26rem;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
}

.card-name {
    font-size: 2.6rem;
    color: #18171d;
}

.card-num {
    display: flex;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
}

.card-body {
    font-size: 1.5rem;
    list-style: none;
    padding: 0 1.5rem;
}

.card-body .card-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #999;
    margin: 0.8rem 0;
}

.card-item-left {
    display: flex;
    align-items: center;
}

.card-avatar{
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

.status-name {
    font-size: 1.4rem;
}

.card-footer{
    padding: 0 1.5rem;
}

.card-footer .btn {
    width: 100%;
}

</style>