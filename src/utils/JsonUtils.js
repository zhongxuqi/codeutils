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
  from: '\\"',
  to: '"',
}, {
  from: '\\\\',
  to: '\\',
}]

function formatJson(jsonStr) {
  return JSON.stringify(JSON.parse(jsonStr), null, 4)
}

function compressJson(jsonStr) {
  return JSON.stringify(JSON.parse(jsonStr))
}

function escapeJson(str) {
  var ret = str
    for (var i=0;i<escapeMate.length;i++) {
      ret = ret.split(escapeMate[i].from).join(escapeMate[i].to)
    }
    return ret
}

function unescapeJson(str) {
  var ret = str
  for (var i=0;i<unescapeMate.length;i++) {
    ret = ret.split(unescapeMate[i].from).join(unescapeMate[i].to)
  }
  return ret
}


export default {
  formatJson: formatJson,
  compressJson: compressJson,
  escapeJson: escapeJson,
  unescapeJson: unescapeJson,
  unescapeAndFormatJson: function(str) {
    return formatJson(unescapeJson(str))
  },
  compressAndEscapeJson: function(str) {
    return escapeJson(compressJson(str))
  }
}