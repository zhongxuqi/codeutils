function getUrlVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue){
  var urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars()[parameter];
      }
  return urlparameter;
}
var lang = getUrlParam("lang", '')

if (lang == "") {
  var localLang = navigator.language || navigator.userLanguage;
  if (typeof localLang == "string" && localLang.indexOf("zh") >= 0) {
    lang = "cn"
  }
}

if (lang != "en" && lang != "cn") {
  lang = "en"
}

var languageMap = {
  "en": {
    'json_utils': 'Json Utils',
    'sql_utils': 'SQL Utils',
    'golang_utils': 'GoLang Utils',
    'string_utils': 'String Encode & Decode',
    'input_json_hint': 'Please input json...',
    'json_format': 'Json Format',
    'json_compress': 'Json Compress',
    'json_escape': 'Json Escape',
    'json_unescape': 'Json Unescape',
    'sql_format': 'SQL Format',
    'sql_compress': 'SQL Compress',
    'json_to_golang': 'Json to Golang',
    'sql_to_golang': 'SQL to Golang',
    'encode_uri': 'Encode URI',
    'decode_uri': 'Decode URI',
    'encode_unicode': 'Encode Unicode',
    'decode_unicode': 'Decode Unicode',
    'copied': 'Copied',
    'copy_fail': 'Copy Fail',
  },
  "cn": {
    'json_utils': 'Json工具',
    'sql_utils': 'SQL工具',
    'golang_utils': 'Go语言工具',
    'string_utils': '字符串编码和解码',
    'input_json_hint': '请输入Json...',
    'json_format': 'Json格式化',
    'json_compress': 'Json压缩',
    'json_escape': 'Json转义',
    'json_unescape': 'Json去转义',
    'sql_format': 'SQL格式化',
    'sql_compress': 'SQL压缩',
    'json_to_golang': 'Json转Golang',
    'sql_to_golang': 'SQL转Golang',
    'encode_uri': 'URI编码',
    'decode_uri': 'URI解码',
    'encode_unicode': 'Unicode编码',
    'decode_unicode': 'Unicode解码',
    'copied': '复制成功',
    'copy_fail': '复制失败',
  },
}

export default {
  getLanguage: function() {
    return lang
  },
  getLanguageText: function(key) {
    return languageMap[lang][key]
  },
}