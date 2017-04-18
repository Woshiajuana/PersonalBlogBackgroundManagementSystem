<template>
    <div class="menu-wrap">
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-document"></i>全部文章</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">ALL FILES</el-menu-item>
                    <el-menu-item index="1-2">HTML</el-menu-item>
                    <el-menu-item index="1-3">CSS</el-menu-item>
                    <el-menu-item index="1-4">JAVASCRIPT</el-menu-item>
                    <el-menu-item index="1-5">VUE</el-menu-item>
                    <el-menu-item index="1-6">ANGULAR</el-menu-item>
                    <el-menu-item index="1-7">NODE</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-plus"></i>发表文章</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: 'menu',
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .menu-wrap{
        @extend %pa;
        top: 60px;
        left: 0;
        width: 200px;
        bottom: 0;
        background-color: #EFF2F7;
    }
</style>
