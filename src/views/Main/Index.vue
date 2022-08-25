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

import { mapGetters } from "vuex";

export default {
    components: {
        BedCardByEight,
    },

    data() {
        return {
            testData: [1, 2],
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
                case "X32":
                    className = "grid-by-32";
                    break;
            }
            return className;
        },

        displayComponentName() {
            let displayRow = this.displayRow;
            let className = "";
            switch (displayRow) {
                case "X8":
                    className = "BedCardByEight";
                    break;
                case "X16":
                    className = "BedCardByEight";
                    break;
                case "X32":
                    className = "BedCardByEight";
                    break;
            }
            return className;
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
</style>