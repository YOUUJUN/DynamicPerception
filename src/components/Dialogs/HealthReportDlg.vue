<template>
    <el-dialog
        custom-class="report-dlg"
        :visible.sync="visible"
        width="60%"
        :before-close="handleClose"
    >
        <article class="report-wrap">
            <section class="report-header">
                <h2 class="report-title">健康报告</h2>
                <el-date-picker
                    v-model="reportDate"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    @change="fetchReport"
                >
                </el-date-picker>
            </section>

            <section class="report-body" v-if="ifReport">
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/Inbed.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">上床时间</span>
                    </span>

                    <span class="report-answer">
                        {{ renderData.go_to_bed_time }}
                    </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/fallAsleep.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">入睡时间</span>
                    </span>

                    <span class="report-answer"> {{ renderData.asleep_time }} </span>
                </div>

                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/wake.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">醒来时间</span>
                    </span>

                    <span class="report-answer"> {{ renderData.wake_time }} </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/outBed.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">离床时间</span>
                    </span>

                    <span class="report-answer"> {{ renderData.leave_bed_time }} </span>
                </div>

                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/SleepTime.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">睡眠时长</span>
                    </span>

                    <span class="report-answer"> {{ renderData.sleep_duration }} </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/LieBed.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">卧床时长</span>
                    </span>

                    <span class="report-answer"> {{ renderData.length_stay_bed }} </span>
                </div>

                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/deepSleep.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">深度睡眠</span>
                    </span>

                    <span class="report-answer"> {{ renderData.deep_sleep }} </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/LightSleep.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">轻度睡眠</span>
                    </span>

                    <span class="report-answer"> {{ renderData.light_sleep }} </span>
                </div>

                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/heartRate.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">心率</span>
                    </span>

                    <span class="report-answer"> {{ renderData.hr }} </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/breathing.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">呼吸</span>
                    </span>

                    <span class="report-answer"> {{ renderData.br }} </span>
                </div>

                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/Body.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">体动</span>
                    </span>

                    <span class="report-answer"> {{ renderData.bm }} </span>
                </div>
                <div class="report-item-wrap">
                    <span class="report-label">
                        <img
                            src="@/static/img/getUp.png"
                            class="report-item-icon"
                        />
                        <span class="report-item-name">起身</span>
                    </span>

                    <span class="report-answer"> {{ renderData.gu }} </span>
                </div>
            </section>

            <section class="blank-body" v-else>
                <div class="blank-body-top">
                    <img src="@/static/img/noReport.png" />
                </div>

                <div class="blank-body-bottom">
                    <span>暂无报告</span>
                </div>
            </section>
        </article>
    </el-dialog>
</template>

<script>
export default {
    inject: ["fetchElderHealthReportByTime_inject"],

    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        partnerId: {
            type: Number,
            required: true,
        },

        //今日报告信息
        reportInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            //日期选择控制
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        },
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        },
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        },
                    },
                ],
            },
            //报告搜索日期
            reportDate: "",

            //报告渲染数据
            renderData: {},
        };
    },

    computed: {

        ifReport() {
            console.log('renderData', this.renderData);
            let result = Object.keys(this.renderData).length > 0 ? true : false;
            console.log('result', result);
            return result;
        },
    },

    watch : {
        reportInfo : {
            handler(newValue){
                this.renderData = newValue;
            }
        },

    },

    methods: {
        //设置报告日期
        setReportDate(date){
            this.reportDate = date;
        },

        //获取报告数据
        fetchReport(date) {
            console.log("date", date);
            return new Promise((resolve, reject) => {
                this.fetchElderHealthReportByTime_inject(this.partnerId, date)
                    .then((res) => {
                        console.log("res-->", res);
                        if (res.status === 200) {
                            this.renderData = res.data?.data[0] ?? {};
                            resolve();
                        }
                    })
                    .catch((err) => {
                        console.warn("err", err);
                    });
            });
        },

        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style>
.report-dlg {
    font-family: Source Han Sans CN;
    background-color: #f5f7f9;
}

.report-dlg .el-dialog__header {
    padding: 0;
}

.report-dlg .el-dialog__body {
    padding: 3rem 2rem;
}
</style>

<style scoped>
.report-wrap {
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.report-title {
    font-size: 2.6rem;
    color: #333333;
    margin: 0;
}

/*---body---*/
.report-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 5rem;
    grid-row-gap: 1rem;
}

.report-item-wrap {
    display: flex;
    justify-content: space-between;
    padding: 1.1rem;
    border-radius: 0.5rem;
    background: #fff;
}

.report-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.report-item-icon {
    width: 2.6rem;
    height: 2.6rem;
    margin: 0 3rem 0 1rem;
}

.report-item-name {
    font-size: 2rem;
    font-weight: 400;
    color: #118ccf;
}

.report-answer {
    font-size: 2rem;
    margin-right: 2.5rem;
    color: #333333;
}
</style>

<style scoped>
.blank-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.blank-body-top {
    display: flex;
    justify-content: center;
    width: 100%;
}

.blank-body-top img {
    width: auto;
    height: 22rem;
}

.blank-body-bottom {
    font-size: 2.8rem;
    font-weight: 400;
    color: #909399;
}
</style>