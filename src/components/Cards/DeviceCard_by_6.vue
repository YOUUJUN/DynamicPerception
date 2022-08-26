
<template>
    <el-card class="device-card-by6-wrap">
        <div class="card-header">
            <span class="card-name">{{ renderInfo.name }}</span>
        </div>

        <div class="card-body">
            <ul class="card-list">
                <li class="card-item">
                    <div class="card-item-left">
                        <img
                            src="@/static/img/normalStatus.png"
                            class="status-icon"
                        />
                        <span class="status-label">状态</span>
                    </div>
                    <div class="card-item-right">
                        <span class="status-name">{{ renderInfo.status }}</span>
                    </div>
                </li>
            </ul>
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
        return {};
    },

    created(){
        console.log('renderInfo', this.renderInfo);
    },

    computed: {},

    methods: {},
};
</script>

<style>
.device-card-by6-wrap .el-card__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5rem 0 !important;
}
</style>

<style scoped>

.device-card-by6-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-header{
    flex:none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-body{
    flex:auto;
    display: flex;
    height:100%;
    justify-content: center;
    align-items: center;
}



</style>

