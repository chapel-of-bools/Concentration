var cardArray = ['bt.jpg','bt.jpg','btilc.jpg','btilc.jpg','dp.jpg','dp.jpg','efny.jpg','efny.jpg','h8.jpg','h8.jpg','tt.jpg','tt.jpg']
var cardValues = [];
var cardIds = [];
var cardsFlipped = 0; // Could make card its own object instead of repeating
// Shuffle function
// You don't really need this comment, or the others saying what the functions do, because you named the functions well.
// If a function's called "newBoard", I have a pretty good idea of what it does! :)

// Generally it's considered bad practice to add methods directly to built-in Javascript objects like this
// For something very general with widespread applications like `shuffle` I think it's fine. But I wouldn't make a habit of it.
Array.prototype.shuffle = function(){
  var i = this.length, j, temp;
  while (--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}
// New board function
function newBoard(){
  cardsFlipped = 0;
  var output = " ";
  cardArray.shuffle();
  for(var i = 0; i < cardArray.length; i++){
    output += '<div><img id="card_'+i+'" style="opacity:0" src="'+cardArray[i]+'" onclick="flipCard(this, \'' + cardArray[i] + '\')" /></div>';
    $("#board").html(output);
  }
}
// Card Flipping
function flipCard(card,val){
  if(card.style.opacity == 0 && cardValues.length < 2){
    card.style.opacity = 1;
    if(cardValues.length == 0){
      cardValues.push(val);
      cardIds.push(card.id);
    } else if(cardValues.length == 1){
      cardValues.push(val);
      cardIds.push(card.id);
      if(cardValues[0] == cardValues[1]){
        cardsFlipped += 2;
        // Clear both arrays
        cardValues = [];
        cardIds = [];
        // Check to see board is cleared
        if(cardsFlipped == cardArray.length){
          alert("You win! Let's play again!"); //I think you should put "Congratulations" in this alert
          $("#board").html("");
          newBoard();
        }
      } else {
          // It's considered bad practice to declare functions inside an `if/else`. Move this out to the root level of your app.
        function flipBack(){
          // Flip the 2 tiles back over
          var card_1 = document.getElementById(cardIds[0]);
          var card_2 = document.getElementById(cardIds[1]);
          card_1.style.opacity = 0;
          card_2.style.opacity = 0;
          // Clear both arrays
          cardValues = [];
          cardIds = [];
        }
        setTimeout(flipBack, 500);
      }
    }
  }
}
