import JsonUtils from './JsonUtils'
import SqlUtils from './SqlUtils'
import GoUtils from './GoUtils'

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
    }
    return value
  },
}