/*
 * Create a list that holds all of your cards
 */

const allCards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bomb", "bicycle", ];

const doubleAllCards = allCards.concat(allCards);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
const deck = document.getElementById("deck");
const card = document.querySelectorAll(".card");
let cardsOpen;

/* Function to display the cards when the page loads */
function displayCards() {
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.childNodes[0]);
    }
    
    shuffle(doubleAllCards);
    const docFrag = document.createDocumentFragment(); 
    for(let card of doubleAllCards) {
        const newList = document.createElement("li");
        newList.classList.add("card", "open")
        newList.innerHTML = '<div class="front"><i class="fa fa-' + card + '"></i></div><div class="back"></div>'
        docFrag.appendChild(newList);
    }
    deck.appendChild(docFrag);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

/* Function to flip the card over */
function removeCards(open) {
    open = document.querySelectorAll(".card");
    open.forEach(card => {
        card.classList.remove("open")
        card.classList.add('flip');
    })
}

displayCards();

/*Flips the card over after a certain amount of time */
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
    if(evt.target.nodeName === 'DIV') {
        //console.log("clicked");
        displaySymbol(evt);
        //addOpenCards(evt);
        matchOpenCards();
        starRating();
        checkAllMatch();
    }
});

//function to display symbol
function displaySymbol(evt) {
    const clickedCard = evt.target;
    clickedCard.parentNode.classList.add("open");
    clickedCard.parentNode.classList.remove("flip");
}



function matchOpenCards(){
    let openCards = document.querySelectorAll(".open")
    if(openCards.length > 1){
        if(openCards[0].innerHTML !== openCards[1].innerHTML){
            nonMatchingCards(openCards);
        } else {
            matchingCards(openCards);
        }
        incrementCounter(openCards)
        openCards = [];

    }   
}


function matchingCards(open) {
    open.forEach( card => {
        card.classList.add('match');
        card.classList.remove("open");
    });
}

//Functon to add a class to classses when they don't match and flip them back
function nonMatchingCards( open ){
    
    open.forEach( card => {
        card.classList.add('non-match');
        setTimeout(()=> {
            card.classList.add('flip');
            card.classList.remove("open", "non-match")
            
        }, 1000)
    })
    
	
}

//Increments the counter evwerytime somwone makes two moves
function incrementCounter(openCards) {
    // let openCards = document.querySelectorAll(".open");
    if (openCards.length === 2) {
        let counter = document.querySelector(".moves").textContent;
        counter = parseInt(counter) + 1;
        document.querySelector(".moves").textContent = counter;
    
    }
}

//Checks if all the cards are matched, adds the matched class to them then displays end message
function checkAllMatch() {
    const matchedCard = document.querySelectorAll(".match");
    const numStars = document.querySelectorAll(".fa-star").length;
    const counter = document.querySelector(".moves").textContent;
    const timing = document.querySelector("#timing");
    const time = timing.textContent;
    if (matchedCard.length === 16) {
        const deck = document.querySelector("#deck");
        deck.remove();
        const docFrag = document.createDocumentFragment();
        const newDiv = document.createElement("div");
        newDiv.classList.add("end-msg");
        newDiv.innerHTML = `<i class="fa fa-check"></i><br><h>Congratulations! You won!</h><p>You won with ${counter} moves and ${numStars}  stars. Time: ${time} </p><div>Name: <input type="text" id="name"><input type="button" value="Save" onclick="save()"></div><button id="end-btn">Play Again</button>`;
        docFrag.appendChild(newDiv);
        const firstElement = document.body.childNodes[2];
        document.body.insertBefore(docFrag, firstElement);
        clearTimeout(t)
    }
}

//Function to handle what happens when the play again
playAgain = document.getElementById("end-btn");

document.addEventListener("click", function(evt) {
    if(evt.target && evt.target.id== 'end-btn') {
        const endMessage = document.querySelector(".end-msg");
        if(endMessage) {
            endMessage.remove();
        }
        const deck = document.querySelector("#deck");
        if(deck) {
            deck.remove();
        }
        const createDesk = document.createElement("ul");
        const container = document.querySelector(".container");
        createDesk.setAttribute("id", "deck");
        shuffle(doubleAllCards); 
        for(let card of doubleAllCards) {
            const newList = document.createElement("li");
            newList.classList.add("card", "open")
            newList.innerHTML = '<div class="front"><i class="fa fa-' + card + '"></i></div><div class="back"></div>'
            createDesk.appendChild(newList);
        }
        //deck = document.querySelector("#desk");
        container.appendChild(createDesk);
        //console.log(deck.innerHTML);
        reloadGame();
        createDesk.addEventListener("click", function handleCardClick(evt){
            if(evt.target.nodeName === 'DIV') {
                const deck = document.querySelector("#deck");
                deck.addEventListener("click", timerControl);
                console.log("clicked");
                displaySymbol(evt);
                matchOpenCards();
                starRating();
                checkAllMatch();
            }
        });
    }
});


const restart = document.querySelector(".restart");
//This function runs when the restart button is clicked.
restart.addEventListener("click", function resetGame() {
    displayCards();
    reloadGame();
});


//Function that reloads the game and moves to default settings.
function reloadGame() {
    setTimeout(() => {
        removeCards(cardsOpen)
    }, 5000); 
    let counter = document.querySelector(".moves");
    counter.textContent = 0;
    resetTime();
    refreshStars();
}

//Function to reduce the number of stars according to moves.
function starRating() {
    let counter = document.querySelector(".moves").textContent;
    const stars = document.querySelectorAll(".star");
    counter = parseInt(counter);
    if(counter === 2) {
        stars[2].classList.remove("fa-star");
        stars[2].classList.add("fa-star-o");
    } else if(counter === 4) {
        stars[1].classList.remove("fa-star");
        stars[1].classList.add("fa-star-o");
    }
}

// Function to reset the number of stars to 3.
function  refreshStars() {
    const numStars = document.querySelectorAll(".star");
	for(let star of numStars) {
		star.classList.remove("fa-star-o");
		star.classList.add("fa-star");
    }
}




