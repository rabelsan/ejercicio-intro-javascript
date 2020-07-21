'use strict';

/**
* Deals poker cards randomly for two players and, based on the dealed cards, decides who is the winner.
*/ 

class Suits {
    constructor () {
        this.suits = {'S': 'spades','H': 'hearts','C': 'clubs', 'D':'diamonds'}
        this.getSuits = () => {
            return this.suits    
        } 
    }
}

class Values {
    constructor () {
        this.values = {'A': 'As', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7':'7', '8': '8', '9': '9', 'T': 'Ten',
                       'J': 'Jack', 'Q': 'Queen', 'K': 'King'}
        this.getValues = () => {
            return this.values
        } 
    }
}

function deckOfPokerCards (suits, values) {
    let handCards = 5
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

function dealHandOfPoker (pokerCards) {
    let hand = []

    return {
        dealHand: () => {
            let card = 0
            let numCards = 0
            let deckOfPokerCards = pokerCards.getCards()
            do {
                card = Math.floor(Math.random() * Math.floor(deckOfPokerCards.length))
                if (hand.indexOf(deckOfPokerCards[card]) === -1) {
                    hand.push(deckOfPokerCards[card])
                    numCards ++
                }
            } while (numCards<pokerCards.getHandCards())
        },

        showHand: () => {
            console.log (hand)
        }
    }
}

let suits = new Suits()
//suits.getSuits()

let values = new Values()
//values.getValues()
const pokerCards = deckOfPokerCards(suits, values)
pokerCards.generateDeckOfCards()
//pokerCards.showDeck()

const player1 = dealHandOfPoker(pokerCards)
player1.dealHand()
player1.showHand()

const player2 = dealHandOfPoker(pokerCards)
player2.dealHand()
player2.showHand()


function randomPokerHand() {
    
    return resultado
}

//console.log(randomPokerHand())
