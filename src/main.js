
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor)
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
