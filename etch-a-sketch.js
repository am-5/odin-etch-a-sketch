// Create a 16x16 grid of square divs inside container div
// Likely make a for loop to make 16x16 divs

let grid = []; // //grid[i][j] represents a "square" div inside a "row" div at index i, j.
let rows = []; // Holds references to "row" divs. 
const gridInput = document.querySelector("#gridSizeInput");
const gridButton = document.querySelector("#gridButton");
const gridSizeDisplay = document.querySelector("#gridSize");
const containerDiv = document.querySelector(".container");

let ROWS = 16;
let COLUMNS = 16;

function updateGridSizeDisplay(){
    gridSizeDisplay.textContent = ROWS + "x" + COLUMNS;
}

function createRowDiv(){
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    return rowDiv;
}

function getSquareColor(rowIndex) {
    return rowIndex % 2 === 0 ? "red" : "purple";
}

function createSquareDiv(rowIndex, colIndex) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    //squareDiv.textContent = rowIndex * COLUMNS + colIndex;
    //squareDiv.style.backgroundColor = getSquareColor(rowIndex);
    return squareDiv;
}

function createGrid() {
    for (let i = 0; i < ROWS; i++) {
        const rowDiv = createRowDiv();
        const row = []; // Array to hold "square" divs
        rows[i] = rowDiv;

        for (let j = 0; j < COLUMNS; j++) {
            const squareDiv = createSquareDiv(i, j);

            row[j] = squareDiv;
            rowDiv.appendChild(squareDiv); // For displaying in DOM
        }

        grid[i] = row;
        containerDiv.appendChild(rowDiv); 
    }
    
    updateGridSizeDisplay();
}


function getHumanChoice(){
    return Number(gridInput.value);
}

gridButton.addEventListener("click", () => {
    const humanChoice = getHumanChoice();

    if(Number.isInteger(humanChoice) && humanChoice >= 10 && humanChoice <= 100){
        ROWS = humanChoice; 
        COLUMNS = humanChoice;

        for(const row of rows){
            row.remove(); //Removes "row" divs and "square" divs from DOM
        }
        rows = []; // removes stale references from memory
        grid = [];

        createGrid();
    }
    else{
        alert("Please enter a valid number between 10 to 100.")
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
            target.setAttribute("style", "background-color:hsl(0 0% 26.1%)");
            break;
    }
});

function main(){
    createGrid();
}

main();