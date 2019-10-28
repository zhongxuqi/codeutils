import JsonUtils from './JsonUtils'
import SqlUtils from './SqlUtils'

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
    }
    return value
  },
}