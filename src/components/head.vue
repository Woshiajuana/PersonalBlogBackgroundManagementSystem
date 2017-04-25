<template>
  <div class="header-wrap">
      <h1 class="header-logo">后台管理系统</h1>
      <div class="user-info">
          <el-dropdown>
              <span class="el-dropdown-link user-name">
              <img class="user-img" src="../assets/images/header-img.jpg" alt="">
                {{ user_name }}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><a @click="safeExit">安全退出</a></el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
  </div>
</template>

<script>
    import Util from '../assets/lib/util';
    export default {
        name: 'header',
        data () {
            return {
                user_name: ''
            };
        },
        created () {
            this.achieveUser();
        },
        methods: {
            achieveUser () {
                this.user_name = Util.dataToSessionStorageOperate.achieve('user').user_name;
            },
            safeExit () {
                this.$confirm('是否删除安全退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Util.dataToSessionStorageOperate.clear();
                    this.$router.push("/login");
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/define";
    .header-wrap{
        height: 60px;
        background-color: #1F2D3D;
    }
    .header-logo{
        @extend %fl;
        @extend %f22;
        @extend %cfff;
        line-height: 60px;
        margin-left: 20px;
    }
    .user-info{
        @extend %pa;
        @extend %cp;
        top: 10px;
        right: 20px;
    }
    .user-img{
        @extend %vam;
        width: 40px;
        height: 40px;
        margin-right: 5px;
        border-radius: 50%;
    }
    .user-name{
        @extend %cp;
        @extend %cfff;
        @extend %f12;
        @extend %vam;
    }
</style>
