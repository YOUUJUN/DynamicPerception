<template>
    <section class="detail-wrap">
        <div class="detail">
            <el-page-header @back="goBack"></el-page-header>
            <h2 class="title">用户信息</h2>
            <el-form
                :model="ruleForm"
                :rules="rules"
                class="user-panel"
                @validate="doValidate"
                ref="ruleForm"
                label-width="100px"
            >
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select
                        v-model="ruleForm.region"
                        placeholder="请选择活动区域"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-button @click="resetForm">Reset</el-button>
            </el-form>

            <div class="chart-wrap">


            </div>

        </div>
    </section>
</template>

<script>

export default {
    components: {  },
    data() {
        return {
            ruleForm: {
                name: "",
                region: "",
            },

            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                region: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
            },
        };
    },

    methods: {
        goBack(){
            this.$router.back();
        },

        doValidate(...params) {
            console.log("params", params);
        },

        resetForm() {
            let form = this.$refs["ruleForm"];
            form.resetFields();
        },
    },
};
</script>

<style>
</style>

<style scoped>
    .detail-wrap{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .detail{
        display: flex;
        flex-direction: column;
        width: 90rem;
        background: #fff;
        box-shadow: -.1rem -.1rem .5rem 0 rgba(0, 0, 0, 0.1);
        margin: 1.5rem;
        padding: 1rem;
    }

    .detail .title{
        font-size: 2rem;
        color: rgba(0,0,0,0.6);
        text-align: center;
        margin-bottom: 2rem;
    }
    

    /deep/ .user-panel .el-form-item{
        width: 40rem;
    }

    /deep/ .user-panel .el-select{
        width :100%;
    }

    /deep/ .user-panel .el-button{
        width: 7.8rem;
    }



    /*------charts------*/
    .chart-wrap{
        display: flex;
        flex-direction: row;
        height:40rem;
    }

    .chart-wrap .chart{
        flex:auto;
        height: 100%;
    }

</style>