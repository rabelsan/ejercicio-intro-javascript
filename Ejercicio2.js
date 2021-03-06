'use strict';

/**
* Class to define all possible suits of the cards
*/
class Suits {
    constructor () {
        this.suits = {S: 'spades', H: 'hearts', C: 'clubs', D:'diamonds'}
        this.getSuits = () => {
            return this.suits    
        } 
        this.getSuit = (prop) => {
            return this.suits[prop]
        }
    }
}

/**
* Class to define all possible values of the cards
*/
class Values {
    constructor () {
        this.values = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7:7, 8: 8, 9: 9, T: 10,
                       J: 11, Q: 12, K: 13, A: 14}
        this.getValues = () => {
            return this.values
        } 
        this.getValue = (prop) => {
            return this.values[prop]
        }
    }
}

/**
* Class to define the game rules
*/
class Rules {
    constructor () {
        this.rules = [{result: 'Straight Flash', consecutive: 5, equal1: 0, equal2: 0, color: true, value: 8},
                      {result: 'Poker', consecutive: 0, equal1: 4, equal2: 0, color: false, value: 7},
                      {result: 'Full', consecutive: 0, equal1: 2, equal2: 3, color: false, value: 6},
                      {result: 'Flush', consecutive: 5, equal1: 0, equal2: 0, color: false, value: 5},
                      {result: 'Three of a kind', consecutive: 0, equal1: 3, equal2: 0, color: false, value: 4},
                      {result: 'Two pairs', consecutive: 0, equal1: 2, equal2: 2, color: false, value: 3},
                      {result: 'Pair', consecutive:0, equal1: 2, equal2: 0, color: false, value: 2},
                      {result: 'High Card', consecutive:0, equal1: 0, equal2: 0, color: false, value: 1}]
                   
        this.getRules = () => {
            return this.rules
        } 
        this.getRule = (prop) => {
            return this.rules[prop]
        }
        this.setCardsWeight = (pos, eq1Weight, eq2Weight, weights) => {
            this.rules[pos].equal1Weight = eq1Weight
            this.rules[pos].equal2Weight = eq2Weight
            this.rules[pos].cardsWeight = weights
        }
    }
}


/**
* Generates a new deck of poker cards
* @param {Object} object of class Suits
* @param {Object} object of class Values
*/
function deckOfPokerCards (suits, values) {
    const handCards = 5
    let cards = []
    return {
        generateDeckOfCards: () => { 
            for (const keyS in suits.getSuits()) {
                for (const keyV in values.getValues()) {
                    cards.push({
                        keyV,
                        keyS
                    })
                }
            }
        }, 

        getHandCards: () => {
            return handCards
        },

        getCards: () => {
            return cards
        },

        showDeck: () => {
            for (const key in cards) {
                console.log(key, cards[key])
            }
        }
    }
}

/**
* Deals a hand of poker cards for a player
* @param {Object} object of type deckOfPokerCards
*/
function dealHandOfPoker (pokerCards) {
    let hand = []

    return {
        dealHand: () => {
            let card = 0
            let numCards = 0
            let deckOfPokerCards = pokerCards.getCards()
            do {
                card = Math.floor(Math.random() * Math.floor(deckOfPokerCards.length))
                // add a new card to the player hand... 
                hand.push(deckOfPokerCards[card])
                // ... and remove it from the deck 
                deckOfPokerCards.splice(card, 1)
                numCards ++
            } while ((numCards<pokerCards.getHandCards()) || (deckOfPokerCards.lenght<1))
        },

        getCard: (pos) => {
            return hand[pos].keyV + hand[pos].keyS
        },

        getHand: () => {
            return hand
        },

        getHandFormatted: () => {
            let cards = '';
            for (var i=0; i<hand.length; i++) {
                cards += ' ' + hand[i].keyV + hand[i].keyS 
            }
            return cards
        }
    }
}

