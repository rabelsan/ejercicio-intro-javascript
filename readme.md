# Prácitca Introducción JavaScript

Ejercicio1: **Conversor números Decimales / Romanos**
Ejercicio2: **Partida de Poker**

## NOTAS: 

## Ejercicio 1 Conversor Decimal/Romano

Se han definido las siguientes funciones:

- convertRomanToDecimal(romanNum): Convierte un número bien formado en formato Romano a Decimal

- validateRoman(num): Valida que el parámetro recibido es un número Romano bien formado

- convertDecimalToRoman(decNum): Converite un número decimal previamente validado a Romano

- validateDecimal (num, min=1, max=3999): Valida que el parámetro es un decimal correcto dentro del rango de valores establecido

- readFileSync(file): Lee el fichero pasado por parámetro en modo síncrono

- readFileSync(file): Lee el fichero de entrada creado para las pruebas (ficheroDatos.txt), en modo síncrono

- readFileAsync(file): Lee el fichero de entrada en modo asíncrono (nota: se han utilizdo promesas para retornar el resultado)

- saveFile(file): Guarda la conversión de los datos de entrada válidos en un fichero de salida (resultado.txt)

- **decRomanFileSyncConverter (fileIn, fileOut)**: Función que lee un fichero de entrada en modo **síncrono**, convierte los valores correctos de Decimal a Romano y de Romano a Decimal, y los guarda en un fichero de salida

- **decRomanFileAsyncConverter (fileIn, fileOut)**: Función que lee un fichero de entrada en modo **asíncrono**, convierte los valores correctos de Decimal a Romano y de Romano a Decimal, y los guarda en un fichero de salida

- saveFile(fileOut, data): Guarda los datos convertidos en el fichero de salida definido en el primer parámatros


## Ejercicio 2 Partida Poker (2 jugadores)

En este ejercicio se han definidos las clases necesarias para poder formar una baraja, repartir cartas, obtener los resultados de cada jugador y comprobar quién ha ganado. Una vez hecho esto, las partidas se van añadiendo al fichero de salida "partidas.txt".

He intentado utilizar la nueva sintaxis de clases y el método factory (closures), además de las funciones que se definen normalmente:

- class Suits: Para definir los palos de la baraja

- class Values: Aquí tenemos los posibles valores de las cartas para cada palo

- class Rules: Se definen las reglas y su importancia. Además, se utiliza para guardar los resultados de cada jugador para luego poder saber quién es el ganador (o si han empatado)

- deckOfPokerCards (suits, values): Está función forma una nueva baraja en base a los palos y sus valores definidos en las clases anteriores

- dealHandOfPoker (pokerCards): Reparte 5 cartas a cada jugador. Cada carta repartida se elimina de la baraja

- getScorePlayer(playerHand): Se analiza el resultado de cada jugador en función a las reglas del juego y se guarda el resultado en función del valor de las cartas de cada jugador para, a continuación, poder comparar las jugadas 

- saveFileAsync(fileOut, data): Función para guardar en modo asíncrono el resultado de la partida en el fichero "partidas.txt"

- saveFileSync(fileOut, data): Función para guardar en modo síncrono el resultado de la partida en el fichero "partidas.txt"

- **playGame()**: Es la función principal. Se encarga de crear la nueva baraja, repartir las cartas a cada jugador, obtener los resultados y, finalmente, comprobar quién ha ganado (o si ha habido empate), y finalmente, guardar el resultado de la partida en un fichero (utilizando tanto la versión síncrona como asíncorna).


## Ejercicio 2b Partida Poker (multijugador)

- **playGame(players=2)**: En esta versión admite un parámetro para el número de jugadores. El valor por defecto si no se indica nada es 2 jugadores pero pueden jugar a de 2 a 10 jugadores en la misma partida. Sólo para seguir practicando con el lenguaje porque es la primera vez que hago un programa en JavaScript.
 

Ramón Beltrán Sánchez

