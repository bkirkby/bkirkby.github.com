var sortSongArray = require('../binarySearchTree.js').sortSongArray;
var retrieveSongImage = require('../binarySearchTree.js').retrieveSongImage;

function getRandomDataArray()
{
  var arr = Array();

  var time = 0.000;
  for( var i = 0; i<1000; i++) {
    time += parseFloat(Math.floor( Math.random()*1000));
    arr[time] = 'file_'+time+'.png';
  }
  return arr;
}

function getRandomSearchArray( biggestNumber)
{
  var arr = Array();
  for( var i=0; i<2500; i++) {
    var int = Math.floor( Math.random()*biggestNumber);
    var dec = Math.floor( Math.random()*1000);
    arr.push( int+'.'+dec);
  }
  return arr;
}

var arr = getRandomDataArray();
var biggestNumber = parseInt(Object.keys(arr)[Object.keys(arr).length-1])+1;
var searchArray = getRandomSearchArray(biggestNumber);

var start = (new Date).getTime();
for( var i=0; i<searchArray.length; i++) {
  for( key in arr) {
    if( parseFloat(key) > parseFloat( searchArray[i])) {
      //console.log( searchArray[i]+':'+key);
      break;
    }
  }
}
var diff = (new Date).getTime() - start;
console.log( 'fullArray timeDiff: '+diff);

var tree = null;

tree = sortSongArray( tree, arr);
var start = (new Date).getTime();

for( var i=0; i<searchArray.length; i++) {
  retrieveSongImage( tree, searchArray[i]); 
}

var diff = (new Date).getTime() - start;
console.log( 'binaryTree timeDiff: '+diff);

/*
var arr = Array();
arr[0.400]='zero';
arr[1.500]='one';
arr[2.300]='two';
arr[3.400]='three';
arr[4.345]='four';
arr[5.234]='five';
arr[6.567]='six';
arr[7.500]='seven';
arr[8.400]='eight';
arr[9.200]='nine';
arr[10.500]='ten';
arr[11.100]='eleven';

//arr = Array();
//arr[0.400] = 'zero';
//arr[1.453] = 'one';

var node = null;

node = sortSongArray( node, arr);

function testIt( node, val) {
  console.log( val+': '+retrieveSongImage( node, val).value.time);
}

//testIt( node, '9.456');
//testIt( node, '10.501');
//testIt( node, '11.000');
//testIt( node, '11.300');

for( var i=0; i<40; i++) {
  var int=Math.floor(Math.random()*13);
  var dec=Math.floor(Math.random()*100);

  testIt( node, int+'.'+dec);
}

//printTree( node);
*/
