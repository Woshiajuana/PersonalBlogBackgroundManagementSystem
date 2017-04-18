<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
    @import "./assets/scss/reset";
    @import "./assets/scss/define";
    .view-wrap{
        @extend %w100;
        @extend %h100;
    }
</style>
