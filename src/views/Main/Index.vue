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
const BedCardByEight = () => import("@/components/Cards/BedCard_by_8.vue");
const BedCardBySixteen = () => import("@/components/Cards/BedCard_by_16.vue");
const BedCardByTwentyfour = () => import("@/components/Cards/BedCard_by_24.vue");

import { mapGetters } from "vuex";

export default {
    components: {
        BedCardByEight,
        BedCardBySixteen,
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
                case "X8":
                    className = "grid-by-8";
                    break;
                case "X16":
                    className = "grid-by-16";
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
                case "X8":
                    componentName = "BedCardByEight";
                    break;
                case "X16":
                    componentName = "BedCardBySixteen";
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

.grid-by-8 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 2rem;
}

.grid-by-16 {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
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