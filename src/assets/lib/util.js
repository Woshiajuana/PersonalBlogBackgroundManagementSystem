/**
 * Created by Administrator on 2017/4/18.
 */
/**实用工具*/
import axios from 'axios';
const util = function ( win ) {
    /**
     * 定义一系列变量
     * */
    var util = {},
        base_url = '//www.owulia.com/ajuan_backstage';

    /**
     * 根据是线上环境还是本地环境，选取不同的server_url的值
     * */
    if(win.location.href.indexOf('localhost') > -1){
        base_url = 'http://localhost:8088';
    }

    /**格式化时间*/
    util.dateFormat = function(fmt) {
        var time = new Date();
        var o = {
            "M+" : time.getMonth()+1,                 //月份
            "d+" : time.getDate(),                    //日
            "h+" : time.getHours(),                   //小时
            "m+" : time.getMinutes(),                 //分
            "s+" : time.getSeconds(),                 //秒
            "q+" : Math.floor((time.getMonth()+3)/3), //季度
            "S"  : time.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };

    /**临时数据存储到sessionStorage中*/
    util.dataToSessionStorageOperate = {
        /**存储*/
        save ( data_name, data_value ) {
            if( data_name && data_value )
                sessionStorage.setItem( data_name, JSON.stringify(data_value) );
        },
        /**取出*/
        achieve ( data_name ) {
            if( !data_name ) return;
            var data_value = sessionStorage.getItem( data_name );
            data_value && ( data_value = JSON.parse( data_value ) );
            return data_value;
        },
        /**删除*/
        remove ( data_name ) {
            if( data_name )
                sessionStorage.removeItem( data_name );
        },
        /**清空*/
        clear () {
            sessionStorage.clear();
        }
    };

    /**登录页面*/
    util.loginAjax = {
        /**登录*/
        login ( user , success_callback) {
            util.ajax('/ajuan_backstage/login',user,'post',success_callback);
        }
    };

    /**列表页面请求文章数据的方法*/
    util.listAjax = {
        /**请求文章数据*/
        achieveArticle (data,success_callback, fail_callback) {
            util.ajax('/ajuan_backstage/fetchArticle',data,'get',success_callback,fail_callback);
        },
        /**创建文章*/
        insertArticle (data, success_callback, fail_callback) {
            util.ajax('/ajuan_backstage/insertArticle',data,'get',success_callback, fail_callback)
        },
        /**删除文章*/
        removeArticle (data, success_callback, fail_callback) {
            util.ajax('/ajuan_backstage/removeArticle',data,'get',success_callback, fail_callback)
        }
    };


    /**跳转页面*/
    util.jumpPage = function ( jumpUrl ) {
        if(typeof jumpUrl == 'undefined') win.location.href = win.location.origin + '/#/abnormal';
        else if( jumpUrl.indexOf('http') == -1)
            win.location.href = win.location.origin + '/#/' + jumpUrl;
        else
            win.location.href = jumpUrl;
    };

    /**
     * 公用请求ajax的方式
     * */
    util.ajax = function (path, data, http_method, success_callback, fail_callback) {
        axios({
            url: path,
            method: http_method,
            baseURL: base_url,
            params: data
        }).then( function (response) {
            /**token验证失败*/
            if(response.data.status == -1){
                util.jumpPage('login');
            }else {
                success_callback && success_callback(response.data);
            }
        }).catch( function (error) {
            fail_callback && fail_callback( error );
        });
    };

    return util;
} ( window );
export default util;
