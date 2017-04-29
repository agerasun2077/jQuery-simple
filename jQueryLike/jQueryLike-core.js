(function ( window ) {
    // 提取数组常用方法，避免在函数内部调用多次创建数组，消耗内存
    var arr = [],
        push = arr.push,
        slice = arr.slice;
// 对外公开的函数，但是原型与构造函数相同，而且 constructor 也是这个函数
// 因此 Itcast 函数也是构造函数
function Itcast ( selector ) {
    return new Itcast.fn.init( selector );
}
// 原型的设置 （ 核心成员 ）
Itcast.fn = Itcast.prototype = {
    constructor : Itcast,
    length : 0,
    init : function ( selector ) {
        // 如果传入的如果是0,'',null, undefined
        if ( !selector ) return this;
        // 获得元素，设置 this
        if ( typeof selector === 'string' ) {
            // 选择器 或 html 字符串
            // 判断方法:
            // 1.trim,charAt( 0 ) == '<'
            // 2.正则表达式
            if ( /^\s*</.test( selector ) ) {
                // html 格式的字符串
                push.apply( this, Itcast.parseHTML( selector ) );
            } else {
                // 选择器
                push.apply( this, Itcast.select( selector ) );
            }
            return this;
        }

        // dom
        if ( selector.nodeType ) {
            // 将该 dom 元素转换成 Itcast 对象
            this[ 0 ] = selector;
            this.length = 1;
            return this;
        }
        // Itcast
        if ( selector.constructor == Itcast ) {
            // return selector;
            // 保留 this, 但是需要利用 selector 构造一个新的 Itcast 对象
            push.apply( this, selector )
            return this;

        }
        // 函数
        if ( typeof selector == 'function' ) {
            window.addEventListener( 'load', selector );
        }
    }

};
// 共享原型
Itcast.fn.init.prototype = Itcast.fn;
// 添加扩展方法  // 分段调试测试
Itcast.extend = Itcast.fn.extend = function ( obj ) {
    for ( var k in obj ) {
        this[ k ] = obj[ k ];
    }
    return this;
};
// 绑定静态方法或工具方法
Itcast.extend({
    // 获取 dom 对象
    select : function ( selector ) {
        return docment.querySelectorAll( selector );
    },
    // 判断数组或伪数组
    isArrayLike : function ( obj ) {
        if( Object.prototype.toString.call( obj ) == '[object Array]' ) {
            return true;
        }
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >=0;
    },
    // each 遍历方法
    each : function ( arr,callback ) {
        // 如果是数组
        if ( Itcast.isArrayLike( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
              if ( callback.call( arr[ i ], i, arr[ i ] ) === false ) break;
            }
        } else {
            // 是对象
            for ( var k in arr ) {
                if ( callback.call( arr[ k ], k, arr[ k ] ) === false ) break;
            }
        }
        return arr;
    },
    map : function ( arr, callback ) {
        var newArr = [],tmp;
        // 如果是数组
        if ( Itcast.isArrayLike( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
                tmp = callback (arr[ i ], i );
                if ( tmp != null ) {
                    newArr.push( tmp );
                }
            }
        } else {
            // 是对象
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
//  绑定实例访问方法
Itcast.fn.extend({
    each : function ( callback ) {
        return Itcast.each( this, callback );
    },
    map : function ( callback ) {
        return Itcast.map( this, callback );
    }
});
// 添加核心方法
Itcast.fn.extend({
    toArray : function () {
        // 要返回的是数组，而且是由 this 中的每一个 dom 元素所组成的数组
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
        // 如果未赋值 就返回 一个数组
        if ( index === undefined ) {
            return this.toArray();
        }
        // 负数
        if ( index < 0 ) {
            return this[ this.length + index ];
        } else {
            // 正数
            if ( index < 0 ) {
                return this [ index ]; // ？ -1 就是最后一个 -2 倒数第二个
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
        // 获得元素，并构造 Itacst 对象
        var iobj = this.constructor(); // 调用获得 Itacast 对象

        if ( index == null ) return iobj;

        var dom = this.get( index );
        if ( dom ) {
            iobj[ 0 ] = dom;
            iobj.length = 1; // 由于iobj是一个伪数组，在元素后应该增加 1
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
        // this 以前的 Itcast 对象
        // 栈结构
        var tmp = this.constructor();
        push.apply( tmp, array );
        tmp.prevObject = this;
        return tmp;
    }
});

window.Itcast = window.I = Itcast;

})( window );