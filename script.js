// Шифр Цезаря
const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ .,?";

function caesarCipher(text, shift, encrypt = true) {
    let result = "";
    
    for (let char of text.toUpperCase()) {
        const index = alphabet.indexOf(char);
        if (index === -1) {
            result += char;
            continue;
        }
        
        let newIndex;
        if (encrypt) {
            newIndex = (index + shift) % alphabet.length;
        } else {
            newIndex = (index - shift + alphabet.length) % alphabet.length;
        }
        
        result += alphabet[newIndex];
    }
    
    return result;
}

function encryptCaesar() {
    const input = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    document.getElementById('caesar-output').value = caesarCipher(input, shift, true);
}

function decryptCaesar() {
    const input = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    document.getElementById('caesar-output').value = caesarCipher(input, shift, false);
}

// Криптосистема Меркла-Хеллмана
// Супервозрастающая последовательность
const superIncreasing = [2, 3, 6, 13, 27, 52, 105, 210];
const modulus = 881; // Должно быть больше суммы всех элементов
const multiplier = 588; // Взаимно простое с modulus

// Генерация открытого ключа
const publicKey = superIncreasing.map(x => (x * multiplier) % modulus);

function encryptMH() {
    const input = document.getElementById('mh-input').value;
    let sum = 0;
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '1') {
            sum += publicKey[i];
        }
    }
    
    document.getElementById('mh-output').value = sum;
}

function extendedGCD(a, b) {
    if (a === 0) {
        return [b, 0, 1];
    }
    
    const [g, x1, y1] = extendedGCD(b % a, a);
    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;
    
    return [g, x, y];
}

function modInverse(a, m) {
    const [g, x] = extendedGCD(a, m);
    if (g !== 1) {
        throw new Error('Обратный элемент не существует');
    }
    return (x % m + m) % m;
}

function decryptMH() {
    const input = parseInt(document.getElementById('mh-input').value);
    const inverseMultiplier = modInverse(multiplier, modulus);
    let temp = (input * inverseMultiplier) % modulus;
    
    let result = "";
    
    for (let i = superIncreasing.length - 1; i >= 0; i--) {
        if (temp >= superIncreasing[i]) {
            result = "1" + result;
            temp -= superIncreasing[i];
        } else {
            result = "0" + result;
        }
    }
    
    document.getElementById('mh-output').value = result;
}

// Азбука Морзе
const morseAlphabet = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..',
    'Е': '.', 'Ё': '.', 'Ж': '...-', 'З': '--..', 'И': '..',
    'Й': '.---', 'К': '-.-', 'Л': '.-..', 'М': '--', 'Н': '-.',
    'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...', 'Т': '-',
    'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-', ' ': '/', 
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '......', ',': '.-.-.-', '?': '..--..'
};

// Обратный словарь для преобразования из Морзе
const morseToText = {};
for (const [key, value] of Object.entries(morseAlphabet)) {
    morseToText[value] = key;
}

function textToMorse() {
    const input = document.getElementById('morse-input').value.toUpperCase();
    let result = "";
    
    for (let char of input) {
        if (morseAlphabet[char]) {
            result += morseAlphabet[char] + " ";
        } else {
            result += char + " ";
        }
    }
    
    document.getElementById('morse-output').value = result.trim();
}

function morseToText() {
    const input = document.getElementById('morse-input').value.trim();
    const morseChars = input.split(" ");
    let result = "";
    
    for (let morseChar of morseChars) {
        if (morseToText[morseChar]) {
            result += morseToText[morseChar];
        } else if (morseChar === "/") {
            result += " ";
        } else {
            result += morseChar;
        }
    }
    
    document.getElementById('morse-output').value = result;
}
