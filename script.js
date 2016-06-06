var cardArray = ['A','A','B','B','C','C','D','D','E','E','F','F'];
var cardValues = [];
var cardIds = [];
var cardsFlipped = 0;
// Shuffle function
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
    output += '<div id="card_'+i+'" onclick="flipCard(this,\''+cardArray[i]+'\')"></div>';
    $("#board").html(output);
  }
}
// Card Flipping
function flipCard(card,val){
  if(card.innerHTML == "" && cardValues.length < 2){
    card.style.background = "white";
    card.innerHTML = val;
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
        // Check to see if the whole board is cleared
        if(cardsFlipped == cardArray.length){
          alert("You win! Let's play again!");
          $("#board").html("");
          newBoard();
        }
      } else {
        function flipBack(){
          // Flip the 2 tiles back over
          var card_1 = document.getElementById(cardIds[0]);
          var card_2 = document.getElementById(cardIds[1]);
          card_1.style.background = 'black no-repeat';
          card_1.innerHTML = "";
          card_2.style.background = 'black no-repeat';
          card_2.innerHTML = "";
          // Clear both arrays
          cardValues = [];
          cardIds = [];
        }
        setTimeout(flipBack, 500);
      }
    }
  }
}
