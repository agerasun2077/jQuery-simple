(function ( window ) {
    // ��ȡ���鳣�÷����������ں����ڲ����ö�δ������飬�����ڴ�
    var arr = [],
        push = arr.push,
        slice = arr.slice;
// ���⹫���ĺ���������ԭ���빹�캯����ͬ������ constructor Ҳ���������
// ��� Itcast ����Ҳ�ǹ��캯��
function Itcast ( selector ) {
    return new Itcast.fn.init( selector );
}
// ԭ�͵����� �� ���ĳ�Ա ��
Itcast.fn = Itcast.prototype = {
    constructor : Itcast,
    length : 0,
    init : function ( selector ) {
        // �������������0,'',null, undefined
        if ( !selector ) return this;
        // ���Ԫ�أ����� this
        if ( typeof selector === 'string' ) {
            // ѡ���� �� html �ַ���
            // �жϷ���:
            // 1.trim,charAt( 0 ) == '<'
            // 2.������ʽ
            if ( /^\s*</.test( selector ) ) {
                // html ��ʽ���ַ���
                push.apply( this, Itcast.parseHTML( selector ) );
            } else {
                // ѡ����
                push.apply( this, Itcast.select( selector ) );
            }
            return this;
        }

        // dom
        if ( selector.nodeType ) {
            // ���� dom Ԫ��ת���� Itcast ����
            this[ 0 ] = selector;
            this.length = 1;
            return this;
        }
        // Itcast
        if ( selector.constructor == Itcast ) {
            // return selector;
            // ���� this, ������Ҫ���� selector ����һ���µ� Itcast ����
            push.apply( this, selector )
            return this;

        }
        // ����
        if ( typeof selector == 'function' ) {
            window.addEventListener( 'load', selector );
        }
    }

};
// ����ԭ��
Itcast.fn.init.prototype = Itcast.fn;
// �����չ����  // �ֶε��Բ���
Itcast.extend = Itcast.fn.extend = function ( obj ) {
    for ( var k in obj ) {
        this[ k ] = obj[ k ];
    }
    return this;
};
// �󶨾�̬�����򹤾߷���
Itcast.extend({
    // ��ȡ dom ����
    select : function ( selector ) {
        return docment.querySelectorAll( selector );
    },
    // �ж������α����
    isArrayLike : function ( obj ) {
        if( Object.prototype.toString.call( obj ) == '[object Array]' ) {
            return true;
        }
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >=0;
    },
    // each ��������
    each : function ( arr,callback ) {
        // ���������
        if ( Itcast.isArrayLike( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
              if ( callback.call( arr[ i ], i, arr[ i ] ) === false ) break;
            }
        } else {
            // �Ƕ���
            for ( var k in arr ) {
                if ( callback.call( arr[ k ], k, arr[ k ] ) === false ) break;
            }
        }
        return arr;
    },
    map : function ( arr, callback ) {
        var newArr = [],tmp;
        // ���������
        if ( Itcast.isArrayLike( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
                tmp = callback (arr[ i ], i );
                if ( tmp != null ) {
                    newArr.push( tmp );
                }
            }
        } else {
            // �Ƕ���
            for ( var k in arr ) {
                tmp = callback ( arr[ k ], k );
                if ( tmp != null ) {
                    newArr.push( tmp );
                }
            }
        }
        return newArr.concat.apply( [], newArr );
    }
});
//  ��ʵ�����ʷ���
Itcast.fn.extend({
    each : function ( callback ) {
        return Itcast.each( this, callback );
    },
    map : function ( callback ) {
        return Itcast.map( this, callback );
    }
});
// ��Ӻ��ķ���
Itcast.fn.extend({
    toArray : function () {
        // Ҫ���ص������飬�������� this �е�ÿһ�� dom Ԫ������ɵ�����
        // 1.
    //    var arr = [];
    //    for (var i = 0; i < this.length; i++) {
    //            arr.push( this[ i ] );
    //    }
    //    return arr;
        // 2.
        // return this.map( function ( v ) {
        //     return v;
        // })
        // 3.
        return slice.call ( this );
    },
    get : function ( index ) {
        // ���δ��ֵ �ͷ��� һ������
        if ( index === undefined ) {
            return this.toArray();
        }
        // ����
        if ( index < 0 ) {
            return this[ this.length + index ];
        } else {
            // ����
            if ( index < 0 ) {
                return this [ index ]; // �� -1 �������һ�� -2 �����ڶ���
            }
        }
    },
    first : function () {
        //var iobj = this.constructor();
        //var dom = this.get( 0 );
        //iobj[ 0 ] = dom;
        //iobj.length = 1;
        //return iobj;
        return this.eq( 0 );
    },
    eq : function ( index ) {
        // ���Ԫ�أ������� Itacst ����
        var iobj = this.constructor(); // ���û�� Itacast ����

        if ( index == null ) return iobj;

        var dom = this.get( index );
        if ( dom ) {
            iobj[ 0 ] = dom;
            iobj.length = 1; // ����iobj��һ��α���飬��Ԫ�غ�Ӧ������ 1
        }
        return iobj;
    },
    last : function () {
        return this.eq( -1 );
    },
    end : function () {
        return this.prevObject || this.constructor();
    },
    pushStack: function ( array ) {
        // this ��ǰ�� Itcast ����
        // ջ�ṹ
        var tmp = this.constructor();
        push.apply( tmp, array );
        tmp.prevObject = this;
        return tmp;
    }
});

window.Itcast = window.I = Itcast;

})( window );