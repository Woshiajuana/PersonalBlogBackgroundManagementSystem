/**
 * Created by Administrator on 2017/4/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types.js'
Vue.use(Vuex);

/**
 * 数据存储
 * */
const state = {
   tab_index: '1-1'
};

/**
 * 模块
 * */
const modules = {

};

/**
 * 提交同步请求
 * */
const mutations = {
    /**全局设置MENU的tab选项值*/
    [ types.SET_TAB_INDEX ] (state,tab_index) {
        state.tab_index = tab_index;
    }
};

export default new Vuex.Store({
    state,
    modules,
    mutations
})
