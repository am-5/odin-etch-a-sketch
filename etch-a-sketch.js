// ----- Constants & DOM Elements -----
const containerDiv = document.querySelector(".container");
const gridInput = document.querySelector("#gridSizeInput");
const gridButton = document.querySelector("#gridButton");
const gridSizeDisplay = document.querySelector("#gridSize");

let ROWS = 16;
let COLUMNS = 16;

let grid = []; // 2D array of squares
let rows = []; // Array of row divs

// ----- Helper Functions -----

// Update the displayed grid size in #gridSize span
function updateGridSizeDisplay(){
    gridSizeDisplay.textContent = ROWS + "x" + COLUMNS;
}

// Create a div with the class "row"
function createRowDiv(){
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    return rowDiv;
}

// For setting the square color upon creation - for debugging only
function getSquareColor(rowIndex) {
    return rowIndex % 2 === 0 ? "red" : "purple";
}

// Create a div with the class "square"
function createSquareDiv(rowIndex, colIndex) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.textContent = rowIndex * COLUMNS + colIndex;
    //squareDiv.style.backgroundColor = getSquareColor(rowIndex);
    return squareDiv;
}

// Build the full grid and attach to DOM
function createGrid() {
    for (let i = 0; i < ROWS; i++) {
        const rowDiv = createRowDiv();
        const rowArr = []; // Array to hold "square" divs

        for (let j = 0; j < COLUMNS; j++) {
            const squareDiv = createSquareDiv(i, j);

            rowArr[j] = squareDiv;
            rowDiv.appendChild(squareDiv); // Attach to square to row div
        }

        rows.push(rowDiv);
        grid.push(rowArr);
        containerDiv.appendChild(rowDiv);  // Attach row to DOM
    }
    
    updateGridSizeDisplay();
}

function getHumanChoice(){
    return Number(gridInput.value);
}

function getRandomHSL() {
    const hue = Math.floor(Math.random() * 360);         // 0–359
    const saturation = Math.floor(Math.random() * 101);  // 0–100%
    const lightness = Math.floor(Math.random() * 101);   // 0–100%
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// ----- Event Handlers -----
gridButton.addEventListener("click", () => {
    const humanChoice = getHumanChoice();

    if(Number.isInteger(humanChoice) && humanChoice >= 10 && humanChoice <= 100){
        ROWS = humanChoice; 
        COLUMNS = humanChoice;

        // Clear old grid
        containerDiv.replaceChildren();
        rows = []; // removes stale references from memory
        grid = [];

        createGrid();
    }
    else{
        alert("Please enter a whole number between 10 and 100.")
    }
});


containerDiv.addEventListener('mouseover', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'square':
            target.setAttribute("style", "background-color:black");
            break;
    }
});

containerDiv.addEventListener('mouseout', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'square':
            const randomColor = getRandomHSL();
            target.setAttribute("style", "background-color:" + randomColor);
            break;
    }
});

function main(){
    createGrid();
    grid[0][5].textContent = '1';
}

main();