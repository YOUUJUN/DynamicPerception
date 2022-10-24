<template>
    <el-dialog
        custom-class="elder-dlg"
        :visible.sync="visible"
        :before-close="handleClose"
        :close-on-click-modal="false"
    >
        <section class="iframe-wrap">
            <iframe id="callFrame" :src="iframeUrl"></iframe>
        </section>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            iframeUrl: "",
        };
    },

    mounted() {},

    methods: {
        setIframeContent(url) {
            this.iframeUrl = url;
        },

        handleClose() {
            console.log('closeing....')
            this.iframeUrl = '';
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style>
.elder-dlg {
    width: 30rem;
}
</style>

<style scoped>
::v-deep .el-dialog__body {
    overflow: hidden;
    padding: 0;
}

.iframe-wrap {
    height: 58.5rem;
    width: 100rem;
    margin-left: -35rem;
    margin-bottom: -5.8rem
}

.iframe-wrap iframe {
    border: none;
    width: 100%;
    height: 100%;
}
</style>