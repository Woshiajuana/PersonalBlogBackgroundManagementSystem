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
        base_url = '//www.owulia.com/ajuan_back';

    /**
     * 根据是线上环境还是本地环境，选取不同的server_url的值
     * */
    if(win.location.href.indexOf('localhost') > -1){
        base_url = '';
    }

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
        }
    };

    /**列表页面请求文章数据的方法*/
    util.listAjax = {
        /**请求文章数据*/
        achieveArticle (data,success_callback, fail_callback) {
            util.ajax('../../static/list/files_'+ data.tab +'.json',{},'get',success_callback, fail_callback);
        }
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
            success_callback && success_callback(response.data);
            fail_callback && fail_callback( result );
        }).catch( function (error) {
            fail_callback && fail_callback( error );
        });
    };
    return util;
} ( window );
export default util;
