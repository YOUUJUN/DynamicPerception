<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            
        };
    },
};
</script>

<style>
*{
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

ul{
    margin:0;
    padding:0;
}

#app {
    height: 100%;
}
</style>
