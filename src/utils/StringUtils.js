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
  encodeHex: function(str) {
    const code = encodeURIComponent(str);
    let hexStr = ''
    for (let i = 0; i < code.length; i++) {
      const c = code.charAt(i);
      if (c === '%') {
        hexStr += code.charAt(i + 1) + code.charAt(i + 2)
        i += 2
      } else {
        hexStr += c.charCodeAt(0).toString(16)
      }
    }
    return hexStr
  },
  decodeHex: function(hexStr) {
    if (hexStr.length % 2 !== 0) {
      throw 'invalid hex code'
    }
    var encoded = "";
    for (var i = 0; i < hexStr.length; i += 2) {
        encoded += '%' + hexStr.substr(i, 2);
    }
    return decodeURIComponent(encoded);
  },
  encodeBase64: function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-Fa-f]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  },
  decodeBase64: function(base64Str) {
    return decodeURIComponent(atob(base64Str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}