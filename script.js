// ============================================
// КОНСТАНТЫ И ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================

// Алфавит для шифра Цезаря
const CAESAR_ALPHABET = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ 1234567890,?.';

// Код Морзе
const MORSE_CODE = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..',
    'Е': '.', 'Ё': '.', 'Ж': '...-', 'З': '--..', 'И': '..',
    'Й': '.---', 'К': '-.-', 'Л': '.-..', 'М': '--', 'Н': '-.',
    'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...', 'Т': '-',
    'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----',
    ' ': '/', ',': '--..--', '.': '.-.-.-', '?': '..--..', '!': '-.-.--'
};

// Глобальные переменные навигации
let currentSlideIndex = 0;
let slides = [];
let totalSlides = 0;
let currentSlideDisplay = null;
let prevBtn = null;
let nextBtn = null;

// ============================================
// ОСНОВНЫЕ ФУНКЦИИ НАВИГАЦИИ
// ============================================

function initNavigation() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    currentSlideDisplay = document.getElementById('current-slide');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextSlide();
        });
    }
    
    // Показываем первый слайд
    showSlide(0);
}

function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    
    // Показываем выбранный слайд
    slides[index].classList.add('active');
    slides[index].style.display = 'block';
    
    currentSlideIndex = index;
    
    // Обновляем отображение номера слайда
    if (currentSlideDisplay) {
        currentSlideDisplay.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }
    
    updateButtons();
    
    // Инициализируем интерактивные элементы на текущем слайде
    setTimeout(() => initSlideInteractiveElements(index), 100);
}

function updateButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentSlideIndex === 0;
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
    }
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ
// ============================================

function initSlideInteractiveElements(slideIndex) {
    switch(slideIndex + 1) {
        case 7: // Слайд 7: Демонстрация шифра Цезаря
            initCaesarDemo();
            break;
        case 10: // Слайд 10: Демонстрация Меркла-Хеллмана
            initMHDemo();
            break;
        case 13: // Слайд 13: Демонстрация азбуки Морзе
            initMorseDemo();
            break;
    }
}

function initCaesarDemo() {
    const caesarText = document.getElementById('caesar-text');
    const caesarShift = document.getElementById('caesar-shift');
    const shiftValue = document.getElementById('shift-value');
    const encryptBtn = document.querySelector('#slide-7 .btn-encrypt');
    const decryptBtn = document.querySelector('#slide-7 .btn-decrypt');
    
    if (caesarText && caesarShift && shiftValue) {
        // Устанавливаем начальное значение
        shiftValue.textContent = caesarShift.value;
        
        // Обновление значения сдвига при движении ползунка
        caesarShift.addEventListener('input', function(e) {
            e.stopPropagation();
            shiftValue.textContent = this.value;
        });
        
        // Обработка кликов на кнопках
        if (encryptBtn) {
            encryptBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                encryptCaesar();
            });
        }
        
        if (decryptBtn) {
            decryptBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                decryptCaesar();
            });
        }
        
        // Автоматическое шифрование при загрузке
        setTimeout(() => {
            if (caesarText.value) {
                encryptCaesar();
            }
        }, 300);
        
        console.log('Демо шифра Цезаря инициализировано');
    }
}

function initMHDemo() {
    const mhGenerateBtn = document.getElementById('mh-generate-btn');
    const mhEncryptBtn = document.getElementById('mh-encrypt-btn');
    const mhDecryptBtn = document.getElementById('mh-decrypt-btn');
    
    if (mhGenerateBtn) {
        mhGenerateBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            generateMHKeys();
        });
    }
    
    if (mhEncryptBtn) {
        mhEncryptBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            encryptMH();
        });
    }
    
    if (mhDecryptBtn) {
        mhDecryptBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            decryptMH();
        });
    }
    
    console.log('Демо Меркла-Хеллмана инициализировано');
}

function initMorseDemo() {
    const textToMorseBtn = document.getElementById('text-to-morse-btn');
    const morseToTextBtn = document.getElementById('morse-to-text-btn');
    
    if (textToMorseBtn) {
        textToMorseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            textToMorseDemo();
        });
    }
    
    if (morseToTextBtn) {
        morseToTextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            morseToTextDemo();
        });
    }
    
    console.log('Демо азбуки Морзе инициализировано');
}

