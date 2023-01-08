# Blackjack game in OOP 





## Summary:

This is the blackjack game made with OOP. It is only the game logics and methods to satisfies the scenarios provided, with Jest for unit testing.


### Link to clone the repo locally:

In the terminal
```
$ git clone https://github.com/Jasbox/BlackJackOOP.git
```


## Setup

### To install the dependencies:

In the terminal
```
$ npm install
```


### To run the test suites:
In the terminal
```
npm test
```

### To run the app test alone:
In the terminal
```
npm test index.test.js
```

##  Scenarios

Model on a single deck of 52 cards:
Number cards are worth their face value (2-10) 
Jacks, queens, and kings are worth 10 each
Aces are worth either 1 or 11 (player chooses)
The suit of the card does not matter.

The player is initially dealt two cards. They may then choose to 'hit' (draw a card) or 'stand' (stop drawing cards.) If they 'hit', then the new card's value is added to the hand total. If this total exceeds 21, the player is 'bust', and loses. 

Given I play a game of blackjack
When I am dealt my opening hand
Then I have two cards

Given I have a valid hand of cards
When I choose to 'hit'
Then I receive another card
And my score is updated

Given I have a valid hand of cards
When I choose to 'stand'
Then I receive no further cards
And my score is evaluated

Given my score is updated or evaluated
When it is 21 or less
Then I have a valid hand

Given my score is updated
When it is 22 or more 
Then I am 'bust' and do not have a valid hand

Given I have a king and an ace
When my score is evaluated
Then my score is 21

Given I have a king, a queen, and an ace
When my score is evaluated
Then my score is 21

Given that I have a nine, an ace, and another ace
When my score is evaluated
Then my score is 21