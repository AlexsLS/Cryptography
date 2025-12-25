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
const totalSlides = 15;

// Переменные для криптосистемы Меркла-Хеллмана
let mhSystem = null;

// ============================================
// ОСНОВНЫЕ ФУНКЦИИ НАВИГАЦИИ
// ============================================

function initNavigation() {
    slides = document.querySelectorAll('.slide');
    
    // Устанавливаем общее количество слайдов в отображении
    const totalSlidesDisplay = document.getElementById('total-slides');
    if (totalSlidesDisplay) {
        totalSlidesDisplay.textContent = totalSlides;
    }
    
    // Назначаем обработчики для кнопок навигации
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Инициализация клавиатурной навигации
    initKeyboardNavigation();
    
    // Показываем первый слайд
    showSlide(0);
}

function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Показываем выбранный слайд
    slides[index].classList.add('active');
    currentSlideIndex = index;
    
    // Обновляем отображение номера слайда
    updateSlideCounter();
    
    // Обновляем состояние кнопок
    updateButtons();
    
    // Инициализируем интерактивные элементы на текущем слайде
    setTimeout(() => initSlideInteractiveElements(currentSlideIndex), 50);
}

function updateSlideCounter() {
    const currentSlideDisplay = document.getElementById('current-slide');
    if (currentSlideDisplay) {
        currentSlideDisplay.textContent = currentSlideIndex + 1;
    }
}

function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlideIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
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
        
        // Если элемент интерактивный, разрешаем только стрелки для навигации в текстовых полях
        if (isInteractive) {
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
                event.preventDefault();
                nextSlide();
                break;
        }
    }, true);
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ
// ============================================

function initSlideInteractiveElements(slideIndex) {
    const slideNumber = slideIndex + 1;
    
    switch(slideNumber) {
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
    
    if (caesarText && caesarShift && shiftValue) {
        // Устанавливаем начальное значение
        shiftValue.textContent = caesarShift.value;
        
        // Обновление значения сдвига при движении ползунка
        caesarShift.addEventListener('input', function(e) {
            shiftValue.textContent = this.value;
        });
        
        // Автоматическое шифрование при загрузке
        setTimeout(() => {
            if (caesarText.value) {
                encryptCaesar();
            }
        }, 300);
    }
}

function initMHDemo() {
    // Инициализация системы Меркла-Хеллмана
    if (!mhSystem) {
        mhSystem = new MerkleHellman();
        updateMHKeysDisplay();
    }
}

function initMorseDemo() {
    // Автоматическое преобразование при загрузке
    setTimeout(() => {
        const morseText = document.getElementById('morse-text');
        if (morseText && morseText.value) {
            textToMorseDemo();
        }
    }, 300);
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
            return;
        }
        
        const encrypted = caesarCipher(text, shift, true);
        result.textContent = encrypted;
        result.style.background = '#e8f6f3';
        result.style.borderColor = '#2ecc71';
        
        console.log('Зашифровано:', text, '→', encrypted);
    } catch (error) {
        console.error('Ошибка при шифровании:', error);
        alert('Ошибка при шифровании: ' + error.message);
    }
}

function decryptCaesar() {
    try {
        const text = document.getElementById('caesar-text').value;
        const shift = parseInt(document.getElementById('caesar-shift').value);
        const result = document.getElementById('caesar-result');
        
        if (!text.trim()) {
            alert('Введите текст для дешифрования');
            return;
        }
        
        const decrypted = caesarCipher(text, shift, false);
        result.textContent = decrypted;
        result.style.background = '#fef9e7';
        result.style.borderColor = '#f39c12';
        
        console.log('Расшифровано:', text, '→', decrypted);
    } catch (error) {
        console.error('Ошибка при дешифровании:', error);
        alert('Ошибка при дешифровании: ' + error.message);
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
        
        // Переворачиваем строку для правильного порядка
        return result.split('').reverse().join('');
    }
}

function updateMHKeysDisplay() {
    if (!mhSystem) return;
    
    const privateKeyDiv = document.getElementById('mh-private-key');
    const publicKeyDiv = document.getElementById('mh-public-key');
    
    if (privateKeyDiv && publicKeyDiv) {
        privateKeyDiv.textContent = `Последовательность: [${mhSystem.privateKey.join(', ')}]\nМножитель: ${mhSystem.multiplier}, Модуль: ${mhSystem.modulus}`;
        publicKeyDiv.textContent = `[${mhSystem.publicKey.join(', ')}]`;
    }
}

function generateMHKeys() {
    mhSystem = new MerkleHellman();
    updateMHKeysDisplay();
    
    // Очищаем результат
    const resultDiv = document.getElementById('mh-result');
    if (resultDiv) {
        resultDiv.textContent = '';
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
        resultDiv.style.background = '#e8f6f3';
        resultDiv.style.borderColor = '#2ecc71';
        console.log('Зашифровано Мерклом-Хеллманом:', message, '→', ciphertext);
    } catch (error) {
        alert(error.message);
    }
}

function decryptMH() {
    const resultDiv = document.getElementById('mh-result');
    
    if (!resultDiv) return;
    
    const text = resultDiv.textContent;
    const ciphertextMatch = text.match(/Зашифрованное значение: (\d+)/);
    
    if (!ciphertextMatch) {
        alert('Нет зашифрованного сообщения для дешифрования');
        return;
    }
    
    const number = parseInt(ciphertextMatch[1]);
    
    try {
        const decrypted = mhSystem.decrypt(number);
        resultDiv.textContent += `\nРасшифрованное сообщение: ${decrypted}`;
        resultDiv.style.background = '#fef9e7';
        resultDiv.style.borderColor = '#f39c12';
        console.log('Расшифровано Мерклом-Хеллманом:', number, '→', decrypted);
    } catch (error) {
        alert('Ошибка при дешифровании: ' + error.message);
    }
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
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Презентация "Криптографические алгоритмы" загружается...');
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация системы Меркла-Хеллмана
    mhSystem = new MerkleHellman();
    
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
window.showSlide = function(slideNumber) {
    showSlide(slideNumber - 1);
};
