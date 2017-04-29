/**
 * Created by Administrator on 2017/2/18.
 */
(function ( window ) {
 var arr = [],
     push = arr.push,
     slice = arr.slice;

 // 创建dom 对象
  Itcast.parseHTML = function ( html ) {
     // 1. 准备容器
     var div = document.createElement( 'div' );
     // 2.把容器赋值给innerHTML
     div.innerHTML = html;
     // 3. 准备一个数组，接收并返回容器
     var arr = [];
     for ( var i = 0; i < div.childNodes.length; i++ ) {
         arr.push( div.childNodes[ i ] );
     }
     return arr;
 };

// 工具方法
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
// 给 Itcast.fn 添加 appendTo, prependTo, inserTBefore, insertAfter 方法
Itcast.each( tmpDomMettod, function ( k, v ) {
        Itcast.fn[ k ] = function ( selector ) {
            var iObj = this.constructor( selector );
            var tmp =[],tmpNode;
            for (var i = 0; i < this.length; i++) {
              for (var j = 0; j < iobj.length; j++) {
                    tmpNode = j ==iObj.length -1 ? this[ i ] : this[ i].cloneNode( true );
                    tmp.push( tmpNode );
                  // 使用 k 对应的方法 v 来处理这里的两个元素
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


// 其他亲属访问
// 工具方法
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

// 亲属访问方法获得元素的工具方法
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
// next,nextAll,prev,preAll,parent 实现合并
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