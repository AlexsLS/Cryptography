// Русский алфавит Морзе
const morseCode = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..',
    'Е': '.', 'Ё': '.', 'Ж': '...-', 'З': '--..', 'И': '..',
    'Й': '.---', 'К': '-.-', 'Л': '.-..', 'М': '--', 'Н': '-.',
    'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...', 'Т': '-',
    'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '......', ',': '.-.-.-', '?': '..--..', ' ': '/'
};

// Обратный словарь для декодирования
const morseDecode = {};
for (const key in morseCode) {
    morseDecode[morseCode[key]] = key;
}

function textToMorse() {
    const inputText = document.getElementById('morse-input').value.toUpperCase();
    let result = '';
    
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        if (morseCode[char]) {
            result += morseCode[char] + ' ';
        } else {
            result += char + ' ';
        }
    }
    
    document.getElementById('morse-output').value = result.trim();
}

function morseToText() {
    const inputText = document.getElementById('morse-input').value;
    const morseWords = inputText.split(' / ');
    let result = '';
    
    for (let i = 0; i < morseWords.length; i++) {
        const morseChars = morseWords[i].split(' ');
        for (let j = 0; j < morseChars.length; j++) {
            if (morseDecode[morseChars[j]]) {
                result += morseDecode[morseChars[j]];
            } else {
                result += morseChars[j];
            }
        }
        result += ' ';
    }
    
    document.getElementById('morse-output').value = result.trim();
}
