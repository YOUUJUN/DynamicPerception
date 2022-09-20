<template>
    <el-dialog
        custom-class="elder-dlg"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
    >
        <section class="dlg-header">
            <h2 class="dlg-title">{{ elderInfo.residence_level }}</h2>
        </section>

        <section class="dlg-body">
            <div class="body-top">
                <img class="avatar" :src="elderAvatar(elderInfo)" />
                <span class="name">{{ elderInfo.name }}</span>
                <span class="gender">{{ elderInfo.gender }}</span>
                <span class="age">{{ elderInfo.age }}岁</span>
            </div>

            <div class="body-middle">
                <ul class="dlg-list">
                    <li class="list-item">
                        <div class="list-item-left">紧急联系人</div>
                        <div class="list-item-right">
                            {{ elderInfo.emergency_contact }}
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-left">联系方式</div>
                        <div class="list-item-right">
                            {{ elderInfo.phone_number }}
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-left">心率</div>
                        <div class="list-item-right">{{ elderInfo.heart }}</div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-left">呼吸</div>
                        <div class="list-item-right">{{ elderInfo.breathing }}</div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-left">能力等级</div>
                        <div class="list-item-right">
                            {{ elderInfo.elder_type }}
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section class="dlg-footer">
            <div class="foot-top">
                <span>慢病类型：</span>
            </div>
            <div class="foot-bottom">
                <el-tag type="info" v-for="(item, index) in elderInfo.diseases">{{ item.name }}</el-tag>
            </div>
        </section>
    </el-dialog>
</template>

<script>
import { getDeviceImgUrl } from "@/api/dict.js";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        elderInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {};
    },

    computed: {
        elderAvatar() {
            return (elderInfo) => {
                if (elderInfo.img) {
                    return elderInfo.img;
                }

                if (elderInfo.gender === "男") {
                    return getDeviceImgUrl("male");
                } else {
                    return getDeviceImgUrl("female");
                }
            };
        },
    },

    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style>
.elder-dlg {
    font-family: Source Han Sans CN;
}

.elder-dlg .el-dialog__header {
    padding: 0;
}

.elder-dlg .el-dialog__body {
    background: #f5f7f9;
    padding: 3rem 2rem;
    color: #606266;
}
</style>

<style scoped>
.dlg-header {
    text-align: center;
    padding: 0 1rem 1rem 1rem;
    border-bottom: 0.1rem solid #7c98ad;
}

.dlg-header .dlg-title {
    font-size: 2.6rem;
    font-weight: 500;
    color: #2c506c;
    margin: 0;
}

.dlg-body {
    padding: 0 1.5rem;
}

.body-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.2rem 0;
}

.body-top .avatar {
    width: 5rem;
    height: 5rem;
}

.body-top .name {
    font-size: 2.2rem;
    font-weight: 400;
    color: #2c506c;
    margin-left: 1.8rem;
}

.body-top .gender,
.body-top .age {
    font-size: 1.6rem;
    font-weight: 400;
    color: #999999;
    margin-left: 1.4rem;
}

.body-middle {
    padding: 0 1.5rem;
}

.body-middle .dlg-list {
    list-style: none;
}

.dlg-list .list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 0.1rem solid #e8e8e8;
}

.list-item-left {
    font-size: 1.6rem;
}

.list-item-right {
    font-size: 1.6rem;
    color: #2c506c;
}

/*---footer---*/
.foot-top {
    font-size: 1.8rem;
    color: #2c506c;
    padding: 2.8rem 1rem 0;
}

.foot-bottom{
    margin-top:.8rem;
    margin-left:3rem;
}

/*---tags---*/
.el-tag + .el-tag {
    margin-left: 1rem;
  }
</style>