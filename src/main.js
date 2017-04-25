
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store/index.js';
import Util from './assets/lib/util';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor)
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    let token = Util.dataToSessionStorageOperate.achieve('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
