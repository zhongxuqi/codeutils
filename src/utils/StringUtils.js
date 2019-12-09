export default {
  encodeURL: function(value) {
    return encodeURIComponent(value)
  },
  decodeURL: function(value) {
    return decodeURIComponent(value)
  },
  encodeUnicode: function(value){
     var str =''; 
     for(var i=0;i<value.length;i++){
        str+="\\u"+value.charCodeAt(i).toString(16);
     }
     return str;
  },
  decodeUnicode: function(value){
    var data = value.split("\\u")
    var str = ''
    for(var i=0;i<data.length;i++) {
      if (data[i] == '') continue
      var res = data[i].match(/^[0-9a-fA-F]+$/g)
      if (!res) {
        throw 'invalid unicode'
      }
      str+=String.fromCharCode(parseInt(data[i],16).toString(10))
    }
    return str
  },
}