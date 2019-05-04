// require all json files in this directory and format them into an object
// that can be iterated and rendered into the dom.
//
const requireAll = (context) => {
  let keys = context.keys();
  let values = keys.map(context);
  return keys.reduce((o, k, i) => {
    o[k.replace('./', '').replace('.json', '')] = values[i]; 
    return o; 
  }, {});
};

const presets = requireAll(require.context('./', true, /\.json$/));

const formatted = Object.keys(presets).reduce((acc, key) => {
  let map = key.split('/');
  if (map.length > 1) { // only map sub-folders, ignoring default.json
    if (acc[map[0]]) {
      acc[map[0]][map[1]] = presets[key];
    } else {
      acc[map[0]] = { [map[1]]: presets[key] };
    }
  }
  return acc; 
}, {});

module.exports = formatted;
