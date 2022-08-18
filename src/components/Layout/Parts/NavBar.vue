<template>
    <div class="header">
        <section class="start">
            <div class="logo-wrap">
                <span>房间管理</span>
            </div>
        </section>

        <section class="center">
            <div class="bread-wrap">
                <router-view name="breadCtrl"></router-view>
            </div>

            <div class="ctrl-wrap">
                <router-view name="navCtrl" />
            </div>
        </section>

        <section class="end"></section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "NavBar",

    components: {},

    computed: {
        ...mapGetters([]),
    },

    methods: {
        ...mapActions("display", []),

        toggleClick() {},
    },
};
</script>

<style>
</style>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    border-bottom: 0.1rem solid #f5f5f5;
    box-sizing: border-box;
}

.header .start,
.header .center,
.header .end {
    display: inline-flex;
}

.start {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 24rem;
    height: 100%;
    flex: none;
}

.logo-wrap span {
    font-size: 2.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333333;
}

.center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: auto;
    margin-right: 7.5rem;
}

.bread-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.bread-nav {
    margin-left: 1.5rem;
}

.ctrl-wrap {
    display: flex;
}

.end {
    flex: none;
    margin-left: 1.5rem;
    margin-right: 2rem;
}

.avatar-wrap {
    display: inline-flex;
    height: 100%;
    line-height: 100%;
    align-items: center;
    cursor: pointer;
}
</style>