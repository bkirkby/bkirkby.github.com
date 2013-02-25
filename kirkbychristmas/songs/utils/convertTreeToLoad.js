var bst=require('../binarySearchTree.js');

/*if( process.argv.length<2) {
  console.log("usage: convertTreeToLoad <singerfile> <singernum>");
  process.exit(1);
}*/

//require(process.argv[0]);
require('../ldb/background2.js');
var singerIdx=3

var t = bst.sortSongArray(null, singer[singerIdx]);

for(key in singer[0]) {
  singer[key]=bst.retrieveNode(t, key);
}


console.log("if( typeof singer == 'undefined') singer = new Array(); singer["+singerIdx+"] = new Array();");

for(var i=bst.getTreeDepth(t,0)+1; i>=0; i--) {
  arr=[];
  bst.retrieveLevelNodes(t, i, 0, arr);

  for(var j=0; j< arr.length; j++) {
    var node = arr[j];
    console.log("singer["+singerIdx+"]["+node.value.time.toFixed(3)+"]={value: {time:"+node.value.time+",duration:"+node.value.duration+",file:'"+node.value.file+"'},");
    if( node.left == null) {
      console.log("  left:null,");
    } else {
      var nodeLeft = bst.retrieveNode(t, node.left.value.time);
      console.log("  left:singer["+singerIdx+"]["+nodeLeft.value.time.toFixed(3)+"],");
    }
    if(node.right == null) {
      console.log("  right:null}");
    } else {
      var nodeRight = bst.retrieveNode(t, node.right.value.time);
      console.log("  right:singer["+singerIdx+"]["+nodeRight.value.time.toFixed(3)+"]}");
    }
  }
}
console.log("singer["+singerIdx+"]['root']=singer["+singerIdx+"]["+t.value.time.toFixed(3)+"];");
