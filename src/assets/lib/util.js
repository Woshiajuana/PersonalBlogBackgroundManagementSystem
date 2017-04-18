/**
 * Created by Administrator on 2017/4/18.
 */
/**实用工具*/
const util = function ( win ) {
    var util = {};
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
    return util;
} ( window );
export default util;
