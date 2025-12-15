// ============================================
// ШИФР ЦЕЗАРЯ
// ============================================

// Алфавит из 47 символов: 33 русские буквы + 10 цифр + 4 знака препинания
const CAESAR_ALPHABET = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ 1234567890,?.';

/**
 * Шифрование/дешифрование шифром Цезаря
 * @param {string} text - Исходный текст
 * @param {number} shift - Величина сдвига
 * @param {boolean} encrypt - true для шифрования, false для дешифрования
 * @returns {string} - Результат шифрования/дешифрования
 */
function caesarCipher(text, shift, encrypt = true) {
    let result = '';
    const n = CAESAR_ALPHABET.length;
    
    for (let char of text.toUpperCase()) {
        const index = CAESAR_ALPHABET.indexOf(char);
        if (index === -1) {
            result += char;
            continue;
        }
        
        let newIndex;
        if (encrypt) {
            newIndex = (index + shift) % n;
        } else {
            newIndex = (index - shift + n) % n;
        }
        
        result += CAESAR_ALPHABET[newIndex];
    }
    
    return result;
}

/**
 * Демонстрация шифрования Цезаря
 */
function encryptCaesar() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    
    if (!text.trim()) {
        alert('Введите текст для шифрования');
        return;
    }
    
    const result = caesarCipher(text, shift, true);
    document.getElementById('caesar-result').textContent = result;
}

/**
 * Демонстрация дешифрования Цезаря
 */
function decryptCaesar() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    
    if (!text.trim()) {
        alert('Введите текст для дешифрования');
        return;
    }
    
    const result = caesarCipher(text, shift, false);
    document.getElementById('caesar-result').textContent = result;
}

// Обновление значения сдвига при движении слайдера
document.getElementById('caesar-shift').addEventListener('input', function() {
    document.getElementById('shift-value').textContent = this.value;
});

// ============================================
// КРИПТОСИСТЕМА МЕРКЛА-ХЕЛЛМАНА
// ============================================

class MerkleHellman {
    constructor(sequenceLength = 8) {
        this.privateKey = this.generateSuperIncreasingSequence(sequenceLength);
        this.multiplier = this.generateCoprime(100);
        this.modulus = this.generateModulus(this.privateKey, this.multiplier);
        this.publicKey = this.generatePublicKey();
    }
    
    /**
     * Генерация сверхрастущей последовательности
     */
    generateSuperIncreasingSequence(n) {
        const sequence = [1];
        let sum = 1;
        
        for (let i = 1; i < n; i++) {
            sequence.push(sum + Math.floor(Math.random() * 10) + 1);
            sum += sequence[i];
        }
        
        return sequence;
    }
    
    /**
     * Генерация числа, взаимно простого с заданным
     */
    generateCoprime(max) {
        let number;
        do {
            number = Math.floor(Math.random() * (max - 2)) + 2;
        } while (this.gcd(number, max) !== 1);
        
        return number;
    }
    
    /**
     * Наибольший общий делитель (алгоритм Евклида)
     */
    gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    /**
     * Генерация модуля, большего суммы элементов последовательности
     */
    generateModulus(sequence, multiplier) {
        const sum = sequence.reduce((a, b) => a + b, 0);
        return sum + Math.floor(Math.random() * 100) + 1;
    }
    
    /**
     * Генерация публичного ключа
     */
    generatePublicKey() {
        return this.privateKey.map(num => 
            (num * this.multiplier) % this.modulus
        );
    }
    
    /**
     * Шифрование бинарного сообщения
     */
    encrypt(message) {
        if (message.length > this.publicKey.length) {
            throw new Error('Сообщение слишком длинное');
        }
        
        let sum = 0;
        for (let i = 0; i < message.length; i++) {
            if (message[i] === '1') {
                sum += this.publicKey[i];
            }
        }
        
        return sum;
    }
    
    /**
     * Дешифрование сообщения
     */
    decrypt(ciphertext) {
        // Находим обратный множитель по модулю
        const inverseMultiplier = this.modInverse(this.multiplier, this.modulus);
        const transformed = (ciphertext * inverseMultiplier) % this.modulus;
        
        // Решаем задачу о рюкзаке для сверхрастущей последовательности
        return this.solveSuperIncreasingKnapsack(transformed, this.privateKey);
    }
    
    /**
     * Нахождение обратного элемента по модулю
     */
    modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    }
    
    /**
     * Решение задачи о рюкзаке для сверхрастущей последовательности
     */
    solveSuperIncreasingKnapsack(sum, sequence) {
        let result = '';
        
        for (let i = sequence.length - 1; i >= 0; i--) {
            if (sum >= sequence[i]) {
                result = '1' + result;
                sum -= sequence[i];
            } else {
                result = '0' + result;
            }
        }
        
        return result.split('').reverse().join('');
    }
}

let mhSystem = new MerkleHellman();

/**
 * Генерация новых ключей для Меркла-Хеллмана
 */
function generateMHKeys() {
    mhSystem = new MerkleHellman();
    
    document.getElementById('mh-private-key').textContent = 
        `Последовательность: [${mhSystem.privateKey.join(', ')}]\n` +
        `Множитель: ${mhSystem.multiplier}, Модуль: ${mhSystem.modulus}`;
    
    document.getElementById('mh-public-key').textContent = 
        `[${mhSystem.publicKey.join(', ')}]`;
}

