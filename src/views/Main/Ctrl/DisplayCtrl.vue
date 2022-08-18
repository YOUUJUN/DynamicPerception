<template>
    <el-radio-group v-model="displayRow">
        <el-radio-button label="X8"></el-radio-button>
        <el-radio-button label="X16"></el-radio-button>
        <el-radio-button label="X32"></el-radio-button>
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