// ============================================
// ШИФР ЦЕЗАРЯ
// ============================================

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

function encryptCaesar() {
    try {
        const text = document.getElementById('caesar-text').value;
        const shift = parseInt(document.getElementById('caesar-shift').value);
        const result = document.getElementById('caesar-result');
        
        if (!text.trim()) {
            alert('Введите текст для шифрования');
            return false;
        }
        
        const encrypted = caesarCipher(text, shift, true);
        result.textContent = encrypted;
        result.style.background = '#e8f6f3';
        result.style.borderColor = '#2ecc71';
        
        console.log('Зашифровано:', text, '→', encrypted);
        return false;
    } catch (error) {
        console.error('Ошибка при шифровании:', error);
        return false;
    }
}

function decryptCaesar() {
    try {
        const text = document.getElementById('caesar-text').value;
        const shift = parseInt(document.getElementById('caesar-shift').value);
        const result = document.getElementById('caesar-result');
        
        if (!text.trim()) {
            alert('Введите текст для дешифрования');
            return false;
        }
        
        const decrypted = caesarCipher(text, shift, false);
        result.textContent = decrypted;
        result.style.background = '#fef9e7';
        result.style.borderColor = '#f39c12';
        
        console.log('Расшифровано:', text, '→', decrypted);
        return false;
    } catch (error) {
        console.error('Ошибка при дешифровании:', error);
        return false;
    }
}

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
    
    generateSuperIncreasingSequence(n) {
        const sequence = [1];
        let sum = 1;
        
        for (let i = 1; i < n; i++) {
            sequence.push(sum + Math.floor(Math.random() * 10) + 1);
            sum += sequence[i];
        }
        
        return sequence;
    }
    
    generateCoprime(max) {
        let number;
        do {
            number = Math.floor(Math.random() * (max - 2)) + 2;
        } while (this.gcd(number, max) !== 1);
        
        return number;
    }
    
    gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    generateModulus(sequence, multiplier) {
        const sum = sequence.reduce((a, b) => a + b, 0);
        return sum + Math.floor(Math.random() * 100) + 1;
    }
    
    generatePublicKey() {
        return this.privateKey.map(num => 
            (num * this.multiplier) % this.modulus
        );
    }
    
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
    
    decrypt(ciphertext) {
        const inverseMultiplier = this.modInverse(this.multiplier, this.modulus);
        const transformed = (ciphertext * inverseMultiplier) % this.modulus;
        
        return this.solveSuperIncreasingKnapsack(transformed, this.privateKey);
    }
    
    modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    }
    
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

function generateMHKeys() {
    mhSystem = new MerkleHellman();
    
    const privateKeyDiv = document.getElementById('mh-private-key');
    const publicKeyDiv = document.getElementById('mh-public-key');
    
    if (privateKeyDiv && publicKeyDiv) {
        privateKeyDiv.textContent = `Последовательность: [${mhSystem.privateKey.join(', ')}]\nМножитель: ${mhSystem.multiplier}, Модуль: ${mhSystem.modulus}`;
        publicKeyDiv.textContent = `[${mhSystem.publicKey.join(', ')}]`;
    }
    
    console.log('Сгенерированы новые ключи Меркла-Хеллмана');
}

function encryptMH() {
    const messageInput = document.getElementById('mh-message');
    const resultDiv = document.getElementById('mh-result');
    
    if (!messageInput || !resultDiv) {
        console.error('Элементы Меркла-Хеллмана не найдены');
        return;
    }
    
    const message = messageInput.value;
    
    if (!/^[01]+$/.test(message)) {
        alert('Сообщение должно содержать только 0 и 1');
        return;
    }
    
    try {
        const ciphertext = mhSystem.encrypt(message);
        resultDiv.textContent = `Зашифрованное значение: ${ciphertext}`;
        console.log('Зашифровано Мерклом-Хеллманом:', message, '→', ciphertext);
    } catch (error) {
        alert(error.message);
    }
}

