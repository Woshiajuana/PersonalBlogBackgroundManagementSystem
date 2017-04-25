<template>
    <!--发表文章-->
    <div class="container-wrap">
        <div class="container-content"
             v-loading="is_loading"
             element-loading-text="拼命上传中~~~">
            <p class="prompt-text"><span class="prompt-icon">*</span>文章类型和文章标题：</p>
            <el-input class="input-box" placeholder="请输入标题" v-model="article_title">
                <template slot="prepend">
                    <el-select v-model="article_type" placeholder="请选择文章类型">
                        <el-option
                            v-for="item in options"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-input>
            <div class="quill-editor-example">
                <p class="prompt-text"><span class="prompt-icon">*</span>正文：</p>
                <quill-editor
                    ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
                </quill-editor>
                <div class="html ql-editor" v-html="content"></div>
            </div>
            <div class="input-btn">
                <el-button type="primary" @click="submitArticle()">发布文章</el-button>
                <el-button type="primary" @click="submitArticle()">保存草稿</el-button>
            </div>
        </div>
    </div>
    <!--/发表文章-->
</template>
<script>
    import types from '../../store/mutation-types';
    import Util from '../../assets/lib/util';
    export default {
        data() {
            return {
                is_loading: false,
                article_title: '',
                article_type: '',
                options: [{
                    value: 'vue',
                    label: 'vue'
                }, {
                    value: 'html',
                    label: 'html'
                }, {
                    value: 'css',
                    label: 'css'
                }, {
                    value: 'angular',
                    label: 'angular'
                }, {
                    value: 'node',
                    label: 'node'
                }, {
                    value: 'js',
                    label: 'js'
                }],
                name: 'base-example',
                content: '',
                editorOption: {}
            }
        },
        methods: {
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
            },
            onEditorReady(editor) {
            },
            /***/
            submitArticle () {
                if(!this.article_type || !this.article_title || !this.content) {
                    this.$message({
                        showClose: true,
                        message: '请把信息填写完整~~~',
                        type: 'error'
                    });
                    return;
                }
                this.is_loading = true;
                let article = {
                    article_title: this.article_title,
                    article_type: this.article_type,
                    article_time: Util.dateFormat('yyyy-MM-dd hh-mm'),
                    article_content: this.content
                };
                setTimeout(() => {
                    Util.listAjax.insertArticle({article:article},(result) => {
                        if(result.status){
                            this.is_loading = false;
                            this.article_type = '';
                            this.article_title = '';
                            this.content = '';
                            this.$message({
                                showClose: true,
                                message: '提交成功~~~',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: result.msg,
                                type: 'error'
                            });
                        }
                    });
                },300);

            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        created () {
            this.$store.commit(types.SET_TAB_INDEX,'2');
        },
        mounted () {}
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .el-input-group__prepend{
        width: 150px !important;
    }
    .input-btn{
        @extend %pf;
        right: 20px;
        top: 80px;
    }
    .prompt-icon{
        color: red;
    }
    .prompt-text{
        @extend %f20;
        @extend %c3;
        margin-bottom: 10px;
    }
    .quill-editor-example{
        margin-top: 20px;
    }
    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
    }
    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>
