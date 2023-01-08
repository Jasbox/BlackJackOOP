class blackJack {
  constructor() {
    this.sum = 0;
    this.cards = [];
    this.hasBlackJack = false;
    this.isAlive = false;
    this.message = "";
    this.deck = [
      "Ace",
      "Ace",
      "Ace",
      "Ace",
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      6,
      6,
      6,
      6,
      7,
      7,
      7,
      7,
      8,
      8,
      8,
      8,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      "Jack",
      "Jack",
      "Jack",
      "Jack",
      "Queen",
      "Queen",
      "Queen",
      "Queen",
      "King",
      "King",
      "King",
      "King",
    ];
  }
  //to a get random card from deck
  getCard() {
    const randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    this.cards.push(randomCard);
  }

  //check cards value when they are not number cards
  getCardValue(card) {
    let cardValue = 0;

    if (card === "Jack" || card === "Queen" || card === "King") {
      cardValue = 10;
    } else if (card === "Ace") {
      cardValue = 11;
    } else {
      cardValue = card;
    }
    return cardValue;
  }

  //add the cards value to the sum
  getsSum() {
    let sum = 0;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (card === "Ace") {
        sum += this.getAceValue(sum);
      } else {
        sum += this.getCardValue(card);
      }
    }
    return sum;
  }

  // start the game and get 2 cards and the sum
  startGame() {
    this.isAlive = true;

    this.getCard();
    this.getCard();

    this.sum = this.getsSum();
    this.renderGame();
  }

  // determine "Ace" value
  getAceValue(sum) {
    if (sum <= 10) {
      return 11;
    } else {
      return 1;
    }
  }

  //get another card
  newCard() {
    if (this.isAlive === true && this.hasBlackJack === false) {
      let card = this.getCard();
      this.sum += this.getCardValue(card);
      this.renderGame();
    }
  }

  // if hand is over 21
  isBust() {
    return this.sum > 21;
  }
  // if hand got blackjack
  isBlackjack() {
    return this.hasBlackJack;
  }

  // when choose to stand
  stand() {
    this.isAlive = false;
    this.message = "Stand, no more cards ";
  }

  // render out game states and messages
  renderGame() {
    if (this.isBust()) {
      this.message = "You are out of the game!";
      this.isAlive = false;
      this.hasBlackJack = false;
    } else if (this.isBlackjack()) {
      this.message = "You've got Blackjack!";
      this.isAlive = false;
      this.hasBlackJack = true;
    } else {
      this.message = "Do you want to draw a new card?";
    }
  }
}

//const game1 = new blackJack()
//console.log(game1)
module.exports = blackJack;
