/*
 * Create a list that holds all of your cards
 */

 const allCards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bomb", "bicycle", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bomb", "bicycle", ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.getElementById("deck");
const card = document.querySelectorAll(".card");

function displayCards() {
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.childNodes[0]);
    }
    console.log(deck.innerHTML)
    shuffle(allCards);
    const docFrag = document.createDocumentFragment();
    const newList = document.createElement("li"); 
    newList.classList.add("card");
    for(let card of allCards) {
        const newList = document.createElement("li");
        newList.classList.add("card");
        newList.innerHTML = '<i class="fa fa-' + card + '"></i>'
        docFrag.appendChild(newList);
    }
    deck.appendChild(docFrag);
    console.log(deck.innerHTML);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

displayCards();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener("click", function handleCardClick(evt){
    displaySymbol(evt);

});

//fumction to display symbol
function displaySymbol(evt) {
    const clickedCard = evt.target;
    clickedCard.classList.add("open", "show");
    //console.log(clickedCard)
}

openCards = [];






 





