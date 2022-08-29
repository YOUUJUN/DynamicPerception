<template>
    <section class="main-wrap" :class="displayClass">
        <template>
            <component
                v-for="item in renderData.data"
                :renderInfo="item"
                :is="displayComponentName"
            ></component>
        </template>
    </section>
</template>

<script>
const BedCardBySix = () => import("@/components/Cards/BedCard_by_6.vue");
const BedCardByTwelve = () => import("@/components/Cards/BedCard_by_12.vue");
const BedCardByTwentyfour = () => import("@/components/Cards/BedCard_by_24.vue");
const DeviceCardBySix = () => import("@/components/Cards/DeviceCard_by_6.vue");
const DeviceCardByTwelve = () => import("@/components/Cards/DeviceCard_by_12.vue");
const DeviceCardByTwentyfour = () => import("@/components/Cards/DeviceCard_by_24.vue");

import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        BedCardBySix,
        BedCardByTwelve,
        BedCardByTwentyfour,
        DeviceCardBySix,
        DeviceCardByTwelve,
        DeviceCardByTwentyfour,
    },

    data() {
        return {};
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
                        componentName = "BedCardBySix";
                    }
                    break;
                case "X12":
                    if (role === "bed") {
                        componentName = "BedCardByTwelve";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwelve";
                    } else if (role === "room") {
                        componentName = "BedCardByTwelve";
                    }
                    break;
                case "X24":
                    if (role === "bed") {
                        componentName = "BedCardByTwentyfour";
                    } else if (role === "device") {
                        componentName = "DeviceCardByTwentyfour";
                    } else if (role === "room") {
                        componentName = "BedCardByTwentyfour";
                    }
                    break;
            }
            return componentName;
        },
    },

    created() {
        console.log("renderData", this.renderData);
    },

    methods: {},
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
    grid-column-gap: 1rem;
    padding: 1rem !important;
}

.grid-by-24 {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: 0.5rem;
    padding: 0.5rem !important;
}
</style>