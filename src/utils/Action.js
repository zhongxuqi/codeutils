import JsonUtils from './JsonUtils'

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
    }
    return value
  },
}