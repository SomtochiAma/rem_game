
//const gameDetails = [];
//localStorage.setItem("gameDetails", JSON.stringify(gameDetails))
function save() {
    console.log("save");
    let playerName = document.getElementById("name").value;
    let counter = document.querySelector(".moves").textContent;
    const playerDetails = {
        name: playerName, 
        moves: counter
    }
    // let gameDetails = JSON.parse(localStorage.getItem("gameDetails"))
    let gameDetails
    let dummyDetails = JSON.parse(localStorage.getItem("game_details"))
    if(dummyDetails === null){
        gameDetails = []
        //do something
    }else{
        gameDetails = dummyDetails
    }
    gameDetails.push(playerDetails)
    localStorage.setItem("game_details", JSON.stringify(gameDetails))


    console.log(gameDetails)
    
    // gameDetails.push(playerDetails)
    // localStorage.setItem("Player's Name", playerName);
}

const leaderboard = document.querySelector("#leaderboard");
leaderboard.addEventListener("click", function() {
    modalBody = document.querySelector(".modal-body");
    while(modalBody.hasChildNodes()) {
        modalBody.removeChild(modalBody.childNodes[0]);
    }
    let newGameDetails = JSON.parse(localStorage.getItem("game_details"))
    displayPlayers(newGameDetails);
});

function compareValues(key, order='asc') {
    return function(a, b) {
        if(!a.hasOwnProperty(key) || 
        !b.hasOwnProperty(key)) {
            return 0; 
        }
        
        const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
        
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? 
            (comparison * -1) : comparison
        );
    };
}

function displayPlayers(sortedArr) {
    modalBody = document.querySelector(".modal-body");
    const docFrag = document.createDocumentFragment();
    let i = 1;
    for(let obj of sortedArr) {
        
            const createPara = document.createElement("p");
            createPara.textContent = `${i} ${obj.name} moves: ${obj.moves}`;
            docFrag.appendChild(createPara);
        
        i++;
    }
    modalBody.appendChild(docFrag);
}








