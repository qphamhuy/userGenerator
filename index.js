var firstNames = require('./data/firstNames.json');
var lastNameGenerator = require('./lastNameGenerator.js');

//Command-line arguments
var numUsers = _getArgNum('n', 1);
var minSyllables = _getArgNum('m', 1);
var maxSyllables = _getArgNum('M', 3);

for (var i = 0; i < numUsers; ++i) {
    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)].name;
    var lastName = lastNameGenerator.generateLastName(minSyllables, maxSyllables);
    console.log(firstName + ' ' + lastName);
}

/**
 * Get number argument passed to command line after option -<char>
 */
function _getArgNum(c, defaultVal) {
    var arg = process.argv.indexOf('-' + c);
    if (arg === -1) return 1;
    var num = parseInt(process.argv[arg + 1]);
    return (isNaN(num) ? defaultVal : num);
}