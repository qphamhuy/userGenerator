var firstNames = require('./data/firstNames.json');
var generateLastName = require('./lastNameGenerator.js');

var numUsers = parseInt(process.argv[2] || 1);

for (var i = 0; i < numUsers; ++i) {
    var fullName = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + generateLastName(2);
    console.log(fullName);
}
