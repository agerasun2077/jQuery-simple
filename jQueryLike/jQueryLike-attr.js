/**
 * Created by Administrator on 2017/2/22.
 */
(function ( window ) {

    var arr = [],
        push = arr.push;

    var mark = 'checked, selector, readonly, disabled'.split(',');
    Itcast.fn.extend({
        attr : function (attrName, attrValue) {
            // ��� attrName ���ַ���
            if (typeof attrName == 'string') { // 1
                // ���value û�и�ֵ
                if (attrValue === undefined) { // 2
                    // �ж��Ƿ������ñ�׼����
                    if (mark.indexOf(attrName) != -1) {
                        // ����Ǿͷ��ظ�����ֵ
                        return this[0][attrName];
                    } else {
                        // �Զ������ԣ���getAttrbute ��ȡ
                        return this[0].getAttribute(attrName);
                    }
                    // ���attrValue ��һ������
                } else if (typeof attrValue === 'function') { // 3
                    // ȡֵ�Ľ���ɻص���������
                    // �ص�������һ�� index ����, ����������Ԫ���ں����ڶ�Ӧ��λ�ã��򻯺󲻿��ǵڶ���������
                    return this.each(function (i) {
                        // ͬ���ж��Ƿ��Ǳ�׼����
                        if (mark.indexOf(attrName) != -1) {
                            // ���� this ��ÿһ��dom Ԫ��
                            this[attrName] = attrValue(i);
                        } else {
                            // �����Զ�������
                            this.setAttribute(attrName, attrValue(i));
                        }
                    });
                } else {
                    // ���õ���ֵ
                    // Ҳ������ ÿһ�� dom Ԫ��
                    return this.each(function () {
                        // �ж����������Ƿ��Ǳ�׼����
                        if (mark.indexOf(attrName) != -1) {
                            this[attrName] = attrValue;
                        } else {
                            // �����Զ�������
                            this.setAttribute(attrName, attrValue);
                        }
                    });
                }
            } else if (Object.prototype.call(attrName) === '[object Object]') { // 4
                // �Ƕ������ö������
                // �� this �е�ÿһ�� dom Ԫ�ض����� attrName �е�ÿһ������
                return this.each(function () {
                    // ���浱ǰ ����
                    var Iobj = this;
                    Itcast.each(attrName, function (k, v) {
                        // �ж��Ƿ��Ǳ�׼����
                        if (mark.indexOf(k) != -1) {
                            Iobj[k] = v;
                        } else {
                            // �����Զ�������
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
                // ��ȡ
                return this[ 0].innerHTML;
            }
        },
        text: function ( txt ) {
            if ( txt ) {
                // ����
                return this.each(function () {
                    this.innerText = txt;
                });
            } else {
                // ��ȡ
                return this[ 0 ].innerText;
            }
        },
        val: function ( value ) {
            if ( value ) {
                // ����
                return this.each(function () {
                    this.value = value;
                });
            } else {
                // ��ȡ
                return this[ 0 ].value;
            }
        }

    })




})( window );

