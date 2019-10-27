var escapeMate = [{
  from: '\\',
  to: '\\\\',
}, {
  from: '\b',
  to: '\\b,'
}, {
  from: '\t',
  to: '\\t',
}, {
  from: '\n',
  to: '\\n',
}, {
  from: '\f',
  to: '\\f',
}, {
  from: '\r',
  to: '\\r',
}, {
  from: '"',
  to: '\\"',
}]

var unescapeMate = [{
  from: '\\b',
  to: '\b',
}, {
  from: '\\t',
  to: '\t',
}, {
  from: '\\n',
  to: '\n',
}, {
  from: '\\f',
  to: '\f',
}, {
  from: '\\r',
  to: '\r',
}, {
  from: '\\"',
  to: '"',
}, {
  from: '\\\\',
  to: '\\',
}]

export default {
  formatJson: function(jsonStr) {
    return JSON.stringify(JSON.parse(jsonStr), null, 4)
  },
  compressJson: function(jsonStr) {
    return JSON.stringify(JSON.parse(jsonStr))
  },
  escapeJson: function(str) {
    var ret = str
    for (var i=0;i<escapeMate.length;i++) {
      ret = ret.split(escapeMate[i].from).join(escapeMate[i].to)
    }
    return ret
  },
  unescapeJson: function(str) {
    var ret = str
    for (var i=0;i<unescapeMate.length;i++) {
      ret = ret.split(unescapeMate[i].from).join(unescapeMate[i].to)
    }
    return ret
  },
}