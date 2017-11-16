# Table of content

# General stuff
- Coinche requires 4 players
- There is two team of 2 players
- each player plays with the opposite player

# Card-related objects

## Card
A card is identified `color` and a `? number ?`: for instance the `8 of spades`.

### Card orders
Card order when  `no-trumps`:
1 > 10 > K > Q > J > 9 > 8 > 7
1 > 10 > K > Q > J > 9 > 8 > 7

Card order in `trumps`:
J > 9 > 1 > 10 > K > Q > 8 > 7

### Card values
|card value|no-trump|trump|
|---|---|---|
|7|0|0|
|8|0|0|
|9|0|14|
|J|2|20|
|Q|3|3|
|K|4|4|
|10|10|10t]|
|1|11|11|

### Suits
|french|english
|---|---|
|spades|pique|
|heart|coeur|
|diamonds|carreau|
|clubs|trefle|

## Deck
A deck is made `32` cards: the `8` values versus the `4` colors.

# Game objects


a `trick` is done when all 4 players uses a card.

a `round` is made of 8 `tricks`

a `game` is made of a certain number of `rounds`
- each rounds give points
- a game is won when one team gathers enough points

we can image to loop on several games and hope to be the first to win 2, or 3 games.

# Steps for one round
## Step 0
The last first player is now dealer. The one next to him is the `first player`.
If it is the start of the first game, we randomly chose the first dealer.

## Step 1: announce
The idea here is to elect a color as `trump` for the ongoing round.

Starting with the first player, each player one after another can either:
- `announce`, but more than the previous value (starting at 80)
- `pass` saying,
- `coinche`: this stops the step, elects the previous announce as trump, and will make double poitns.

This step stops either:
- when all 4 players `passed`
- when one `announced` and the next 3 `passed`
- one `coinched`

## Step 2: play cards
We repeat 8 `tricks`:
- the player who won the last `trick` should start. (if it is the first trick, then it is the first player).
- the next 3 players one after another plays a card

## Step 3: count points
- each team counts how many points they made with the `tricks` they won.
- the team who win the `announce step` must have more or equals the amount they announced in the step 1. If they have less, the other team wins.
- the winning team wins equal the amount defined during the announce.

# Game rules
- first player to play can choose whatever he wwants. This decides the `chosen color` for the current `trick`
- at my turn, if i have cards of the `chosen color`, then i HAVE TO play `chosen color`.
- If the `chosen color` is the `trump`, all players `HAVE TO` play a card of bigger value if they can.
- if the `chosen color` is the trump, then, i HAVE TO play BIGGER card than the current biggest one if i have trump and can play bigger.
- if a i have not the `chosen color` but i have trumps, i have to play trumps
- if my partner is `currently winning` (= if the trick was to be finished now, who would win?)the trick, and that i do not have the `chosen color`, then i can play whatever card i want
- if a color is played, one play trumps, and i have not the initial color, then i have to play trumps to
## Specifications of the "what can i play" part

## Specifications of the "who wins the trick" part
the winner is:
- either the one to have the biggest trump.
- or if there is no trump, the one to have the biggest card of the `chosen color`
