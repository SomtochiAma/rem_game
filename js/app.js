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
let cardsOpen;

function displayCards() {
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.childNodes[0]);
    }
    //console.log(deck.innerHTML)
    shuffle(allCards);
    const docFrag = document.createDocumentFragment();
    // newList.classList.add("card");
    // const newList = document.createElement("li"); 
    for(let card of allCards) {
        const newList = document.createElement("li");
        newList.classList.add("open","card", "show")
        newList.innerHTML = '<i class="fa fa-' + card + '"></i>'
        docFrag.appendChild(newList);
    }
    deck.appendChild(docFrag);
    // console.log(deck.innerHTML);
}

 function removeCards(open) {
    open = document.querySelectorAll(".open");
     open.forEach(card => {
         card.classList.remove('open', 'show')
     })
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
setTimeout(() => {
    removeCards(cardsOpen)
}, 5000);

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
    addOpenCards(evt);
    matchOpenCards();
    checkAllMatch();
});

//function to display symbol
function displaySymbol(evt) {
    const clickedCard = evt.target;
    clickedCard.classList.add("open", "show");
    //console.log(clickedCard)
}


function addOpenCards(evt) {
    const openCards = [];
    const clickedCard= evt.target       
    const allCardArray = clickedCard.firstElementChild.className.split(" ");
    const cardArray = allCardArray[1].split("-");
    const specificCard = cardArray[1];
    openCards.push(specificCard);
    // console.log(openCards);
}

function matchOpenCards(){
    let openCards = document.querySelectorAll(".open")
    if(openCards.length > 1){
        if(openCards[0].innerHTML !== openCards[1].innerHTML){
            nonMatchingCards(openCards)
            incrementCounter(openCards)
            openCards = [];
            // console.log(openCards)
            
            
        } else {
            matchingCards(openCards)
            incrementCounter(openCards)
            openCards = []
        }
    }
    
    
}


function matchingCards(open) {
    open.forEach( card => {
        card.classList.add('match');
        card.classList.remove("open");
    })
    
    
}

function nonMatchingCards( open ){
    
    open.forEach( card => {
        card.classList.add('non-match');
        
        setTimeout(()=> {
            card.classList.remove("open", "show", "non-match")
            
        }, 1000)
    })
    
	
}

function incrementCounter(openCards) {
    // let openCards = document.querySelectorAll(".open");
    if (openCards.length === 2) {
        let counter = document.querySelector(".moves").textContent;
        console.log(counter);
        counter = parseInt(counter) + 1;
        // console.log(`this is the new ${counter}`)
        document.querySelector(".moves").textContent = counter;
    
        // incrementCounter(openCards)
    
    }
}

function checkAllMatch() {
    const matchedCard = document.querySelectorAll(".match");
    if (matchedCard.length === 16) {
        console.log("All Matched!")
    }
}






