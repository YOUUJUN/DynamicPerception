<template>
    <section class="main-wrap" :class="displayClass">
        <component
            v-for="item in renderData"
            :bedInfo="item"
            :is="displayComponentName"
        ></component>
    </section>
</template>

<script>
const BedCardBySix = () => import("@/components/Cards/BedCard_by_6.vue");
const BedCardByTwelve = () => import("@/components/Cards/BedCard_by_12.vue");
const BedCardByTwentyfour = () => import("@/components/Cards/BedCard_by_24.vue");

import { mapGetters } from "vuex";

export default {
    components: {
        BedCardBySix,
        BedCardByTwelve,
        BedCardByTwentyfour,
    },

    data() {
        return {

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
            let displayRow = this.displayRow;
            let componentName = "";
            switch (displayRow) {
                case "X6":
                    componentName = "BedCardBySix";
                    break;
                case "X12":
                    componentName = "BedCardByTwelve";
                    break;
                case "X24":
                    componentName = "BedCardByTwentyfour";
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
    grid-template-columns:  repeat(6, 1fr);
    grid-column-gap: 5rem;
}

.grid-by-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 1rem;
    padding:1rem !important;
}

.grid-by-24 {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: .5rem;
    padding:.5rem !important;
}
</style>