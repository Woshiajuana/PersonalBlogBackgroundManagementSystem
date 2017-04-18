<template>
    <!--首页-->
    <div class="view-wrap">
        <my-header></my-header>
        <my-menu></my-menu>
        <router-view></router-view>
    </div>
    <!--/首页-->
</template>
<script>
    import MyHeader from '../../components/head.vue';
    import MyMenu from '../../components/menu.vue';
    export default {
        name: 'index',
        components: {
            MyHeader,
            MyMenu
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .index-view{
        @extend %pr;
    }
    .menu-wrap{
        @extend %h100;
        width: 200px;
    }
    .container-wrap{
        @extend %pa;
        @extend %oh;
        top: 60px;
        left: 200px;
        right: 0;
        bottom: 0;
        padding: 40px;
    }
</style>
