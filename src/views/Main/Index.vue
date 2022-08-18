<template>
  
    <section class="main-wrap">

        <bed-card v-for="item in renderData"></bed-card>

    </section>

</template>

<script>
const BedCard = () => import('@/components/Cards/BedCard.vue');

import {mapGetters} from "vuex";

export default {
    components : {
        BedCard
    },

    data(){
        return {
            testData : [1,2]
        }
    },

    computed : {
        ...mapGetters(['renderData']),
    },

    created(){
        console.log('renderData', this.renderData);
    },

    methods : {

    }

    
}
</script>

<style scoped>

.main-wrap{
    display: flex;
    flex-direction: row;
    height: 100%;
    padding:2rem;
}

</style>