/**
* Create/append the content of a file in Asynchronous mode (writeFile())
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {Object} object dealHandOfPoker
*/
function getScorePlayer(playerHand) {

    let hand = []
    let values = new Values()
    let rules = new Rules()
    let countEqualCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    let sumEqualCards =   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    let cardsWeight = []
    let consecutive = 0
    let equal1 = 0
    let equal1Weight = 0
    let equal2 = 0
    let equal2Weight = 0
    let color = true
    let result = ''
    
    //group cards with the same value and get cards' weight based on its values
    hand = playerHand.getHand()
    for (var i=0; i<hand.length; i++) {
        countEqualCards[values.getValue(hand[i].keyV)]++
        sumEqualCards[values.getValue(hand[i].keyV)] += values.getValue(hand[i].keyV)
        cardsWeight.push(values.getValue(hand[i].keyV))
        if ((i>0) && (hand[i-1].keyS !== hand[i].keyS)) {
            color = false
        } 
    }
    
    //sort weights array in descending order
    cardsWeight.sort(function(a, b){return b-a})
    
    //check consecutives & cards with the same value
    for (var i=0; i<countEqualCards.length; i++) {
        switch (countEqualCards[i]) {
            case 1:
                consecutive = (i===0) ? 1 : ((countEqualCards[i-1])===1) ? ++consecutive : 1
                break
            case 2:
            case 3:
            case 4:
                if (equal1 === 0) {
                    equal1 = countEqualCards[i] 
                    equal1Weight = sumEqualCards[i] 
                } else {
                     equal2 = countEqualCards[i]
                     equal2Weight = sumEqualCards[i]
                }
        }
    }
    
    //get result
    for (var i=0; i<rules.getRules().length; i++) {
        if (((rules.getRule(i).consecutive === consecutive) && (rules.getRule(i).color === color)) ||
            ((rules.getRule(i).equal1 === equal1) && (rules.getRule(i).equal2 === equal2))) {
            rules.setCardsWeight(i, equal1Weight, equal2Weight, cardsWeight)   
            result = rules.getRule(i)
        }
    }
    return result
}

/**
* Create/append the content of a file in Asynchronous mode (writeFile())
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {string} file File name
* @param {string} data Data to be saved
*/
function saveFileAsync(fileOut, data) {
    let fs = require('fs');

    fs.appendFile(fileOut, data, (error) => {
        if (error) {
            console.log(`Error lectura asíncrona "${error.path}": ${error.code} ${error.syscall} (Código: ${error.errno})`)
        } else {
            console.log(`\n¡Partida guardada en fichero "${fileOut}"!\n`);
        }    
    });
}

/**
* Create/append the content of a file in Synchronous mode (writeFile())
* Otherwise, it returns 'undefined' if the reading operation returns errors.
* @param {string} file File name
* @param {string} data Data to be saved
*/
function saveFileSync(fileOut, data) {
    let fs = require('fs');

    fs.appendFileSync(fileOut, data);
    console.log(`\n¡Partida guardada en fichero "${fileOut}"!\n`);
}

/**
* Deals poker cards randomly for two players and, based on the dealed cards, decides who is the winner.
*/ 
function playGame() {

    let scorePlayer1 = []
    let scorePlayer2 = []
    let winner = 0
    let result = ''
    let suits = new Suits()
    //suits.getSuits()
    let values = new Values()
    //values.getValues()

    /* generate a new deck of pocker cards */
    const pokerCards = deckOfPokerCards(suits, values)
    pokerCards.generateDeckOfCards()
    //pokerCards.showDeck()

    /* deal cards to players */
    const player1 = dealHandOfPoker(pokerCards)
    player1.dealHand()
    
    const player2 = dealHandOfPoker(pokerCards)
    player2.dealHand()
    
    //get the results
    scorePlayer1 = getScorePlayer(player1)
    scorePlayer2 = getScorePlayer(player2)

    result = `Entrada: Jugador 1:${player1.getHandFormatted()}   Jugador 2:${player2.getHandFormatted()}\n`
    
    //check the winner
    if (scorePlayer1.value > scorePlayer2.value) {
        winner = 1
    } else if (scorePlayer1.value < scorePlayer2.value) {
        winner = 2
    } else {
        if ((scorePlayer1.equal1Weight+scorePlayer1.equal2Weight) > (scorePlayer2.equal1Weight+scorePlayer2.equal2Weight)) {
            winner = 1
        } else if ((scorePlayer1.equal1Weight+scorePlayer1.equal2Weight) < (scorePlayer2.equal1Weight+scorePlayer2.equal2Weight)) {
            winner = 2
        } else {
            let cont = 0
            do {
                if (scorePlayer1.cardsWeight[cont] > scorePlayer2.cardsWeight[cont]) {
                    winner = 1
                } else if (scorePlayer1.cardsWeight[cont] < scorePlayer2.cardsWeight[cont]) {
                    winner = 2
                }
                cont++
            } while ((winner == 0) || (cont < pokerCards.numCards))
        }
    }

    switch (winner) {
        case 0:
            result += `Salida: Empate\n`
            break
        case 1:
            result += `Salida: Jugador 1 gana, ${scorePlayer1.result}\n`
            break
        case 2:
            result += `Salida: Jugador 2 gana, ${scorePlayer2.result}\n`
    }
    
    // save the result and exit (using both methods saveFileSync & saveFileAsync)
    if (winner < 2)
        saveFileSync('partidas.txt', result) //Synchronous mode
    else {    
        saveFileAsync('partidas.txt', result)  //Asyncrhonous mode
    }

        return result

}

//play game
console.log(playGame())
