/**
 * Created by Administrator on 2017/2/22.
 */
(function ( window ) {

    var arr = [],
        push = arr.push;

    var mark = 'checked, selector, readonly, disabled'.split(',');
    Itcast.fn.extend({
        attr : function (attrName, attrValue) {
            // 如果 attrName 是字符串
            if (typeof attrName == 'string') { // 1
                // 如果value 没有赋值
                if (attrValue === undefined) { // 2
                    // 判断是否是设置标准属性
                    if (mark.indexOf(attrName) != -1) {
                        // 如果是就返回该属性值
                        return this[0][attrName];
                    } else {
                        // 自定义属性，用getAttrbute 获取
                        return this[0].getAttribute(attrName);
                    }
                    // 如果attrValue 是一个函数
                } else if (typeof attrValue === 'function') { // 3
                    // 取值的结果由回调函数决定
                    // 回调函数有一个 index 属性, 用于描述是元素在函数内对应的位置（简化后不考虑第二个参数）
                    return this.each(function (i) {
                        // 同样判断是否是标准属性
                        if (mark.indexOf(attrName) != -1) {
                            // 这里 this 是每一个dom 元素
                            this[attrName] = attrValue(i);
                        } else {
                            // 设置自定义属性
                            this.setAttribute(attrName, attrValue(i));
                        }
                    });
                } else {
                    // 设置单个值
                    // 也是设置 每一个 dom 元素
                    return this.each(function () {
                        // 判断设置属性是否是标准属性
                        if (mark.indexOf(attrName) != -1) {
                            this[attrName] = attrValue;
                        } else {
                            // 设置自定义属性
                            this.setAttribute(attrName, attrValue);
                        }
                    });
                }
            } else if (Object.prototype.call(attrName) === '[object Object]') { // 4
                // 是对象，设置多个属性
                // 给 this 中的每一个 dom 元素都设置 attrName 中的每一个属性
                return this.each(function () {
                    // 储存当前 对象
                    var Iobj = this;
                    Itcast.each(attrName, function (k, v) {
                        // 判断是否是标准属性
                        if (mark.indexOf(k) != -1) {
                            Iobj[k] = v;
                        } else {
                            // 设置自定义属性
                            Iobj.setAttribute(k, v);
                        }
                    });
                });
            }
        },
        prop: function ( attrName,attrValue ) {
            if ( typeof attrName == 'string') {
                if ( attrValue === undefined ) {
                    return this[ 0 ][ attrName ];
                } else if ( typeof attrValue === 'function' ) {
                    return  this.each(function ( i ) {
                        this[ attrName ] == attrValue( i, this[ attrName ] );
                    });
                } else {
                    return this.each( function () {
                        this[ attrName ] = attrValue;
                    });
                }
            } else if ( Object.prototype.toString.call( attrName ) === '[object Object]') {
                return this.each(function () {
                    var that = this;
                    Itcast.each( attrName, function ( k, v ) {
                        that[ k ] = v;
                    });
                });
            }
        }

    })

    Itcast.fn.extend({
        html: function ( html ) {
            if ( html ) {
                return this.each(function () {
                    this.innerHTML = html;
                })
            } else {
                // 获取
                return this[ 0].innerHTML;
            }
        },
        text: function ( txt ) {
            if ( txt ) {
                // 设置
                return this.each(function () {
                    this.innerText = txt;
                });
            } else {
                // 获取
                return this[ 0 ].innerText;
            }
        },
        val: function ( value ) {
            if ( value ) {
                // 设置
                return this.each(function () {
                    this.value = value;
                });
            } else {
                // 获取
                return this[ 0 ].value;
            }
        }

    })




})( window );

