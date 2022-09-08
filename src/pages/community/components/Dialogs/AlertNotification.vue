<template>
    <article class="alert-wrap" :class="alertLevelClass">
        <header class="alert-header">
            <div class="header-left">
                <img src="@/static/offlineImg/male.png" />
                <span>{{ renderInfo.persons[0].name }}</span>
            </div>
            <div class="header-center">
                <span>{{ renderInfo.name }}</span>
            </div>
            <div class="header-right">
                <el-button class="count-num" type="danger" circle size="mini">{{
                    count
                }}</el-button>
            </div>
        </header>

        <main class="alert-main">
            <img class="alert-logo" :src="alertImgPath" />
        </main>

        <footer class="alert-footer">
            <div class="footer-left">
                <span>{{ renderInfo.msg_text }}</span>
            </div>
            <div class="footer-right">
                <el-button size="mini" round @click="handleAlert"
                    >立即处理</el-button
                >
            </div>
        </footer>
    </article>
</template>

<script>
export default {
    props: {
        renderInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            count: 10,
            //倒计时循环
            countHandle: "",

            alertLevelClass: "",
            alertImgPath: "",
        };
    },

    watch: {

        renderInfo: {
            deep: true,
            immediate: true,
            handler(newValue) {
                this.doCountDown();

                console.log("newValue", newValue);
                let { msg_text } = newValue;
                console.log("msg_text", msg_text);
                let imgPath = "";
                let alertClass = "";
                switch (msg_text) {
                    case "跌倒告警":
                        alertClass = "level_1_warning";
                        imgPath = require("@/static/img/alarming-fall.png");
                        break;
                    case "烟雾告警":
                        alertClass = "level_1_warning";
                        imgPath = require("@/static/img/smokeAlarm.png");
                        break;
                    case "燃气告警":
                        alertClass = "level_1_warning";
                        imgPath = require("@/static/img/gasAlarm.png");
                        break;
                    case "紧急呼叫":
                        alertClass = "level_1_warning";
                        imgPath = require("@/static/img/SOS.png");
                        break;
                    case "心率异常":
                        alertClass = "level_2_warning";
                        break;
                    case "呼吸异常":
                        alertClass = "level_2_warning";
                        break;
                    case "离床未归":
                        alertClass = "level_2_warning";
                        imgPath = require("@/static/img/fallBed.png");
                        break;
                    case "翻身护理":
                        alertClass = "level_2_warning";
                        break;
                    case "水流异常":
                        alertClass = "level_2_warning";
                        break;
                    case "用水异常":
                        alertClass = "level_2_warning";
                        break;
                }

                console.log("imgPath", imgPath);
                this.alertLevelClass = alertClass;
                this.alertImgPath = imgPath;
            },
        },
    },

    created() {},

    methods: {

        //控制倒计时
        doCountDown() {
            let countHandle = setInterval(() => {
                this.count--;
                if(this.count <= 0){
                    this.$emit("countover");
                }
            }, 1000);

            // setTimeout(() => {
            //     this.$emit("countover");
            // }, 1000 * 10)
        },

        //处理警告
        handleAlert() {
            console.log("hello");
        },
    },
};
</script>

<style scoped>
.alert-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/*--header--*/
.alert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0.6rem 0;
}

.header-left,
.header-center,
.header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left > img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}

.header-left > span {
    font-size: 1.2rem;
    color: #2c506c;
    margin-left: 0.4rem;
}

.header-center {
    font-size: 1.5rem;
    color: #2c506c;
}

/*--main--*/
.alert-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    padding: 0 1.2rem;
}

.alert-logo {
    height: 5rem;
    width: auto;
}

/*--footer--*/
.alert-footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.7rem;
}

.footer-left > span {
    font-size: 1.2rem;
    margin-left: 0.6rem;
}

.footer-right > button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
}

.count-num {
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    cursor: unset;
}
</style>

<style scoped>
/*---告警级别---*/
/*---1---*/
.level_1_warning {
    border: 2px solid #dd1d1d;
    border-radius: 4px;
}

.level_1_warning .alert-header,
.level_1_warning .alert-main {
    background: #fbeee9;
}

.level_1_warning .count-num {
    background: #dd1d1d;
}

.level_1_warning .alert-footer {
    background: #dd1d1d;
}

.level_1_warning .alert-footer span {
    color: #fff;
}

.level_1_warning .alert-footer button {
    color: #dd1d1d;
}

/*---2---*/
.level_2_warning {
    border: 2px solid #fd7f0e;
    border-radius: 4px;
}

.level_1_warning .alert-header,
.level_1_warning .alert-main {
    background: #fbeee9;
}

.level_2_warning .count-num {
    background: #fd7f0e;
}

.level_2_warning .alert-footer {
    background: #fd7f0e;
}

.level_2_warning .alert-footer span {
    color: #fff;
}

.level_2_warning .alert-footer button {
    color: #fd7f0e;
}
</style>