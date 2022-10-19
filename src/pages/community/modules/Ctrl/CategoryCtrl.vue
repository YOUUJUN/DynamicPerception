<template>
    <div class="ctrl-wrap">
        <div class="checkbox-wrap">
            <el-checkbox :value="ifDisplayEmptyBeds" @change="handleEmptyBedsDisplay">显示全部床位</el-checkbox>
        </div>

        <el-radio-group v-model="categoryRadio">
            <el-radio class="radio-btn" label="1" border>
                <div class="ctrl-label-wrap">
                    <span>全部</span><span>{{ allDataNum }}</span>
                </div>
            </el-radio>
            <el-radio class="radio-btn" label="2" border>
                <div class="ctrl-label-wrap">
                    <span>在床</span><span>{{ inBedNum }}</span>
                </div></el-radio
            >
            <el-radio class="radio-btn" label="3" border
                ><div class="ctrl-label-wrap">
                    <span>离床</span><span>{{ offBedNum }}</span>
                </div></el-radio
            >
            <el-radio class="radio-btn" label="4" border
                ><div class="ctrl-label-wrap">
                    <span>告警</span><span>{{ alarmBedNum }}</span>
                </div></el-radio
            >
            <el-divider class="split" direction="vertical"></el-divider>
            <el-radio class="radio-btn" label="5" border
                ><div class="ctrl-label-wrap">
                    <span>设备离线</span><span>{{ offlineDeviceNum }}</span>
                </div></el-radio
            >
            <el-radio class="radio-btn" label="6" border
                ><div class="ctrl-label-wrap">
                    <span>房间告警</span><span>{{ alarmRoomNum }}</span>
                </div></el-radio
            >
        </el-radio-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
        };
    },

    computed: {
        ...mapGetters([
            "allDataNum",
            "inBedNum",
            "offBedNum",
            "alarmBedNum",
            "offlineDeviceNum",
            "alarmRoomNum",
            "ifDisplayEmptyBeds"
        ]),

        categoryRadio: {
            get() {
                return this.$store.state.display.displayCategory;
            },
            set(value) {
                this.changeDisplayCategory(value);
            },
        },
    },

    methods: {
        ...mapActions("display", ["changeDisplayCategory", "changeEmptyBedsDisplay"]),

        //控制空床位显示隐藏
        handleEmptyBedsDisplay(value){
            this.changeEmptyBedsDisplay(value)
        }
    },
};
</script>

<style>
.ctrl-wrap .el-radio__label {
    padding: 0;
}
</style>

<style scoped>
.ctrl-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
}

/*---checkbox-wrap---*/
.checkbox-wrap {
	border: 0.1rem solid #DCDFE6;
	padding: 0 1rem;
	height: 4rem;
	margin: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.4rem;
}



.ctrl-label-wrap span:last-child {
    margin-left: 1.5rem;
}

::v-deep .el-radio-group {
    font-size: unset;
}

::v-deep .el-radio.is-bordered {
    padding: 1.2rem 1rem 0;
}

::v-deep .radio-btn.el-radio {
    margin: 0.8rem;
}

::v-deep .radio-btn .el-radio__input {
    display: none;
}

.split {
    height: 6em;
}
</style>