/**
 * Created by Administrator on 2017/2/21.
 */
(function ( window ) {
Itcast.fn.extend({

    css: function ( key, value ) {
        if ( Itcast.isArrayLike( key ) ) {
            // 数组，忽略第二个参数
            // 返回的是第 0 个 dom 元素 （ this[ 0 ] ) 中对应的属性的 对象
            var obj = {},
                target = this [ 0 ];
            Itcast.each( key, function ( i, v ) {
                // v 表示要获得的样式名
                obj[ v ] = target[ v ] || window.getComputedStyle( target )[ v ];
            });
            return obj;
        } else if ( Object.prototype.toString.call( key ) === '[object Object]' ) {
            // 对象
            // 给 this 中的每一个元素都加上 key 中描述的所有样式
            // this 是 jq 对象
            return this.each(function () {
                for ( var k in key ) {
                    // this 是 dom 对象
                    this.style[ k ] = key[ k ];
                }
            });
        } else if ( typeof key === 'string' ) {
           if ( value === undefined ) {
               // 获得对应的样式
               return this[ 0 ].style[ key ] || window.getComputedStyle( this[ 0 ] )[ key ];
           } else if ( typeof value == 'string' ) {
               // 设置样式
               // 给 每一个 dom 元素都设置这个样式
               return this.each(function () {
                    this.style[ key ] = value;
               });
           } else if ( typeof value === 'function' ) {
               // 设置条件
               // 给每一个 dom 设置样式，但是样式值由函数返回值决定
               return this.each(function ( index ) {
                   // this.style[ key ] 代表获取行内样式(内嵌，外部，导入 无法获取)， || 获取嵌入样式
                    this.style[ key ] = value( index, this.style[ key ] || window.getComputedStyle( this )[ key ] )
               });
           }
        }
    },
    hasClass: function ( calssName ) {
        className = className.trim();
        for ( var i = 0; i < this.length; i++ ) {
            var dom = this[ i ],
                classNames = dom.calssName && dom.calssName.split( ' ' );
            if ( classNames && classNames.indexOf( calssName ) > -1 ) {
                // 存在
                return true;
            }
        }
        return false;
    },
    addClass: function ( className ) {
        return this.each(function () {
            if ( this.className ) {
                this.className += ' ' + className;
            } else {
                this.className = className;
            }
        });
    },
    removeClass: function ( className ) {
        className = className.trim(); // ES5
        return this.each(function () {
            // 删除 this 中的 对应 className
            var classNames = this.className && this.className.split( ' ' );
            if ( !classNames ) return;
            var index;
            while( ( index = classNames.indexOf( className ) ) != -1 ) {
                classNames.splice( index, 1 );
            }
            this.className = classNames.join( ' ' );
        });
    },
    toggleClass: function ( className ) {
        return this.each( function () {
            if ( I( this ).hasClass( className ) ) {
                I( this ).removeClass( className );
            } else {
                I( this ).addClass( className );
            }
        });
    }
})
})( window )