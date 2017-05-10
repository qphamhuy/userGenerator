var consonants = require('./data/consonants.json');
var consonantsClusters_onset = require('./data/consonantClusters_onset.json');
var consonantsClusters_coda = require('./data/consonantClusters_coda.json');
var vowels = require('./data/vowels.json');

function _randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function _randomVowelGroup() {
    var vowel = _randomElem(vowels);
    return vowel.char + (Math.random() > 0.5 ? _randomElem(vowel.followers) : '');
}

function generateLastName(maxSyllables) {
    // console.log(consonants.length + ", " + consonantsClusters_onset.length + ", " + consonantsClusters_coda.length);

    var syllables = Math.floor(Math.random() * maxSyllables) + 1; //1-3 syllables

    //Starting consonant
    var startingConsonant = _randomElem(consonants.concat(consonantsClusters_onset).concat(['']));
    var name = startingConsonant + _randomVowelGroup();

    var i;
    for (i = 0; i < syllables - 1; ++i) {
        name += _randomElem(consonants);
        name += _randomVowelGroup();
    }

    //Ending consonant
    var endingConsonants = consonants.concat(consonantsClusters_coda);
    if (startingConsonant !== '' || syllables > 1)
        endingConsonants.push('');
    name += _randomElem(endingConsonants);

    return name[0].toUpperCase() + name.slice(1);
}

module.exports = generateLastName;