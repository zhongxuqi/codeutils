import JsonUtils from './JsonUtils'
import SqlUtils from './SqlUtils'
import GoUtils from './GoUtils'
import StringUtils from './StringUtils'

export default {
  do: function(value, action) {
    switch (action) {
      case "formatJson":
        return JsonUtils.formatJson(value)
      case "compressJson":
        return JsonUtils.compressJson(value)
      case "escapeJson":
        return JsonUtils.escapeJson(value)
      case "unescapeJson":
        return JsonUtils.unescapeJson(value)
      case "formatSql":
        return SqlUtils.formatSql(value)
      case "compressSql":
        return SqlUtils.compressSql(value)
      case "jsonToGolang":
        var res = GoUtils.jsonToGo(value, undefined, false)
        if (typeof res.error === 'string' && res.error != '') throw res.error
        return res.go
      case "sqlToGolang":
        return GoUtils.sqlToGolang(value)
      case "encodeURI":
        return StringUtils.encodeURI(value)
      case "decodeURI":
        return StringUtils.decodeURI(value)
      case "encodeUnicode":
        return StringUtils.encodeUnicode(value)
      case "decodeUnicode":
        return StringUtils.decodeUnicode(value)
    }
    return value
  },
}