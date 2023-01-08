const blackJack = require('./index.js');

describe('blackjack', () => {
  test('should return a deck of cards of 52 and all related properties on the blackjack ', () => {
    const testGame = new blackJack();
    const game1 = {
      sum: 0,
  cards: [],
  hasBlackJack: false,
  isAlive: false,
  message: '',
  deck: [
    'Ace',  'Ace',  'Ace',   'Ace',   2,       2,
    2,      2,      3,       3,       3,       3,
    4,      4,      4,       4,       5,       5,
    5,      5,      6,       6,       6,       6,
    7,      7,      7,       7,       8,       8,
    8,      8,      9,       9,       9,       9,
    10,     10,     10,      10,      'Jack',  'Jack',
    'Jack', 'Jack', 'Queen', 'Queen', 'Queen', 'Queen',
    'King', 'King', 'King',  'King'
  ]
    }
    expect(testGame).toEqual(game1)
    expect(testGame.deck.length).toBe(52)
  });
});

describe('getCard', () => {
  it('should return a random card', () => {
    const testGame = new blackJack();
    testGame.startGame()

    expect(testGame.cards.length).toBe(2);
  });
  it('should return a string or number', () => {
    const testGame = new blackJack();
    testGame.startGame()
    expect(typeof testGame.cards[0]).toMatch(/^(string|number)$/);
  });
} );



describe('getCardValue', () => {
  it('should return value of 10 when dealt with "Jack"', () => {
    const testGame = new blackJack();
    
    expect(testGame.getCardValue('Jack')).toBe(10);
  });
  
  it('should return value of 10 when dealt with "Queen"', () => {
    const testGame = new blackJack();
    expect(testGame.getCardValue('Queen')).toBe(10);
  });
  it('should return value of 1 or 11 when dealt with "Ace"', () => {
    const testGame = new blackJack();
    let value = [1, 11];
    expect(value).toContain(testGame.getCardValue('Ace'));
  });
} );

describe("startGame", () => {
  it("should set the isAlive property to true", () => {
    const testGame = new blackJack();
    testGame.startGame();
    expect(testGame.isAlive).toBe(true);
  });

  it("should deal two cards to the player", () => {
    const testGame = new blackJack();
    testGame.startGame();
    expect(testGame.cards.length).toBe(2);
  });

  it("should calculate the sum of the two cards dealt", () => {
    const testGame = new blackJack();
    testGame.startGame();
    // console.log(testGame.cards)
    // console.log(testGame.sum)
    testGame.getCardValue()
    
    expect(testGame.sum).toEqual(
      testGame.getCardValue(testGame.cards[0]) +
        testGame.getCardValue(testGame.cards[1])
    );
  });

  describe("getsSum", () => {
    it("should calculate the sum of all the cards in the cards array", () => {
      const testGame = new blackJack();
      testGame.getAceValue()
      testGame.cards = ["Ace", "Ace", "Ace"];
      const sum = testGame.getsSum();
      expect(sum).toEqual(13);
    });
  
    it("should return the correct sum", () => {
      const testGame = new blackJack();
      testGame.getAceValue()
      testGame.cards = ["Ace", 10];
      const sum = testGame.getsSum();
      expect(sum).toEqual(21);
    });
  });

  describe("getAceValue", () => {
    it("should return 11 if the sum of the cards is less than or equal to 10", () => {
      const testGame = new blackJack();
      const sum = 10;
      const aceValue = testGame.getAceValue(sum);
      expect(aceValue).toEqual(11);
    });
  
    it("should return 1 if the sum of the cards is greater than 10", () => {
      const testGame = new blackJack();
      const sum = 11;
      const aceValue = testGame.getAceValue(sum);
      expect(aceValue).toEqual(1);
    });
  });

  describe("newCard", () => {
    it("should add a new card to the cards array if the game is in progress", () => {
      const testGame = new blackJack();
      testGame.isAlive = true;
      testGame.hasBlackJack = false;
      testGame.newCard();
      expect(testGame.cards.length).toBe(1);
    });
  
    it("should not add a new card if the game is not in progress", () => {
      const testGame = new blackJack();
      testGame.isAlive = false;
      testGame.hasBlackJack = false;
      testGame.newCard();
      expect(testGame.cards.length).toBe(0);
    });
  
    it("should call the renderGame method", () => {
      const testGame = new blackJack();
      testGame.isAlive = true;
      testGame.hasBlackJack = false;
      jest.spyOn(testGame, "renderGame");
      testGame.newCard();
      expect(testGame.renderGame).toHaveBeenCalled();
    });
  });

  describe("isBust", () => {
    it("should return true if the sum of the cards is greater than 21", () => {
      const testGame = new blackJack();
      testGame.sum = 22;
      const result = testGame.isBust();
      expect(result).toBe(true);
    });
  
    it("should return false if the sum of the cards is less than or equal to 21", () => {
      const testGame = new blackJack();
      testGame.sum = 21;
      const result = testGame.isBust();
      expect(result).toBe(false);
    });
  });

  describe("isBlackjack", () => {
    it("should return true if the hasBlackJack property is true", () => {
      const testGame = new blackJack();
      testGame.hasBlackJack = true;
      const result = testGame.isBlackjack();
      expect(result).toBe(true);
    });
  
    it("should return false if the hasBlackJack property is false", () => {
      const testGame = new blackJack();
      testGame.hasBlackJack = false;
      const result = testGame.isBlackjack();
      expect(result).toBe(false);
    });
  });

  describe("stand", () => {
    it("should set the isAlive property to false", () => {
      const testGame = new blackJack();
      testGame.isAlive = true;
      testGame.stand();
      expect(testGame.isAlive).toBe(false);
    });
  
    it("should set the message property to 'Stand, no more cards ' ", () => {
      const testGame = new blackJack();
      testGame.stand();
      expect(testGame.message).toBe("Stand, no more cards ");
    });
  });

  describe("renderGame", () => {
    it("should set the message property to 'You are out of the game!' if the isBust method returns true", () => {
      const testGame = new blackJack();
      jest.spyOn(testGame, "isBust").mockReturnValue(true);
      testGame.renderGame();
      expect(testGame.message).toBe("You are out of the game!");
    });
  
    it("should set the message property to 'You've got Blackjack!' if the isBlackjack method returns true", () => {
      const testGame = new blackJack();
      jest.spyOn(testGame, "isBlackjack").mockReturnValue(true);
      testGame.renderGame();
      expect(testGame.message).toBe("You've got Blackjack!");
    });
  
    it("should set the message property to 'Do you want to draw a new card?' if the game is in progress", () => {
      const testGame = new blackJack();
      testGame.isAlive = true;
      testGame.hasBlackJack = false;
      testGame.renderGame();
      expect(testGame.message).toBe("Do you want to draw a new card?");
    });
  });

});