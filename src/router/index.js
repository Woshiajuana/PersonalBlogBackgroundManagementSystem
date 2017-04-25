import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/index/index.vue';
import Login from '../views/login/login.vue';
import List from '../views/list/list.vue';
import Editor from '../views/editor/editor.vue';
import Util from '../assets/lib/util';

Vue.use(Router);

let router = new Router({
    routes: [
        /**首页*/
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '',
                    name: 'list',
                    component: List
                },
                /**编辑页*/
                {
                    path: 'editor',
                    name: 'editor',
                    component: Editor
                }
            ]
        },
        /**登录页*/
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ]
});

/**
 * 判断用户是否有登录，没有登录则跳转到登录页面
 * 如果用户已经登录，则回跳到登录的页的时候，要转到首页
 * */
router.beforeEach( (to, from, next) => {
    var user = Util.dataToSessionStorageOperate.achieve('user');
    var token = Util.dataToSessionStorageOperate.achieve('token');
    if((!token || !user) && to.path != '/login')
        next('/login');
    else if ( token && user && to.path == '/login'){
        next('/?tab=all');
    }else if ( token && user && to.path == '/' && !to.query.tab) {
        next('/?tab=all');
    }else {
        next();
    }
});
export default router
