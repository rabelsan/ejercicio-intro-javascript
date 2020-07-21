'use strict';

/**
* Converts a well formed Roman number to Decimal format and returns the value.
* Otherwise, it prints errors to console and returns value 'null'
* @param {string} romanNum numeral to convert
*/
function convertRomanToDecimal(romanNum) {
    var valueDec = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    var digitPrev = ''
    var valor = 0
    var resultado = null
 
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
    var resultado =  null
    
    if (validateDecimal(decNum)) {
        resultado = ''
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

    if ((typeof (num) !== 'string') || (num.length < 1)) {
        errorStr += ' - Debe introducir un número en formato Romano.\n'
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
        errorStr += ' - No es un número en formato Decimal.\n'
        isOk = false
    }

    if (isOk) {
        if (number<1 || number>3999) {
            errorStr += ' - Sólo se admiten valores entre ' + min + ' y ' + max + '.\n'
            isOk = false
        } else if (number != Math.trunc(number)) {
            errorStr += ' - El número debe ser un entero.\n'
            isOk = false
        }
    }
    if (!isOk) { 
        console.log(errorStr)
    }

    return isOk
}

/**
* Read a file in Synchronous mode and return data read
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {string} file File name
*/
function readFileSync(file) {
    let fs = require("fs");
    console.log(`\nLeyendo archivo "${file}" en modo Síncrono...\n`)
   let data = fs.readFileSync(file, 'utf8')
    return data
}

/**
* Read a file in Asynchronous mode and return data read
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {string} file File name
*/
function readFileAsync(file) {
    return new Promise( (resolve, reject) => {
        let fs = require("fs");
        console.log(`\nLeyendo archivo "${file}" en modo Asíncrono...\n`)
       fs.readFile(file, 'utf8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)    
            }
        })
    })
}

/**
* Create/replace the content of a file in Asynchronous mode (writeFile())
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {string} file File name
* @param {string} data Data to be saved
*/
function saveFile(fileOut, data) {
    let fs = require('fs');

    fs.writeFile(fileOut, data, (error) => {
        if (error) {
            console.log(`Error lectura asíncrona "${error.path}": ${error.code} ${error.syscall} (Código: ${error.errno})`)
        } else {
            console.log(`\n¡Resultados guardados en fichero "${fileOut}"!\n`);
        }    
    });
}

/**
* Read a file in Synchronous mode, validate data and convert Roman to Decimal numeral and Decimal to Roman
* Data in wrong format (neither Roman nor Decimal numerals), are refused
* Numbers converted succesfully are save in the output file
* @param {string} file Input file name
* @param {string} file Output file name
*/
function decRomanFileSyncConverter (fileIn, fileOut) {
    let data = readFileSync(fileIn)
    let arrData = []
    let result = null
    let arrResult = []

    if (typeof data !== 'undefined') {
        arrData = data.split('\n');
        
        for (var i = 0; i < arrData.length; i++) {
            result = isNaN(arrData[i]) ? convertRomanToDecimal(arrData[i]) : convertDecimalToRoman(arrData[i])    
            if (!result) {
                console.log(`Valor descartado: ${arrData[i]}`) 
            } else {
               arrResult.push(result)
            }
        } 
        if (arrResult.length>0) {   
            saveFile('resultado.txt', arrResult.join('\n'))
        }
    }
}

/**
* Read a file in Asynchronous mode, validate data and convert Roman to Decimal numeral and Decimal to Roman
* Data in wrong format (neither Roman nor Decimal numerals), are refused
* Numbers converted succesfully are save in the output file
* @param {string} file Input file name
* @param {string} file Output file name
*/
function decRomanFileAsyncConverter (fileIn, fileOut) {
    readFileAsync(fileIn)
    .then (data => {
        try {
            let arrData = []
            let result = null
            let arrResult = []
        
            if (typeof data !== 'undefined') {
                arrData = data.split('\n');
            
                for (var i = 0; i < arrData.length; i++) {
                    result = isNaN(arrData[i]) ? convertRomanToDecimal(arrData[i]) : convertDecimalToRoman(arrData[i])    
                    if (!result) {
                        console.log(`Valor descartado: ${arrData[i]}`) 
                    } else {
                        arrResult.push(result)
                    }
                } 
                if (arrResult.length>0) {   
                    saveFile('resultado.txt', arrResult.join('\n'))
                }  
            }     
        } catch (err) {
            console.log(err)
        } 
    })
    .catch (error => {
        console.log(`Error lectura asíncrona "${error.path}": ${error.code} ${error.syscall} (Código: ${error.errno})`)
    })
}


// Ejecutar este método para probar la lectura síncrono 
//decRomanFileSyncConverter('ficheroDatos.txt','resultado.txt')

// Ejecutar este método para probar la lectura asíncrona
decRomanFileAsyncConverter('ficheroDatos.txt','resultado.txt')
