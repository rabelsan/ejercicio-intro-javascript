'use strict';

const { turquoise } = require("color-name");

/**
* Converts a well formed Roman number to Decimal format and returns the value.
* Otherwise, it prints errors to console and returns value (-1)
* @param {string} romanNum numeral to convert
*/
function convertRomanToDecimal(romanNum) {
    var valueDec = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    var digitPrev = ''
    var valor = 0
    var resultado = -1
 
    if (validateRoman(romanNum)) {
        resultado = 0
        for (var i = 0; i < romanNum.length;i++) {
            if (i>0) {
                valueDec[romanNum[i]] <= valueDec[digitPrev] ?  resultado += valor : resultado -= valor
            }
            valor = valueDec[romanNum[i]]
            digitPrev = romanNum[i]
        }
        resultado += valor
    }
 
    return resultado
}

/**
* Converts a well formed Decimal number to Roman format and returns the value.
* Otherwise, it prints errors to console and returns value ´null'
* @param {string} decNum Decimal numeral to convert
*/
function convertDecimalToRoman(decNum) {
    var valueRoman = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 20: 'XX', 30: 'XXX', 
                       40: 'XL', 50: 'L', 60: 'LX', 70: 'LXX', 80: 'LXXX', 90: 'XC', 100: 'C', 200: 'CC', 300: 'CCC', 400: 'CD', 500: 'D', 
                       600: 'DC', 700: 'DCC', 800: 'DCCC', 900: 'CM', 1000: 'M', 2000: 'MM', 3000: 'MMM' }
    var module = 0
    var factor = 1
    var valor = Number(decNum)
    var resultado = ''
    
    if (validateDecimal(decNum)) {
        do {
            module = factor < valor ? valor % (10 * factor) : valor
            factor *= 10
            valor -= module
            resultado = module !== 0 ? valueRoman[module] + resultado : resultado
        } while (valor>0)
    }
 
    return resultado
}

/**
* Validates the Roman number and returns 'true' if the number is well formed.
* Otherwise, it returns a 'false' boolean
* @param {string} num Roman numeral to convert
*/
function validateRoman (num) {
    var digitRoman = 'IVXLCDM'
    var rules = ['IIII','VV', 'XXXX', 'LL', 'CCCC', 'DD', 'MMMM', 'IL', 'IC', 'ID', 'IM', 'XD', 'XM',
                 'VX', 'VL', 'VC', 'VD', 'VM', 'LC', 'LD', 'LM', 'DM']
    var digitWrong = []
    var ruleWrong = []
    var errorStr = '\nParámetro incorrecto ('+num+'): \n'
    var strNum = ''
    var isOk = true

    // Validamos si el parámetro de entrada es un string con contenido,
    // los dígitos del número son correctos y el número Romano está bien formado
 
    if ((typeof (num) !== 'string') || (num.length < 1)) {
        errorStr += ' - Debe introducir un número Romano.\n'
        isOk = false
    } else {
        strNum = String(num).toUpperCase()
        for (var i = 0; i < strNum.length; i++) {
            if (digitRoman.indexOf(strNum[i]) < 0) {
                digitWrong.push(strNum[i])
                isOk = false
            }
        }
        if (digitWrong.length > 0) {
            errorStr += ' - Hay caracteres erróneos ('+digitWrong.join()+').\n'
        }
        for (i = 0; i < rules.length; i++) {
        if (strNum.indexOf(rules[i]) >= 0) {
            ruleWrong.push(rules[i])
                isOk = false
            }
        }
        if (ruleWrong.length > 0) {
            errorStr += ' - No sigue las reglas de los números Romanos ('+ruleWrong.join()+').\n'
        }
    }

    if (!isOk) { 
        console.log(errorStr)
    }
    
    return isOk
}

/**
* Validates the Decimal number and returns 'true' if the number is well formed.
* Otherwise, it returns a 'false' boolean
* @param {string} num Decimal numeral to convert
* @param {number} min Minimum Decimal value accepted (1 by default)
* @param {number} min Maximum Decimal value accepted (3999 by default)
*/
function validateDecimal (num, min=1, max=3999) {
    var isOk = true
    var number = 0
    var errorStr = '\nParámetro incorrecto ('+num+'): \n'
    
    number = Number(num)
    if (isNaN(number)) {
        errorStr += ' - No es un número.\n'
        isOk = false
    }

    if (isOk) {
        if (number<1 || number>3999) {
            errorStr += ' - Sólo se admiten valores entre ' + min + ' y ' + max + '.\n'
            isOk = false
        }
    }

    if (!isOk) { 
        console.log(errorStr)
    }

    return isOk
}

function readFileSync(file) {

}

function readFileAsync(file) {

}

console.log(convertRomanToDecimal(5))
console.log(convertRomanToDecimal('MCMXAIIZI'))
console.log(convertRomanToDecimal('MCMMMMLLXIAII'))

console.log(convertRomanToDecimal('MCMLXX'))

console.log(convertDecimalToRoman(2431))
console.log(convertDecimalToRoman(2003))
console.log(convertDecimalToRoman(3060))
console.log(convertDecimalToRoman(401))
console.log(convertDecimalToRoman(18))
console.log(convertDecimalToRoman(9))
console.log(convertDecimalToRoman('j'))
console.log(convertDecimalToRoman(2e20))

 
