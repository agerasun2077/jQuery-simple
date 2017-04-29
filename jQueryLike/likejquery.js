/**
 * Created by Administrator on 2017/2/17.
 */
// 引入构造函数 F
function F ( selector ) {
    [].push.apply( this, F.select( selector ) );
}
F.select = function ( selector ) {
    return document.querySelectorAll( selector );
};
F.prototype.each = function ( callback ) {
    return F.each( this,callback );
};

F.prototype.map = function ( callback ) {
   return F.map( this,callback );
};

F.isArrayLike =function ( obj ) {
    if ( Object.prototype.toString.call( obj ) == '[object Array]' ) {
        return true;
    }
    var length = 'length' in obj && obj.length;
    return typeof length === 'number' && length >=0;
};
F.each = function ( arr,callback ) {
    if (F.isArrayLike ( arr ) ) {
        for (var i = 0; i < arr.length; i++) {
             if (callback.call( arr[ i ], i, arr[ i ] ) === false ) break;
        }
    } else {
        for ( var k in arr ) {
            if ( callback.call( arr[ k ], k, arr[ k ] ) === false ) break;
        }
    }
    return arr;
};
F.map = function ( arr,callback ) {
    var NewArr = [],tmp;
    if (F.isArrayLike( arr ) ) {
        for (var i = 0; i < arr.length; i++) {
             tmp = callback( arr[ i ], i );
            if ( tmp != null ) {
                NewArr.push( tmp );
            }
        }
    } else {
        for ( var k in arr ) {
            tmp = callback( arr[ k ], k );
            if ( tmp != null ) {
                NewArr.push( tmp );
            }
        }
    }
    return NewArr;
}
// 将这些方法挂载到 构造函数 F 上
// 模仿 jq 代码，在 jq 中的遍历方法 each , map 都有两种访问方法
// 静态方法，和 实例方法的版本