arr = new Array();
arr['0.400']='zero';
arr['1.500']='one';

var keys = Object.keys(arr);//Array();
/*for( key in arr) {
  keys.push( key);
}*/

for( var i=0; i<keys.length; i++) {
  console.log( keys[i]);
}
