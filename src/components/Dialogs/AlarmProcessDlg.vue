<template>
    <section class="alarm-list-wrap">
        <el-scrollbar style="height: 100%">
            <ul class="alarm-list">
                <li
                    class="alarm-item"
                    v-for="(item, index) in alarmData"
                    :key="index"
                >
                    <el-tooltip
                        effect="dark"
                        :content="item.msg_text"
                        placement="top-start"
                    >
                        <div class="alarm-item-left">
                            {{ item.msg_text }}
                        </div>
                    </el-tooltip>

                    <div class="alarm-item-right">
                        <el-button type="text" size="small">立即处理</el-button>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </section>
</template>

<script>
export default {
    props : {
        alarmData : {
            type : Array,
            required : true,
        }
    }
};
</script>

<style scoped>
@import url("~@/styles/alarmDlg.css");
</style>