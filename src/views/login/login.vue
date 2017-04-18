<template>
    <!--登录页-->
    <div class="login-wrap">
        <div class="login-content">
            <h1 class="login-title">后台管理系统</h1>
            <div class="input-wrap">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                    <el-form-item class="input-box" prop="user_name">
                        <el-input type="text" placeholder="请输入帐号" v-model="loginForm.user_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="user_password">
                        <el-input type="password" placeholder="请输入密码" v-model="loginForm.user_password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="input-button">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
  </div>
  <!--/登录页-->
</template>
<script>
    import Util from '../../assets/lib/util';
    export default {
        name: 'login',
        data() {
            var validateUserName = (rule, value, callback) => {
                if (value === '')
                    return callback(new Error('请输入帐号'));
                callback();
            };
            var validateUserPassword = (rule, value, callback) => {
                if (value === '')
                    return callback(new Error('请输入密码'));
                callback();
            };
            return {
                loginForm: {
                    user_name: '',
                    user_password: ''
                },
                loginRules: {
                    user_name: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    user_password: [
                        { validator: validateUserPassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Util.dataToSessionStorageOperate.save('user',this.loginForm);
                        this.$router.push("/");
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    #app,html,body{
        @extend %oh;
        @extend %h100;
    }
    .login-wrap{
        @extend %db;
        @extend %h100;
        background-color: #1F2D3D;
    }
    .login-content{
        @extend %pa;
        @extend %l50;
        margin-top: 200px;
        margin-left: -210px;
        width: 420px;
    }
    .login-title{
        @extend %cfff;
        @extend %f16;
        @extend %tac;
        line-height: 40px;
    }
    .input-wrap{
        padding: 20px 36px;
        border-radius: 10px;
        background-color: #F9FAFC;
    }
    .input-box,.input-button{
        margin: 16px 0;
    }
    .input-button{
        button{
            @extend %w100;
            @extend %db;
        }
    }
</style>
