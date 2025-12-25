// ============================================
// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ИНТЕРАКТИВНОСТИ
// ============================================

// Включение режима демо (отключает навигацию)
function enableDemoMode() {
    // Временно отключаем навигацию по презентации
    document.addEventListener('keydown', blockNavigation, true);
}

// Отключение режима демо
function disableDemoMode() {
    document.removeEventListener('keydown', blockNavigation, true);
}

// Блокировка навигационных клавиш
function blockNavigation(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
        e.key === 'PageUp' || e.key === 'PageDown' ||
        e.key === ' ' || e.key === 'Spacebar') {
        e.stopPropagation();
        e.preventDefault();
    }
}

// Обновление значения сдвига
function updateShiftValue(value) {
    const shiftValue = document.getElementById('shift-value');
    if (shiftValue) {
        shiftValue.textContent = value;
    }
}

// ============================================
// ОБНОВЛЕННЫЕ ФУНКЦИИ ШИФРА ЦЕЗАРЯ
// ============================================

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
        result.style.color = '#2ecc71';
        
        console.log('Зашифровано:', text, '→', encrypted);
        return false; // Предотвращаем всплытие события
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
        result.style.color = '#f39c12';
        
        console.log('Расшифровано:', text, '→', decrypted);
        return false; // Предотвращаем всплытие события
    } catch (error) {
        console.error('Ошибка при дешифровании:', error);
        return false;
    }
}

// ============================================
// ОБНОВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ СЛАЙДА
// ============================================

function initCaesarDemo() {
    console.log('Инициализация демо шифра Цезаря...');
    
    const caesarText = document.getElementById('caesar-text');
    const caesarShift = document.getElementById('caesar-shift');
    const shiftValue = document.getElementById('shift-value');
    
    if (caesarText && caesarShift && shiftValue) {
        // Устанавливаем начальное значение
        updateShiftValue(caesarShift.value);
        
        // Обновление значения сдвига при движении ползунка
        caesarShift.addEventListener('input', function(e) {
            e.stopPropagation();
            updateShiftValue(this.value);
        });
        
        // Обработка кликов на кнопках
        const encryptBtn = document.querySelector('#slide-7 .btn-encrypt');
        const decryptBtn = document.querySelector('#slide-7 .btn-decrypt');
        
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
        }, 500);
        
        console.log('Демо шифра Цезаря инициализировано');
    } else {
        console.error('Не найдены элементы демо шифра Цезаря');
    }
}

// ============================================
// ОБНОВЛЕННАЯ ФУНКЦИЯ ПОКАЗА СЛАЙДА
// ============================================

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
    setTimeout(() => {
        switch(index) {
            case 6: // Слайд 7 (индекс 6)
                initCaesarDemo();
                break;
            case 9: // Слайд 10 (индекс 9)
                initMHDemo();
                break;
            case 12: // Слайд 13 (индекс 12)
                initMorseDemo();
                break;
        }
    }, 100);
}

// ============================================
// ОБНОВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Презентация "Криптографические алгоритмы" загружается...');
    
    // Инициализация навигации
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            disableDemoMode();
            prevSlide();
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            disableDemoMode();
            nextSlide();
        });
    }
    
    // Показываем первый слайд
    showSlide(0);
    
    // Инициализация клавиатурной навигации
    initKeyboardNavigation();
    
    // Генерация начальных ключей для Меркла-Хеллмана
    setTimeout(generateMHKeys, 500);
    
    console.log(`Презентация загружена. Всего слайдов: ${totalSlides}`);
});

// ============================================
// НАВИГАЦИЯ И ОСНОВНОЙ СКРИПТ ПРЕЗЕНТАЦИИ
// ============================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const currentSlideDisplay = document.getElementById('current-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Инициализация навигации
function initNavigation() {
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
    
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    
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
        case 7: // Демонстрация шифра Цезаря
            initCaesarDemo();
            break;
        case 11: // Демонстрация Меркла-Хеллмана
            initMHDemo();
            break;
        case 14: // Демонстрация азбуки Морзе
            initMorseDemo();
            break;
    }
}

function initCaesarDemo() {
    const caesarText = document.getElementById('caesar-text');
    const caesarShift = document.getElementById('caesar-shift');
    const shiftValue = document.getElementById('shift-value');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    
    if (caesarText && caesarShift && shiftValue) {
        // Обновление значения сдвига
        caesarShift.addEventListener('input', function(e) {
            e.stopPropagation();
            if (shiftValue) shiftValue.textContent = this.value;
        });
        
        // Инициализация кнопок
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
        
        // Разрешаем ввод в текстовых полях
        if (caesarText) {
            caesarText.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
            
            caesarText.addEventListener('keydown', function(e) {
                e.stopPropagation();
            });
        }
        
        console.log('Инициализирована демонстрация шифра Цезаря');
    }
}

function initMHDemo() {
    const mhMessage = document.getElementById('mh-message');
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
    
    console.log('Инициализирована демонстрация Меркла-Хеллмана');
}

function initMorseDemo() {
    const morseText = document.getElementById('morse-text');
    const morseToTextBtn = document.getElementById('morse-to-text-btn');
    const textToMorseBtn = document.getElementById('text-to-morse-btn');
    
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
    
    console.log('Инициализирована демонстрация азбуки Морзе');
}

// ============================================
// ШИФР ЦЕЗАРЯ (сохраняем вашу реализацию)
// ============================================

const CAESAR_ALPHABET = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ 1234567890,?.';

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
    const text = document.getElementById('caesar-text');
    const shift = document.getElementById('caesar-shift');
    const result = document.getElementById('caesar-result');
    
    if (!text || !shift || !result) {
        console.error('Элементы шифра Цезаря не найдены');
        return;
    }
    
    const encrypted = caesarCipher(text.value, parseInt(shift.value), true);
    result.textContent = encrypted;
    
    console.log('Зашифровано:', text.value, '→', encrypted);
}

function decryptCaesar() {
    const text = document.getElementById('caesar-text');
    const shift = document.getElementById('caesar-shift');
    const result = document.getElementById('caesar-result');
    
    if (!text || !shift || !result) {
        console.error('Элементы шифра Цезаря не найдены');
        return;
    }
    
    const decrypted = caesarCipher(text.value, parseInt(shift.value), false);
    result.textContent = decrypted;
    
    console.log('Расшифровано:', text.value, '→', decrypted);
}

// ============================================
// КРИПТОСИСТЕМА МЕРКЛА-ХЕЛЛМАНА (сохраняем вашу реализацию)
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
// АЗБУКА МОРЗЕ (сохраняем вашу реализацию)
// ============================================

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
            // Разрешаем только стрелки вверх/вниз для навигации в текстовых полях
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || 
                    event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    return true;
                }
            }
            // Для кнопок и select разрешаем только Enter/Space
            if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') {
                event.stopPropagation();
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
    }, true); // Используем capture phase для перехвата событий
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
        if (document.getElementById('caesar-text')) {
            encryptCaesar();
        }
        
        if (document.getElementById('morse-text')) {
            textToMorseDemo();
        }
    }, 500);
    
    console.log(`Презентация загружена. Всего слайдов: ${totalSlides}`);
    console.log('Готово к использованию!');
});

// Экспорт функций для глобального доступа
window.encryptCaesar = encryptCaesar;
window.decryptCaesar = decryptCaesar;
window.generateMHKeys = generateMHKeys;
window.encryptMH = encryptMH;
window.decryptMH = decryptMH;
window.textToMorseDemo = textToMorseDemo;
window.morseToTextDemo = morseToTextDemo;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
