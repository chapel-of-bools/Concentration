var cardArray = ['A','A','B','B','C','C','D','D','E','E', 'F', 'F'];
var cardValues = [];
var cardIds = [];
var cardsFlipped = 0;
Array.prototype.shuffle = function(){
  var i = this.length, j, temp;
  while (--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}
function newBoard(){
  cardsFlipped = 0;
  var output = " ";
  cardArray.shuffle();
  for(var i = 0; i < cardArray.length; i++){
		output += '<div id="tile_'+i+'" onclick="flipTile(this,\''+cardArray[i]+'\')"></div>';
    $("#board").html(output);
  }
}
function flipTile(tile,val){
	if(tile.innerHTML == "" && cardValues.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(cardValues.length == 0){
			cardValues.push(val);
			cardIds.push(tile.id);
		} else if(cardValues.length == 1){
			cardValues.push(val);
			cardIds.push(tile.id);
			if(cardValues[0] == cardValues[1]){
				cardsFlipped += 2;
				// Clear both arrays
				cardValues = [];
            	cardIds = [];
				// Check to see if the whole board is cleared
				if(cardsFlipped == cardArray.length){
					alert("Board cleared... generating new board");
					document.getElementById('board').innerHTML = "";
					newBoard();
				}
			} else {
				function flipBack(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(cardIds[0]);
				    var tile_2 = document.getElementById(cardIds[1]);
				    tile_1.style.background = 'black no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'black no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    cardValues = [];
            	    cardIds = [];
				}
				setTimeout(flipBack, 1000);
			}
		}
	}
}
