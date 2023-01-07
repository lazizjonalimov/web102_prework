/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// const scores = [22, 54, 76, 92, 43, 33];

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// alert("LDKD");
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    for (let i = 0; i < games.length; i++) {
        console.log(games[i]);

        // create a new div element, which will become the game card
        let div = document.createElement('div');

        let img_source = games[i].img;

        // add the class game-card to the list
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game -> Make sure to give the image the class game-img.
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const HTMLContentToAppend = `
            <p>
            <img src= "${img_source}" alt="${games[i].name}" class="game-img">
            </p>
            <p class='game_names'>${games[i].name}</p>
            <p> ${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>`;

        div.innerHTML = HTMLContentToAppend

        // append the game to the games-container
        gamesContainer.appendChild(div);     
    }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
let list_of_games = addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// 11 times loop

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// const currentValue = GAMES_JSON.backers
// const acc = 0;

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc += game.backers
}, 0);

// console.log(totalContributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerText = totalContributions.toLocaleString('en-US');



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc += game.pledged
}, 0);

// set inner HTML using template literal
raisedCard.innerText = "$" + totalRaised.toLocaleString('en-US');


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc += 1
}, 0);

// set inner HTML using template literal
gamesCard.innerText = totalGames.toLocaleString('en-US');


console.log(gamesContainer);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)

    // console.log(unfundedGames)
}

// filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
      });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(unfundedGames)

}
// filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter((game) => {
    return game.goal > game.pledged;
  });
console.log(unfundedGames.length)


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${unfundedGames.length} games remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let paragraph = document.createElement('p');
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...rest] = sortedGames;
console.log(firstGame);
console.log(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
let nameTopGame = firstGame.name;
let headTopGame = document.createElement('p');
headTopGame.innerHTML = nameTopGame;
firstGameContainer.appendChild(headTopGame);

// do the same for the runner up item
let name2TopGame = secondGame.name;
let head2TopGame = document.createElement('p');
head2TopGame.innerHTML = name2TopGame;
secondGameContainer.appendChild(head2TopGame);
