var consonants = require('./data/consonants.json');
var consonantsClusters_onset = require('./data/consonantClusters_onset.json');
var consonantsClusters_coda = require('./data/consonantClusters_coda.json');
var vowels = require('./data/vowels.json');

module.exports = {
    generateLastName: generateLastName
};


//////////


/**
 * Generate a random last name
 * @param {Number} minSyllables - Min number of syllables in generated name
 * @param {Number} maxSyllables - Max number of syllables in generated name
 * @return {String} Random name
 */
function generateLastName(minSyllables, maxSyllables) {
    var syllables = Math.floor(Math.random() * (maxSyllables - minSyllables)) + minSyllables;

    var emptyChar = { "char": "", "invalidNext": [] };
    var chars = [];

    //First syllable
    var startingConsonant = _randomElem(consonants.concat(consonantsClusters_onset, [emptyChar]))
    chars.push(startingConsonant);
    _addNextChars(chars, vowels);

    for (var i = 0; i < syllables - 1; ++i) {
        _addNextChars(chars, consonants);
        _addNextChars(chars, vowels);
    }

    //Last syllable
    var endingConsonants = consonants.concat(consonantsClusters_coda);
    if (startingConsonant.char !== '' || syllables > 1)
        endingConsonants.push(emptyChar);
    _addNextChars(chars, endingConsonants);

    return chars.map((c) => (c.char)).join('');
}


/**
 * [private] Check if candidate next characters can follow current character
 * @param {Object} curr - Current character object
 * @param {Object} next - 1 or more next character objects
 * @return {Boolean} True if given next characters can follow current character
 */
function _checkNextCharsValidity(curr, next) {
    var nextCharsStr = next.map((c) => (c.char)).join('');
    for (var i = 0; i < curr.invalidNext.length; ++i) {
        if (new RegExp(curr.invalidNext[i]).test(nextCharsStr))
            return false;
    }
    return true;
}

/**
 * [private] Add next character(s) to accumulated array of name characters
 * @param {Array} chars - Array of name characters
 * @param {Array} charSet - Set of characters to choose next characters from
 */
function _addNextChars(chars, charSet) {
    if (charSet === vowels) {
        var nextChars = [];
        while (true) {
            nextChars = [_randomElem(charSet)];
            if (Math.random() > 0.5) {
                var nextVowel = _randomElem(charSet);
                while (!_checkNextCharsValidity(nextChars[0], [nextVowel]))
                    nextVowel = _randomElem(charSet);
                nextChars.push(nextVowel);
            }
            if (_checkNextCharsValidity(chars[chars.length - 1], nextChars)) {
                chars.push.apply(chars, nextChars);
                break;
            }
        }
    }
    else {
        var consonant = _randomElem(charSet);
        while (!_checkNextCharsValidity(chars[chars.length - 1], [consonant]))
            consonant = _randomElem(charSet);
        chars.push(consonant);
    }
}

/**
 * [private] Get random element from an array
 * @param {Array} arr - Array to choose from
 * @return {Object} A random array element
 */
function _randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}