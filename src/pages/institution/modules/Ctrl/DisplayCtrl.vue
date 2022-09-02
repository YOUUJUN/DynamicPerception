<template>
    <el-radio-group v-model="displayRow">
        <el-radio-button label="X6"></el-radio-button>
        <el-radio-button label="X12"></el-radio-button>
        <el-radio-button label="X24"></el-radio-button>
    </el-radio-group>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data(){
        return {

        }
    },

    created(){
        console.log('displayRow', this.displayRow);
    },

    computed : {
        displayRow : {
            get (){
                return this.$store.state.display.displayRow
            },
            set (value){
                this.changeDisplayRow(value);
            }
        },
    },

    methods : {

        ...mapActions('display', [
            'changeDisplayRow'
        ])
    }
};
</script>

<style>
</style>