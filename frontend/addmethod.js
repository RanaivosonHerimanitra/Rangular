const readline = require('readline');
const fs = require('fs');
const myInterface = readline.createInterface({
  input: fs.createReadStream('src/app/components/data-visualization/data-visualization.component.ts'),
  output: process.stdout,
  //console: false
});
const dataStructure = {}
myInterface.on('line', function (line) {
  if (line.endsWith("}")) console.log(line)
});
