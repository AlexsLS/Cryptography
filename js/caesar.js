// Алфавит для шифра Цезаря (47 символов)
const caesarAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя .,?";

function encryptCaesar() {
    const inputText = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';
    
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        const index = caesarAlphabet.indexOf(char);
        
        if (index !== -1) {
            const newIndex = (index + shift) % caesarAlphabet.length;
            result += caesarAlphabet[newIndex];
        } else {
            result += char;
        }
    }
    
    document.getElementById('caesar-output').value = result;
}

function decryptCaesar() {
    const inputText = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';
    
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        const index = caesarAlphabet.indexOf(char);
        
        if (index !== -1) {
            let newIndex = (index - shift) % caesarAlphabet.length;
            if (newIndex < 0) {
                newIndex += caesarAlphabet.length;
            }
            result += caesarAlphabet[newIndex];
        } else {
            result += char;
        }
    }
    
    document.getElementById('caesar-output').value = result;
}
