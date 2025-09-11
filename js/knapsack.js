// js/knapsack.js

class MerkleHellman {
    constructor() {
        // Супервозрастающая последовательность (секретный ключ)
        this.privateKey = [2, 5, 11, 23, 47, 95, 191, 383];
        
        // Модуль (больше суммы всех элементов privateKey)
        this.m = 811;
        
        // Множитель (взаимно простой с m)
        this.w = 31;
        
        // Вычисление открытого ключа
        this.publicKey = this.calculatePublicKey();
        
        // Модульная инверсия w по модулю m
        this.wInverse = this.modInverse(this.w, this.m);
    }
    
    // Вычисление открытого ключа
    calculatePublicKey() {
        return this.privateKey.map(x => (x * this.w) % this.m);
    }
    
    // Вычисление модульной инверсии
    modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    }
    
    // Шифрование
    encrypt(plaintext) {
        // Преобразование текста в бинарную последовательность
        const binaryArray = this.textToBinary(plaintext);
        const result = [];
        
        // Шифрование каждого байта
        for (let i = 0; i < binaryArray.length; i += 8) {
            const byte = binaryArray.slice(i, i + 8);
            let sum = 0;
            
            for (let j = 0; j < byte.length; j++) {
                if (byte[j] === 1) {
                    sum += this.publicKey[j];
                }
            }
            
            result.push(sum);
        }
        
        return result;
    }
    
    // Дешифрование
    decrypt(ciphertext) {
        const result = [];
        
        for (let i = 0; i < ciphertext.length; i++) {
            // Вычисление S'
            const sPrime = (ciphertext[i] * this.wInverse) % this.m;
            
            // Решение задачи о рюкзаке для супервозрастающей последовательности
            const bits = this.solveKnapsack(sPrime, this.privateKey);
            
            result.push(...bits);
        }
        
        // Преобразование бинарной последовательности в текст
        return this.binaryToText(result);
    }
    
    // Решение задачи о рюкзаке для супервозрастающей последовательности
    solveKnapsack(target, sequence) {
        const result = new Array(sequence.length).fill(0);
        let current = target;
        
        for (let i = sequence.length - 1; i >= 0; i--) {
            if (current >= sequence[i]) {
                result[i] = 1;
                current -= sequence[i];
            }
        }
        
        return result;
    }
    
    // Преобразование текста в бинарный массив
    textToBinary(text) {
        const binary = [];
        
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            
            // Преобразование в 8-битное представление
            for (let j = 7; j >= 0; j--) {
                binary.push((charCode >> j) & 1);
            }
        }
        
        return binary;
    }
    
    // Преобразование бинарного массива в текст
    binaryToText(binaryArray) {
        let result = '';
        
        for (let i = 0; i < binaryArray.length; i += 8) {
            const byte = binaryArray.slice(i, i + 8);
            let charCode = 0;
            
            for (let j = 0; j < 8; j++) {
                charCode = (charCode << 1) | byte[j];
            }
            
            result += String.fromCharCode(charCode);
        }
        
        return result;
    }
}

// Глобальные функции для взаимодействия с HTML
const mhCrypto = new MerkleHellman();

function encryptMH() {
    const inputText = document.getElementById('mh-input').value;
    
    if (!inputText) {
        document.getElementById('mh-output').value = "Введите текст для шифрования";
        return;
    }
    
    try {
        const encrypted = mhCrypto.encrypt(inputText);
        document.getElementById('mh-output').value = encrypted.join(' ');
    } catch (error) {
        document.getElementById('mh-output').value = "Ошибка шифрования: " + error.message;
    }
}

function decryptMH() {
    const inputText = document.getElementById('mh-input').value;
    
    if (!inputText) {
        document.getElementById('mh-output').value = "Введите зашифрованные числа";
        return;
    }
    
    try {
        // Преобразование строки в массив чисел
        const cipherArray = inputText.split(' ').map(Number);
        
        // Проверка на валидность
        if (cipherArray.some(isNaN)) {
            throw new Error("Неверный формат зашифрованных данных");
        }
        
        const decrypted = mhCrypto.decrypt(cipherArray);
        document.getElementById('mh-output').value = decrypted;
    } catch (error) {
        document.getElementById('mh-output').value = "Ошибка дешифрования: " + error.message;
    }
}
