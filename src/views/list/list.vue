<template>
    <div class="container-wrap">
        <div class="container-content">
            <el-table
                :data="article_arr"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="文章名"
                    show-overflow-tooltip>
                    <template scope="scope">{{ scope.row.article_title }}</template>
                </el-table-column>
                <el-table-column
                    prop="article_type"
                    label="类别"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="article_time"
                    label="发表时间"
                    width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">下架</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-wrap">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, prev, pager, next, jumper"
                :total="1000">
            </el-pagination>
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
                currentPage1: 5,
                article_arr: [],
                multipleSelection: []
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            handleClick (val){
                console.log(val)
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                this.currentPage1 = val;
                console.log(`当前页: ${val}`);
            },
            /**获取文章列表数据*/
            fetchData (route) {
                var tab = route ? route.query.tab : this.$route.query.tab;
                Util.listAjax.achieveArticle({tab:tab},(result) => {
                    if(result.status == 1)
                        this.article_arr = result.result;
                });
                this.$store.commit(types.SET_TAB_INDEX,this.judgeTab(tab));
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
        top: 40px;
        bottom: 60px;
        left: 40px;
        right: 40px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .page-wrap{
        @extend %pa;
        @extend %tac;
        left: 0;
        right: 0;
        bottom: 20px;
    }
</style>
