/**
 * Created by Administrator on 2017/2/21.
 */
(function ( window ) {
Itcast.fn.extend({

    css: function ( key, value ) {
        if ( Itcast.isArrayLike( key ) ) {
            // ���飬���Եڶ�������
            // ���ص��ǵ� 0 �� dom Ԫ�� �� this[ 0 ] ) �ж�Ӧ�����Ե� ����
            var obj = {},
                target = this [ 0 ];
            Itcast.each( key, function ( i, v ) {
                // v ��ʾҪ��õ���ʽ��
                obj[ v ] = target[ v ] || window.getComputedStyle( target )[ v ];
            });
            return obj;
        } else if ( Object.prototype.toString.call( key ) === '[object Object]' ) {
            // ����
            // �� this �е�ÿһ��Ԫ�ض����� key ��������������ʽ
            // this �� jq ����
            return this.each(function () {
                for ( var k in key ) {
                    // this �� dom ����
                    this.style[ k ] = key[ k ];
                }
            });
        } else if ( typeof key === 'string' ) {
           if ( value === undefined ) {
               // ��ö�Ӧ����ʽ
               return this[ 0 ].style[ key ] || window.getComputedStyle( this[ 0 ] )[ key ];
           } else if ( typeof value == 'string' ) {
               // ������ʽ
               // �� ÿһ�� dom Ԫ�ض����������ʽ
               return this.each(function () {
                    this.style[ key ] = value;
               });
           } else if ( typeof value === 'function' ) {
               // ��������
               // ��ÿһ�� dom ������ʽ��������ʽֵ�ɺ�������ֵ����
               return this.each(function ( index ) {
                   // this.style[ key ] �����ȡ������ʽ(��Ƕ���ⲿ������ �޷���ȡ)�� || ��ȡǶ����ʽ
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
                // ����
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
            // ɾ�� this �е� ��Ӧ className
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