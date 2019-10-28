import sqlFormatter from "sql-formatter"

export default {
  formatSql: function(sqlStr) {
    return sqlFormatter.format(sqlStr)
  },
  compressSql: function(sqlStr) {
    var lines = sqlStr.split('\n')
    for (var i=0;i<lines.length;i++) {
      var commentIndex = lines[i].indexOf('--')
      if (commentIndex >= 0) {
        lines[i] = lines[i].substring(0, commentIndex)
      }
    }
    return lines.join(' ').replace(/[\s]+/g, ' ')
  },
}