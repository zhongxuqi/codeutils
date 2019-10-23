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
  },
  "cn": {
    'json_utils': 'Json工具',
    'sql_utils': 'SQL工具',
    'golang_utils': 'Go语言工具',
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