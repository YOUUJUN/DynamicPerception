
<template>
    <el-card class="bed-card-wrap">
        <div class="card-header">
            <el-avatar
                class="card-avatar"
                size="small"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span class="card-name">501-08</span>
            <el-button class="card-num" type="danger" circle size="mini"
                >99</el-button
            >
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
                    <span class="status-name">离线</span>
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
                    <span class="status-name">离线</span>
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
                    <span class="status-name">离线</span>
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
                    <span class="status-name">离线</span>
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
export default {};
</script>

<style>
.bed-card-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>

<style scoped>
.bed-card-wrap {
    width: 22rem;
    height: 24rem;
    margin: 0 2rem 2rem 0;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.card-name {
    font-size: 2.6rem;
    color: #18171d;
}

.card-num {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
}

.card-body {
    font-size: 1.5rem;
    list-style: none;
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

.status-icon {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
}

.status-name {
    font-size: 1.4rem;
}

.card-footer .btn {
    width: 100%;
}
</style>