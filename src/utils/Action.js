import JsonUtils from './JsonUtils'

export default {
  do: function(value, action) {
    switch (action) {
      case "formatJson":
        return JsonUtils.formatJson(value)
      case "compressJson":
        return JsonUtils.compressJson(value)
    }
    return value
  },
}