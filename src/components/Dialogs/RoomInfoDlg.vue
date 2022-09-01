<template>
    <el-dialog
        custom-class="room-dlg"
        :visible.sync="visible"
        width="22%"
        :before-close="handleClose"
    >
        <section class="dlg-header">
            <h2 class="dlg-title">{{ roomInfo.room_name }}</h2>
        </section>

        <section class="dlg-body">
            <div class="info-wrap">
                <div class="info-left">
                    <img src="@/static/img/address.png" class="info-icon" />
                    <span class="info-name">紧急联系电话</span>
                </div>

                <div class="info-right">
                    <span class="info-label">
                        {{ roomInfo.emergency_call }}</span
                    >
                </div>
            </div>

            <div class="split-line"></div>

            <div class="info-wrap">
                <div class="info-left">
                    <img src="@/static/img/address.png" class="info-icon" />
                    <span class="info-name">网格员电话</span>
                </div>

                <div class="info-right">
                    <span class="info-label">{{
                        roomInfo.grid_member_tel
                    }}</span>
                </div>
            </div>

            <div class="split-line"></div>

            <div class="info-wrap">
                <div class="info-left">
                    <img src="@/static/img/phone.png" class="info-icon" />
                    <span class="info-name">家庭住址</span>
                </div>

                <div class="info-right">
                    <span class="info-label">
                        {{ roomInfo.address }}</span
                    >
                </div>
            </div>
        </section>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        roomInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {};
    },

    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style>
.room-dlg {
    font-family: Source Han Sans CN;
}

.room-dlg .el-dialog__header {
    padding: 0;
}

.room-dlg .el-dialog__body {
    background: #f5f7f9;
    padding: 3rem 2rem;
    color: #606266;
}
</style>

<style scoped>
.dlg-header {
    text-align: center;
    padding: 0 1rem 1rem 1rem;
}

.dlg-header .dlg-title {
    font-size: 2.4rem;
    font-weight: 500;
    color: #000;
    margin: 0;
}

.dlg-body {
    display: flex;
    flex-direction: column;
}

.info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.7rem 0;
}

.info-left {
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    color: #666666;
}

.info-left .info-icon {
    width: auto;
    height: 2.2rem;
    margin-right: 1.2rem;
}

.info-right {
    text-align: right;
    width: 21rem;
}

.info-right .info-label {
    font-size: 1.4rem;
}

.split-line {
    border: .1rem dashed #666666;
}
</style>