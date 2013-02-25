/* this file contains methods for turning a song data array into a binary tree for faster traversal
 *
 * a song data array is formatted like so:
 * singer['12.400'] = 'face_front.png';
 * singer['12.600'] = 'face_sing_small.png';
 * singer['12.900'] = 'face_hum.png';
 * and so on
 *
 * the index is the time mark in the song that the specified image should be displayed.
 * 
 * to use this data as a binary tree, we must include the duration along with the time to play.
 * the method "addSongDurations()" does just that by going through the array and converting the 
 * string value into an Object. so the array would look like this after the durations were added:
 * singer['12.400'] = {duration:0.200,file:'face_front.png'}
 * singer['12.600'] = {duration:0.300,file:'face_sing_small.png'}
 * singer['12.900'] = {duration:null,file:'face_hum.png'}
 * and so on
 *
 * the sortSongArray() method will convert this array into a binary tree with each node taking the form:
 * { 
 *   value:{time:[float],duration:[float],file:[string]},
 *   left:[TreeNode],
 *   right:[TreeNode],
 *   parent:[TreeNode]
 * }
 *
 * and finally, the "retrieveSongImage()" method is used to traverse the tree looking for what image 
 * should be displayed given the specified time
 */

/* this method adds durations for each element of the song data.
 * this is needed to be able to compare properly on the binary tree
 * traversal 
 *
 * @parm arr reference to an associative array that we will be adding durations to
 */
function addSongDurations( arr)
{
  var keys = Object.keys( arr);

  for( var i=0; i<keys.length-1; i++) {
    arr[keys[i]] = {duration:parseFloat(keys[i+1])-parseFloat(keys[i])-0.001,file:arr[keys[i]]};
  }
  arr[keys[keys.length-1]] = {duration:null,file:arr[keys[keys.length-1]]};
}


/* this method sorts an array of song data into a binary tree for faster traversal during playback
 * 
 * this method will detect if the duration has already been added and if not it will add it with 
 * a call to addSongDurations()
 * 
 * @param treeNode the current node to add the @arr data to
 * @param arr the array of data to add to @treeNode
 * @return treeNode the topmost treeNode of the binary tree
 */
function sortSongArray( treeNode, arr) {
  var leftArr = Array();
  var rightArr = Array();
  var keys = Object.keys( arr);

  //add durations if they aren't already there
  if( typeof arr[keys[0]].duration == 'undefined') {
    this.addSongDurations( arr);
  }

  var nodeInsert= {
    value:{
       time:parseFloat(keys[Math.floor(keys.length/2)]),
       duration:parseFloat(arr[keys[Math.floor(keys.length/2)]].duration),
       file:arr[keys[Math.floor(keys.length/2)]].file
    },
    left:null,
    right:null,
  };

  for( var i=0; i< Math.floor(keys.length/2); i++) {
    leftArr[keys[i]]= arr[keys[i]];
  }
  for( var i=(Math.floor(keys.length/2))+1; i< keys.length; i++) {
    rightArr[keys[i]]= arr[keys[i]];
  }

  if( treeNode == null) {
    treeNode = nodeInsert;
  } if( parseFloat(nodeInsert.value.time) < parseFloat(treeNode.value.time)) {
    treeNode.left = nodeInsert;
  } else if( parseFloat(nodeInsert.value.time) > parseFloat(treeNode.value.time)) {
    treeNode.right = nodeInsert;
  }

  if(Object.keys(leftArr).length>0) {
    this.sortSongArray( nodeInsert, leftArr);
  }

  if(Object.keys(rightArr).length>0) {
    this.sortSongArray( nodeInsert, rightArr);
  }
  return treeNode;
}

/* this method prints out the full binary tree for troubleshooting purposes 
 *
 * @param treeNode the binary tree node to print out and traverse
 */
function printTree( treeNode, lvl)
{
  var spaces='';
  for(var i=0; i<lvl; i++) {
    spaces=spaces+'-';
  }
  if(lvl==0) {
    console.log( treeNode)
  }
  console.log( spaces+lvl+":"+treeNode.value.time+'('+treeNode.value.file+')'+':'+(treeNode.parent!=null?treeNode.parent.value.time:'null')+':'+(treeNode.left!=null?treeNode.left.value.time:'null')+':'+(treeNode.right!=null?treeNode.right.value.time:'null'));
  if( treeNode.left != null) {
    this.printTree( treeNode.left, lvl+1);
  }
  if( treeNode.right != null) {
    this.printTree( treeNode.right, lvl+1);
  }
}

function getTreeDepth( treeNode, depth) {
  if( treeNode == null) {
    return depth;
  }

  if( treeNode.left != null || treeNode.right != null) {
    depth=depth+1;
  }
  leftDepth=depth;
  rightDepth=depth;
  if( treeNode.left != null) {
    leftDepth=this.getTreeDepth( treeNode.left, depth);
  }
  if( treeNode.right != null) {
    rightDepth=this.getTreeDepth( treeNode.right, depth);
  }

  return (leftDepth>rightDepth?leftDepth:rightDepth);
}

function retrieveLevelNodes( treeNode, searchLvl, currLvl, retArray)
{
  if( treeNode == null || currLvl==searchLvl) {
    retArray.push(treeNode);
    return;
  }

  if( treeNode.right != null || treeNode.left != null) {
    currLvl=currLvl+1;
  }

  if( treeNode.right != null)
    this.retrieveLevelNodes( treeNode.right, searchLvl, currLvl, retArray);
  if( treeNode.left != null)
    this.retrieveLevelNodes(treeNode.left, searchLvl, currLvl, retArray);
}

function retrieveNode( treeNode, val)
{
  if( treeNode == null || treeNode.value.duration == null || val == treeNode.value.time) {
    return treeNode;
  }
  if( val > treeNode.value.time)
    return this.retrieveNode( treeNode.right, val);
  else if(val < treeNode.value.time)
    return this.retrieveNode( treeNode.left, val);
  return treeNode;
}

/* this traverses the binary tree and returns the song image for the timeframe specified
 *
 * @param treeNode: the binary tree data to search through
 * @param val: the timing value to search for
 * @returns a tree node {value:{time:[float],duration:[float],file:[string]},left[TreeNode],right[TreeNode],parent[TreeNode]}
 */
function retrieveSongImage( treeNode, val)
{
  if( (treeNode.value.duration == null ) || (parseFloat(val) >= parseFloat(treeNode.value.time) && val <= parseFloat(treeNode.value.time)+parseFloat(treeNode.value.duration))) {
    return treeNode;
  }
  if( val > treeNode.value.time) {
    if( treeNode.right != null ) {
      return this.retrieveSongImage( treeNode.right, val);
    } else {
      return treeNode;
    }
  } else if( val < treeNode.value.time) {
    if( treeNode.left != null ) {
      return this.retrieveSongImage( treeNode.left, val);
    } else {
      return treeNode;
    }
  }
  return treeNode;
}


if( typeof module !== 'undefined') {
  module.exports.sortSongArray = sortSongArray;
  module.exports.retrieveSongImage = retrieveSongImage;
  module.exports.retrieveNode = retrieveNode;
  module.exports.printTree = printTree;
  module.exports.addSongDurations = addSongDurations;
  module.exports.retrieveLevelNodes = retrieveLevelNodes;
  module.exports.getTreeDepth = getTreeDepth;
}
