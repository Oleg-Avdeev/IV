const lineReader = require('line-reader')

const data = []

lineReader.eachLine('./words/data.tsv', function (line) {
    const words = line.split('\t');
    data.push(words);
});

exports.getVerb = function(index) {
    return data[index];
}