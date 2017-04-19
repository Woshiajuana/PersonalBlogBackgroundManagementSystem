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
                <el-button type="primary" @click="submitArticle()">立即发表</el-button>
                <el-button type="primary" @click="submitArticle()">立即上传</el-button>
            </div>
        </div>
    </div>
    <!--/发表文章-->
</template>
<script>
    import types from '../../store/mutation-types';
    export default {
        data() {
            return {
                is_loading: false,
                article_title: '',
                article_type: '',
                options: [{
                    value: '选项1',
                    label: 'vue'
                }, {
                    value: '选项2',
                    label: 'html'
                }, {
                    value: '选项3',
                    label: 'css'
                }, {
                    value: '选项4',
                    label: 'angular'
                }, {
                    value: '选项5',
                    label: 'node'
                }],
                name: 'base-example',
                content: '',
                editorOption: {}
            }
        },
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
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
                setTimeout(() => {
                    this.is_loading = false;
                    this.article_type = '';
                    this.article_title = '';
                    this.content = '';
                    this.$message({
                        showClose: true,
                        message: '提交成功~~~',
                        type: 'success'
                    });
                    this.$notify.info({
                        title: '消息',
                        message: '文章列表已更新~~~'
                    });
                },3000);
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
        mounted () {
            setTimeout(() => {
                this.content = '<h1></h1>'
            }, 1800)
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .el-input-group__prepend{
        width: 150px !important;
    }
    .input-btn{
        margin: 20px 0;
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
