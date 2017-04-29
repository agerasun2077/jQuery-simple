/**
 * Created by Administrator on 2017/2/21.
 */
(function ( window ) {

var arr = [],
    push = arr.push;
// �¼�ͨ�÷���
Itcast.fn.extend({
    on: function ( type, callback ) {
        return this.each(function () {
            this.addEventListener( type, callback );
        });
    },
    off: function ( type, callback ) {
        return this.each(function () {
            this.removeEventListener( type, callback );
        });
    }
});



// �����¼��Ŀ�ݷ���
// ����Щ�¼�
Itcast.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
"change select submit keydown keypress keyup error contextmenu").split(" "), function ( i, v ) {
   Itcast.fn[ v ] = function ( callback ) {
        return this.on( v, callback );
   }
});

})( window )