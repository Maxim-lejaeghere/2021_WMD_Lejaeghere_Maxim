 let cards = [0,0,0,0,0,0,0,0,0,0];
 let redcard = Math.floor(Math.random() * 11); 
 cards[redcard] = 1;
 let chosenCard = 0;


while(chosenCard == 0){
let firstOrLastCard = prompt('(E)erste of (L)aatste kaart');

if (firstOrLastCard == 'E'){
chosenCard = cards.shift();	
};
if (firstOrLastCard == 'L'){
chosenCard = cards.pop();	
};
};

alert('je hebt verloren, ververs de browser');
