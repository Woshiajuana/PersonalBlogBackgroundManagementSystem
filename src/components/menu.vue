<template>
    <div class="menu-wrap">
        <el-menu :default-active="tabIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-document"></i>全部文章</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1"><a href="#/?tab=all">ALL FILES</a></el-menu-item>
                    <el-menu-item index="1-2"><a href="#/?tab=html">HTML</a></el-menu-item>
                    <el-menu-item index="1-3"><a href="#/?tab=css">CSS</a></el-menu-item>
                    <el-menu-item index="1-4"><a href="#/?tab=js">JAVASCRIPT</a></el-menu-item>
                    <el-menu-item index="1-5"><a href="#/?tab=vue">VUE</a></el-menu-item>
                    <el-menu-item index="1-6"><a href="#/?tab=angular">ANGULAR</a></el-menu-item>
                    <el-menu-item index="1-7"><a href="#/?tab=node">NODE</a></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-plus"></i><a href="#/editor">发表文章</a></el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: 'menu',
        computed: {
            tabIndex(){
                return this.$store.state.tab_index;
            }
        },
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
    .el-menu-item{
        @extend %pr;
        a{
            @extend %pa;
            @extend %db;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 45px;
            color: inherit;
        }
    }
</style>
