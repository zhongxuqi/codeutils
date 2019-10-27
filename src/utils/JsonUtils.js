export default {
  formatJson: function(jsonStr) {
    return JSON.stringify(JSON.parse(jsonStr), null, 4)
  },
  compressJson: function(jsonStr) {
    return JSON.stringify(JSON.parse(jsonStr))
  },
}