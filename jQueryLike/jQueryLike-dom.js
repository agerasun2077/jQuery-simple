/**
 * Created by Administrator on 2017/2/18.
 */
(function ( window ) {
 var arr = [],
     push = arr.push,
     slice = arr.slice;

 // ����dom ����
  Itcast.parseHTML = function ( html ) {
     // 1. ׼������
     var div = document.createElement( 'div' );
     // 2.��������ֵ��innerHTML
     div.innerHTML = html;
     // 3. ׼��һ�����飬���ղ���������
     var arr = [];
     for ( var i = 0; i < div.childNodes.length; i++ ) {
         arr.push( div.childNodes[ i ] );
     }
     return arr;
 };

// ���߷���
  var tmpDomMettod = {
      appendTo : function ( currentNode, objNode ) {
          objNode.appendChild( currentNode );
      },
      prependTo : function ( currentNode, objNode ) {
          if ( objNode.childNodes.length == 0 ) {
              objNode.appendChild( currentNode );
          } else {
              objNode.insertBefore( currentNode, objNode.firstChild );
          }
      },
      insertBefore : function ( currentNode, objNode ) {
          objNode.parentNode.insertBefore( currentNode, objNode );
      },
      insertAfter : function ( currentNode, objNode ) {
          var nextNode = objNode.nextSibling;
          if ( nextNode ) {
              nextNode.parentNode.insertBefore( currentNode, nextNode );
          } else {
              objNode.parentNode.appendChild( currentNode );
          }
      }
  };

Itcast.extend( tmpDomMettod );
// �� Itcast.fn ��� appendTo, prependTo, inserTBefore, insertAfter ����
Itcast.each( tmpDomMettod, function ( k, v ) {
        Itcast.fn[ k ] = function ( selector ) {
            var iObj = this.constructor( selector );
            var tmp =[],tmpNode;
            for (var i = 0; i < this.length; i++) {
              for (var j = 0; j < iobj.length; j++) {
                    tmpNode = j ==iObj.length -1 ? this[ i ] : this[ i].cloneNode( true );
                    tmp.push( tmpNode );
                  // ʹ�� k ��Ӧ�ķ��� v ���������������Ԫ��
                    v( tmpNode,iObj[ j ] );
              }
            }
        // return this.pushStack( tmp );

        var tmpIobj = this.constructor();
            tmpIobj.prevObject = this;
            push.apply( tmpIobj, tmp );
            return tmpIobj;
    }
});

Itcast.each({
    'append' : 'appendTo',
    'prepend': 'prependTo',
    'before' : 'insertBefore',
    'after' : 'insertAfter'
}, function ( k, v ) {
    Itcast.fn[ k ] = function ( selector ) {
        this.constructor( selector )[ v ]( this );
        return this;
    };
});


// ������������
// ���߷���
Itcast.extend({
    contains: function ( arr, item ) {
        // return arr.indexOf ( item ) > -1;
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[ i ] == item ) {
                return true;
            }
        }
        return false;
    },
    uniaue:function ( arr ) {
        var newArr = [];
        for ( var i = 0; i < arr.length; i++ ) {
            if ( !Itcast.contains( newArr, arr[ i ] )) {
                newArr.push( arr[ i ] );
            }
        }
        return newArr;
    }
});

// �������ʷ������Ԫ�صĹ��߷���
var domElementTool = {
    next:function ( node ) {
        var tmp = node;
        while ( tmp =tmp.nextSibling ) {
            if ( tmp.nodeType == 1 ) {
                return tmp;
            }
        }
        return null;
    },
    nextAll: function ( node ) {
        var tmp = node;
        arr = [];
        while ( tmp = tmp.nextSibling ) {
            if ( tmp.nodeType == 1 ) {
                arr.push( tmp );
            }
        }
        return null;
    },
    prev: function ( node ) {
        var tmp = node;
        while ( tmp = tmp.previousSibling ) {
            if ( tmp.nodeType == 1 ) {
                return tmp;
            }
        }
        return null;
    },
    prevAll: function  ( node ) {
        var tmp = node,
            arr = [];
        while ( tmp = tmp.previousSibling ) {
            if ( tmp.nodeType == 1 ) {
                arr.push( tmp );
            }
        }
        return arr;
    },
    parent: function ( node ) {
        return node.parentNode;
    }
}    ;
// next,nextAll,prev,preAll,parent ʵ�ֺϲ�
Itcast.each( domElementTool, function ( k, method ) {
    Itcast.fn[ k ] = function () {
        return this.pushStack( Itcast.unique( this.map(function ( v ) {
            return method( v );
        })));
    };
});

Itcast.fn.siblings = function () {
    var prevAll = this.prevAll().toArray();
    var nextAll = this.nextAll().toArray();

    return this.pushStack( prevAll.concat( nextAll ) );
}

})( window );