<template>
    <div class="container-wrap">
        <div class="container-box"
             v-loading="is_loading"
             element-loading-text="拼命加载中~~~">
            <div class="search-box">
                <el-input
                    placeholder="请输入关键字"
                    icon="search"
                    v-model="key_word"
                    :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="container-content">
                <el-table
                    :data="article_arr"
                    border
                    stripe
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        label="文章名"
                        show-overflow-tooltip>
                        <template scope="scope">{{ scope.row.article_title }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="article_type"
                        label="类别"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="article_time"
                        label="发表时间"
                        width="180"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="180">
                        <template scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">下架</el-button>
                            <el-button @click="deleteArticle(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-wrap">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page_num"
                    :page-size="page_size"
                    layout="total, prev, pager, next, jumper"
                    :total="article_total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import Util from '../../assets/lib/util';
    import types from '../../store/mutation-types';
    export default {
        name: 'list',
        data() {
            return {
                page_num:1,
                page_count: 0,
                page_size:12,
                article_total: 0,
                key_word: '',
                is_loading: false,
                article_arr: []
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
            keyWordArticle_arr () {
                var arr = [];
                if(!this.key_word)
                    return this.article_arr;
                else{
                    this.article_arr.forEach((item,index) => {
                        if(item.article_title.indexOf(this.key_word) > -1)
                            arr.push(item);
                    });
                    return arr;
                }
            }
        },
        methods: {
            handleIconClick () {
                if(!this.key_word){
                    this.$message({type: 'info', message: '请输入关键字'});
                    return;
                }
                Util.jumpPage('?tab='+this.$route.query.tab+'&&key_word='+this.key_word);
            },
            handleCurrentChange (val) {
                this.page_num = val;
                this.fetchData();
            },
            /**删除文章数据*/
            deleteArticle ({_id,article_title}) {
                this.$confirm('是否删除'+ article_title +'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Util.listAjax.removeArticle({article_id:_id},(result) => {
                        if(result.status){
                            this.fetchData();
                            this.$message({type: 'success', message: result.msg});
                        }else{
                            this.$message({type: 'success', message: result.msg});
                        }
                    });
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            /**获取文章列表数据*/
            fetchData (route) {
                this.is_loading = true;
                var tab = route ? route.query.tab: this.$route.query.tab;
                var key_word = route ? route.query.key_word: this.$route.query.key_word;
                this.$store.commit(types.SET_TAB_INDEX,this.judgeTab(tab));
                setTimeout( () => {
                    Util.listAjax.achieveArticle({
                        tab: tab,
                        page_num: this.page_num,
                        page_size: this.page_size,
                        key_word: key_word
                    }, (result) => {
                        if(result.status == 1) {
                            this.article_arr = result.data;
                            this.page_count = result.page_count;
                            this.article_total = result.article_total;
                        }
                        else this.$message({type: 'error', message: result.msg});
                        this.is_loading = false;
                    });
                },300);
            },
            /**判断列表tab键active的值index*/
            judgeTab (tab) {
                var tab_index = '';
                switch (tab){
                    case 'all':
                        tab_index = '1-1';
                        break;
                    case 'html':
                        tab_index = '1-2';
                        break;
                    case 'css':
                        tab_index = '1-3';
                        break;
                    case 'js':
                        tab_index = '1-4';
                        break;
                    case 'vue':
                        tab_index = '1-5';
                        break;
                    case 'angular':
                        tab_index = '1-6';
                        break;
                    case 'node':
                        tab_index = '1-7';
                        break;
                }
                return tab_index;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .container-content{
        @extend %pa;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 70px 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .search-box{
        @extend %pa;
        top: 20px;
        right: 40px;
        z-index: 1;
        width: 360px;
    }
    .container-box{
        @extend %h100;
    }
    .page-wrap{
        @extend %pa;
        @extend %tac;
        background-color: #fff;
        z-index: 1;
        left: 0;
        right: 0;
        padding: 10px 0 20px;
        bottom: 0;
    }
</style>
