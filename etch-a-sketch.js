// ----- Constants & DOM Elements -----
const containerDiv = document.querySelector(".container");
const gridInput = document.querySelector("#gridSizeInput");
const gridButton = document.querySelector("#gridButton");
const gridSizeDisplay = document.querySelector("#gridSize");
const darkerBackgroundColor = 'hsl(0 0% 26.1%)';

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
    //squareDiv.textContent = rowIndex * COLUMNS + colIndex;
    //squareDiv.style.backgroundColor = getSquareColor(rowIndex);
    squareDiv.dataset.opacity = 0; // initial opacity
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

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); // 0–255
    const g = Math.floor(Math.random() * 256); // 0–255
    const b = Math.floor(Math.random() * 256); // 0–255

    return `rgb(${r}, ${g}, ${b})`;
}

function increaseOpacity(opacity){
    if(opacity < 1){
        return opacity + .10;
    }
    return 1;
}

// ----- Event Handlers -----
gridButton.addEventListener("click", () => {
    const humanChoice = getHumanChoice();

    if(Number.isInteger(humanChoice) && humanChoice >= 1 && humanChoice <= 100){
        ROWS = humanChoice; 
        COLUMNS = humanChoice;

        // Clear old grid
        containerDiv.replaceChildren(); // Removes divs from DOM
        rows = []; // Removes stale references from memory
        grid = [];

        createGrid();
    }
    else{
        alert("Please enter a whole number between 1 and 100.")
    }
});


containerDiv.addEventListener('mouseover', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'square':
            const randomColor = getRandomRGB();
            const currentOpacity = parseFloat(target.dataset.opacity);
            const newOpacity = increaseOpacity(currentOpacity);

            // Apply new styles
            target.style.backgroundColor = randomColor;
            target.style.opacity = newOpacity;

            // Update dataset for future increments
            target.dataset.opacity = newOpacity;
            break;
    }
});

containerDiv.addEventListener('mouseout', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'square':
            break;
    }
});

function main(){
    createGrid();
}

main();