function decryptMH() {
    const resultDiv = document.getElementById('mh-result');
    
    if (!resultDiv) return;
    
    const ciphertext = resultDiv.textContent.match(/\d+/);
    
    if (!ciphertext) {
        alert('Нет зашифрованного сообщения для дешифрования');
        return;
    }
    
    const number = parseInt(ciphertext[0]);
    const decrypted = mhSystem.decrypt(number);
    
    resultDiv.textContent += `\nРасшифрованное сообщение: ${decrypted}`;
    console.log('Расшифровано Мерклом-Хеллманом:', number, '→', decrypted);
}

// ============================================
// АЗБУКА МОРЗЕ
// ============================================

function textToMorse(text) {
    return text.toUpperCase().split('').map(char => 
        MORSE_CODE[char] || char
    ).join(' ');
}

function morseToText(morse) {
    const morseToChar = {};
    for (const [char, code] of Object.entries(MORSE_CODE)) {
        morseToChar[code] = char;
    }
    
    return morse.split(' ').map(code => 
        morseToChar[code] || code
    ).join('');
}

function textToMorseDemo() {
    const textInput = document.getElementById('morse-text');
    const resultDiv = document.getElementById('morse-result');
    
    if (!textInput || !resultDiv) {
        console.error('Элементы азбуки Морзе не найдены');
        return;
    }
    
    const text = textInput.value;
    const result = textToMorse(text);
    resultDiv.textContent = result;
    resultDiv.style.background = '#e8f6f3';
    resultDiv.style.borderColor = '#2ecc71';
    
    console.log('Текст → Морзе:', text, '→', result);
}

function morseToTextDemo() {
    const textInput = document.getElementById('morse-text');
    const resultDiv = document.getElementById('morse-result');
    
    if (!textInput || !resultDiv) {
        console.error('Элементы азбуки Морзе не найдены');
        return;
    }
    
    const morse = textInput.value;
    const result = morseToText(morse);
    resultDiv.textContent = result;
    resultDiv.style.background = '#fef9e7';
    resultDiv.style.borderColor = '#f39c12';
    
    console.log('Морзе → Текст:', morse, '→', result);
}

// ============================================
// КЛАВИАТУРНАЯ НАВИГАЦИЯ
// ============================================

function initKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Проверяем, не находится ли фокус в интерактивном элементе
        const activeElement = document.activeElement;
        const isInteractive = activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.tagName === 'BUTTON' ||
            activeElement.tagName === 'SELECT'
        );
        
        // Если элемент интерактивный, не перехватываем навигационные клавиши
        if (isInteractive) {
            // Разрешаем только стрелки для навигации в текстовых полях
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || 
                    event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    return true;
                }
            }
            return;
        }
        
        // Обработка навигации по презентации
        switch(event.key) {
            case 'ArrowLeft':
            case 'PageUp':
                event.preventDefault();
                prevSlide();
                break;
                
            case 'ArrowRight':
            case 'PageDown':
                event.preventDefault();
                nextSlide();
                break;
                
            case 'Home':
                event.preventDefault();
                showSlide(0);
                break;
                
            case 'End':
                event.preventDefault();
                showSlide(totalSlides - 1);
                break;
                
            case ' ':
            case 'Spacebar':
                event.preventDefault();
                nextSlide();
                break;
        }
    }, true);
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Презентация "Криптографические алгоритмы" загружается...');
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация клавиатурной навигации
    initKeyboardNavigation();
    
    // Генерация начальных ключей для Меркла-Хеллмана
    generateMHKeys();
    
    // Автоматическое шифрование примера при загрузке
    setTimeout(() => {
        // Если мы на слайде с шифром Цезаря
        if (document.querySelector('#slide-7.active')) {
            encryptCaesar();
        }
        
        // Если мы на слайде с азбукой Морзе
        if (document.querySelector('#slide-13.active')) {
            textToMorseDemo();
        }
    }, 500);
    
    console.log(`Презентация загружена. Всего слайдов: ${totalSlides}`);
    console.log('Готово к использованию!');
});

// ============================================
// ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА
// ============================================

window.encryptCaesar = encryptCaesar;
window.decryptCaesar = decryptCaesar;
window.generateMHKeys = generateMHKeys;
window.encryptMH = encryptMH;
window.decryptMH = decryptMH;
window.textToMorseDemo = textToMorseDemo;
window.morseToTextDemo = morseToTextDemo;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.showSlide = showSlide;