/**
 * Шифрование сообщения Мерклом-Хеллманом
 */
function encryptMH() {
    const message = document.getElementById('mh-message').value;
    
    // Проверка, что сообщение состоит только из 0 и 1
    if (!/^[01]+$/.test(message)) {
        alert('Сообщение должно содержать только 0 и 1');
        return;
    }
    
    try {
        const ciphertext = mhSystem.encrypt(message);
        document.getElementById('mh-result').textContent = 
            `Зашифрованное значение: ${ciphertext}`;
    } catch (error) {
        alert(error.message);
    }
}

/**
 * Дешифрование сообщения Мерклом-Хеллманом
 */
function decryptMH() {
    const ciphertext = document.getElementById('mh-result').textContent;
    const match = ciphertext.match(/\d+/);
    
    if (!match) {
        alert('Нет зашифрованного сообщения для дешифрования');
        return;
    }
    
    const number = parseInt(match[0]);
    const decrypted = mhSystem.decrypt(number);
    
    document.getElementById('mh-result').textContent += 
        `\nРасшифрованное сообщение: ${decrypted}`;
}

// ============================================
// АЗБУКА МОРЗЕ
// ============================================

// Словарь азбуки Морзе для русского алфавита
const MORSE_CODE = {
    'А': '.-',      'Б': '-...',    'В': '.--',     'Г': '--.',     'Д': '-..',
    'Е': '.',       'Ё': '.',       'Ж': '...-',    'З': '--..',    'И': '..',
    'Й': '.---',    'К': '-.-',     'Л': '.-..',    'М': '--',      'Н': '-.',
    'О': '---',     'П': '.--.',    'Р': '.-.',     'С': '...',     'Т': '-',
    'У': '..-',     'Ф': '..-.',    'Х': '....',    'Ц': '-.-.',    'Ч': '---.',
    'Ш': '----',    'Щ': '--.-',    'Ъ': '--.--',   'Ы': '-.--',    'Ь': '-..-',
    'Э': '..-..',   'Ю': '..--',    'Я': '.-.-',
    
    // Цифры
    '1': '.----',   '2': '..---',   '3': '...--',   '4': '....-',   '5': '.....',
    '6': '-....',   '7': '--...',   '8': '---..',   '9': '----.',   '0': '-----',
    
    // Знаки препинания
    ' ': '/',       ',': '--..--',  '.': '.-.-.-',  '?': '..--..',  '!': '-.-.--',
    '-': '-....-',  '/': '-..-.',   '(': '-.--.',   ')': '-.--.-',  '&': '.-...',
    ':': '---...',  ';': '-.-.-.',  '=': '-...-',   '+': '.-.-.',   '_': '..--.-',
    '"': '.-..-.',  '$': '...-..-', '@': '.--.-.'
};

// Обратный словарь для преобразования из Морзе в текст
const REVERSE_MORSE = {};
for (const [char, code] of Object.entries(MORSE_CODE)) {
    REVERSE_MORSE[code] = char;
}

/**
 * Преобразование текста в код Морзе
 * @param {string} text - Исходный текст
 * @returns {string} - Код Морзе
 */
function textToMorse(text) {
    return text.toUpperCase().split('').map(char => {
        // Если символ есть в словаре, возвращаем его код Морзе
        if (MORSE_CODE[char]) {
            return MORSE_CODE[char];
        }
        // Иначе возвращаем сам символ
        return char;
    }).join(' ');
}

/**
 * Преобразование кода Морзе в текст
 * @param {string} morse - Код Морзе
 * @returns {string} - Расшифрованный текст
 */
function morseToText(morse) {
    return morse.split(' ').map(code => {
        // Если код есть в обратном словаре, возвращаем символ
        if (REVERSE_MORSE[code]) {
            return REVERSE_MORSE[code];
        }
        // Иначе возвращаем сам код
        return code;
    }).join('');
}

/**
 * Демонстрация преобразования текста в код Морзе
 */
function textToMorseDemo() {
    const text = document.getElementById('morse-text').value;
    
    if (!text.trim()) {
        alert('Введите текст для преобразования');
        return;
    }
    
    const result = textToMorse(text);
    document.getElementById('morse-result').textContent = result;
}

/**
 * Демонстрация преобразования кода Морзе в текст
 */
function morseToTextDemo() {
    const morse = document.getElementById('morse-text').value;
    
    if (!morse.trim()) {
        alert('Введите код Морзе для преобразования');
        return;
    }
    
    const result = morseToText(morse);
    document.getElementById('morse-result').textContent = result;
}

// Привязка функций к глобальному объекту window
window.textToMorse = textToMorseDemo;
window.morseToText = morseToTextDemo;
window.encryptCaesar = encryptCaesar;
window.decryptCaesar = decryptCaesar;
window.generateMHKeys = generateMHKeys;
window.encryptMH = encryptMH;
window.decryptMH = decryptMH;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Генерация начальных ключей для Меркла-Хеллмана
    generateMHKeys();
    
    // Установка примера для шифра Цезаря
    document.getElementById('caesar-text').value = 'Привет, мир! 2024';
    
    // Установка примера для азбуки Морзе
    document.getElementById('morse-text').value = 'Привет мир';
    
    console.log('Презентация загружена. Все алгоритмы готовы к использованию.');
});
