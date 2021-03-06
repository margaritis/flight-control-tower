
var basename = require('path').basename,
    _ = require('lodash'),
    matchAllInbound = require('./match').matchAllInbound,
    matchAllOutbound = require('./match').matchAllOutbound;

function parse(allFiles) {


  function initNode() {
    return { outbound: [], inbound: [] }; 
  }

  var results = { document: initNode(), 
                  ui: initNode() };
  results.ui.outbound.push('click'); // simulate an eventual click event that might happen in the UI. XXX: need to add other events

  _.keys(allFiles).forEach(function (fname) {
    var content = allFiles[fname],
        inbound = [],
        outbound = [];

    if (content.match(/defineComponent/)) {
      componentName = basename(fname);
      results[componentName] = initNode();

      matchAllInbound(content, results, componentName);
      matchAllOutbound(content, results, componentName);

      results[componentName].outbound = _.unique(results[componentName].outbound);
      results[componentName].inbound = _.unique(results[componentName].inbound);
    }
  });

  return results;
}

module.exports.parse = parse;


