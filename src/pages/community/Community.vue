<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },

    mounted() {
        this.flexible();
    },

    methods: {
        //控制rem
        flexible() {
            var docEl = document.documentElement;
            var dpr = window.devicePixelRatio || 1;
            function setRemUnit() {
                var rem = docEl.clientWidth / 192;
                docEl.style.fontSize = rem + "px";
            }
            setRemUnit();

            // reset rem unit on page resize
            window.addEventListener("resize", setRemUnit);
            window.addEventListener("pageshow", function (e) {
                if (e.persisted) {
                    setRemUnit();
                }
            });
        },
    },
};
</script>

<style>
@import url("~@/styles/global_ele.css");

* {
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    font-family: Poppins, sans-serif;
    box-sizing: border-box;
}

ul {
    margin: 0;
    padding: 0;
}

#app {
    height: 100%;
}
</style>
