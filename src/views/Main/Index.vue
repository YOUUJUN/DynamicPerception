<template>
    <section class="main-wrap" :class="displayClass">
        <template>
            <component
                v-for="item in renderData.data"
                :renderInfo="item"
                :is="displayComponentName"
                @openElderDlg="openElderDlg"
            ></component>
        </template>

        <elder-info-dlg ref="elderDlg" :elderInfo="elderInfo" :visible.sync="elderDlgVisible"></elder-info-dlg>
    </section>
</template>

<script>
const BedCardBySix = () => import("@/components/Cards/BedCard_by_6.vue");
const BedCardByTwelve = () => import("@/components/Cards/BedCard_by_12.vue");
const BedCardByTwentyfour = () => import("@/components/Cards/BedCard_by_24.vue");
const DeviceCardBySix = () => import("@/components/Cards/DeviceCard_by_6.vue");
const DeviceCardByTwelve = () => import("@/components/Cards/DeviceCard_by_12.vue");
const DeviceCardByTwentyfour = () => import("@/components/Cards/DeviceCard_by_24.vue");
const RoomCardBySix = () => import("@/components/Cards/RoomCard_by_6.vue");
const RoomCardByTwelve = () => import("@/components/Cards/RoomCard_by_12.vue");
const RoomCardByTwentyfour = () => import("@/components/Cards/RoomCard_by_24.vue");

const ElderInfoDlg = () => import('@/components/Dialogs/ElderInfoDlg.vue')

import { mapGetters, mapActions } from "vuex";
import { getElderlyData } from "@/api/dataSource.js";


export default {
    components: {
        BedCardBySix,
        BedCardByTwelve,
        BedCardByTwentyfour,
        DeviceCardBySix,
        DeviceCardByTwelve,
        DeviceCardByTwentyfour,
        RoomCardBySix,
        RoomCardByTwelve,
        RoomCardByTwentyfour,

        ElderInfoDlg,
    },

    data() {
        return {
            //老人信息窗体控制
            elderDlgVisible : false,
            //老人窗体信息数据
            elderInfo : {},
        };
    },

    computed: {
        ...mapGetters(["renderData", "displayRow"]),

        displayClass() {
            let displayRow = this.displayRow;
            let className = "";
            switch (displayRow) {
                case "X6":
                    className = "grid-by-6";
                    break;
                case "X12":
                    className = "grid-by-12";
                    break;
                case "X24":
                    className = "grid-by-24";
                    break;
            }
            return className;
        },

        displayComponentName() {
            let role = this.renderData.role;
            let displayRow = this.displayRow;
            let componentName = "";
            switch (displayRow) {
                case "X6":
                    if (role === "bed") {
                        componentName = "BedCardBySix";
                    } else if (role === "device") {
                        componentName = "DeviceCardBySix";
                    } else if (role === "room") {
                        componentName = "RoomCardBySix";
                    }
                    break;
                case "X12":
                    if (role === "bed") {
                        componentName = "BedCardByTwelve";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwelve";
                    } else if (role === "room") {
                        componentName = "RoomCardByTwelve";
                    }
                    break;
                case "X24":
                    if (role === "bed") {
                        componentName = "BedCardByTwentyfour";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwentyfour";
                    } else if (role === "room") {
                        componentName = "RoomCardByTwentyfour";
                    }
                    break;
            }
            return componentName;
        },
    },

    created() {
        console.log("renderData", this.renderData);
    },

    methods: {

        //打开老人信息窗体
        openElderDlg(id){
            getElderlyData({
                bed_id: id,
                belong: "household"
            }).then(res => {
                console.log('res -->', res);
                if(res.status === 200){
                    let bedInfo = res.data.data[0];
                    this.elderInfo = bedInfo;
                    this.elderDlgVisible = true;
                }
                
            }).catch(err => {
                console.warn('err', err);
            })
        }

    },
};
</script>

<style scoped>
.main-wrap {
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 2rem;
}

.grid-by-6 {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 5rem;
    grid-row-gap: 5rem;
    align-items: start;
}

.grid-by-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 1rem !important;
}

.grid-by-24 {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(24, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    padding: 0.5rem !important;
}
</style>