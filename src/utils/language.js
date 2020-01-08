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
    'encode_url': 'Encode URL',
    'decode_url': 'Decode URL',
    'encode_unicode': 'Encode Unicode',
    'decode_unicode': 'Decode Unicode',
    'copied': 'Copied',
    'copy_fail': 'Copy Fail',
    'full_screen': 'Full Screen',
    'back': 'Back',
    'advise': 'Advise',
    'input_advise_hint': 'Please input advise...',
    'is_this_bug': 'Is this bug?',
    'submit_bug': 'Submit bug',
    'input_bug_hint': 'Why is this bug?...',
    'thank_advise': 'Thank you for advise',
    'thank_bug': 'Thank you for submit bug',
    'timestamp': 'Timestamp',
    'second': 'Second',
    'milisecond': 'Milisecond',
    'timestamp2datetime': 'Timestamp to Datetime',
    'datetime2timestamp': 'Datetime to Timestamp',
    'input_timestamp_hint': 'Please input timestamp',
    'input_datetime_hint': 'Please input datetime',
    'text_diff': 'Text Diff',
    'input_text_hint': 'Please input text',
    'json_unescape_and_format': 'Json Unescape & Format',
    'json_compress_and_escape': 'Json Compress & Escape',
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
    'encode_url': 'URL编码',
    'decode_url': 'URL解码',
    'encode_unicode': 'Unicode编码',
    'decode_unicode': 'Unicode解码',
    'copied': '复制成功',
    'copy_fail': '复制失败',
    'full_screen': '全屏',
    'back': '返回',
    'advise': '建议',
    'input_advise_hint': '请输入您的建议...',
    'is_this_bug': '有Bug?',
    'submit_bug': '提交Bug',
    'input_bug_hint': '为什么是Bug?...',
    'thank_advise': '感谢您的建议',
    'thank_bug': '感谢您提交Bug',
    'timestamp': '时间戳',
    'second': '秒',
    'milisecond': '毫秒',
    'timestamp2datetime': '时间戳转日期',
    'datetime2timestamp': '日期转时间戳',
    'input_timestamp_hint': '请输入时间戳',
    'input_datetime_hint': '请输入日期',
    'text_diff': '文本对比',
    'input_text_hint': '请输入文本',
    'json_unescape_and_format': 'Json去转义&格式化',
    'json_compress_and_escape': 'Json压缩&转义',
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