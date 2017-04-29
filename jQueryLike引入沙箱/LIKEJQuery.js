/**
 * Created by Administrator on 2017/2/17.
 */
(function ( window ) {

    var arr = [];
    push = arr.push;

// ���⹫���ĺ���������ԭ���빹�캯����ͬ������ constructor Ҳ���������
// ��� Itcast ����Ҳ�ǹ��캯��
function Itcast ( selector ) {
    return new Itcast.fn.init( selector );
}
// ԭ�͵�����
Itcast.fn = Itcast.prototype = {
    constructor : Itcast,

    init : function ( selector ) {
        // ���Ԫ�أ� ���� this
        push.apply( this,Itcast.select( selector ));
    },
    // ʵ��ҲӦ������ each �� map �ȷ���
    each : function ( callback ) {
        // ���� this ʹ�� callback ����ÿһ��Ԫ��
        return Itcast.each( this, callback );
    },
    map : function ( callback ) {
        return Itcast.map( this, callback );
    }
};
// ����ԭ��
Itcast.fn.init.prototype = Itcast.fn;
// �Ѿ�д�õĹ��߷���
Itcast.select = function ( selector ) {
    return document.querySelectorAll( selector );
};
Itcast.isArrayLike = function ( obj ) {
    if ( Object.prototype.toString.call( obj ) == '[object Array]' ) {
        return true;
    }
    var length = 'length' in obj && obj.length;
    return typeof length === 'number' && length>=0;
};
Itcast.each = function ( arr, callback ) {
    if ( Itcast.isArrayLike ( arr )) {
        for (var i = 0; i < arr.length; i++) {
          if ( callback.call( arr[ i ], i, arr[ i ] ) === false ) break;
        }
    } else {
        for ( var k in arr ) {
            if( callback.call( arr[ k ], k, arr[ k ] ) === false ) break;
        }
    }
    return arr;
}
Itcast.map = function ( arr, callback ) {
    var NewArr = [],tmp;
    if ( Itcast.isArrayLike( arr )) {
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


window.Itcast = window.I = Itcast;


})( window );