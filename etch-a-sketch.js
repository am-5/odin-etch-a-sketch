// Create a 16x16 grid of square divs inside container div
// Likely make a for loop to make 16x16 divs

let grid = []; // Array for holding grid which will hold columns
const containerDiv = document.querySelector(".container");
const ROWS = 16;
const COLUMNS = 16;
const AREA = ROWS * COLUMNS;

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

//grid[i][j] represents a "square" div inside a "row" div at index i, j.
for(let i = 0; i < ROWS; i++){
    const rowDiv = createRowDiv();
    const row =[]; // Array to hold a row of divs

    for (let j = 0; j < COLUMNS; j++){
        const squareDiv = createSquareDiv(i, j);

        row.push(squareDiv);
        rowDiv.appendChild(squareDiv); 
    }

    grid.push(row);
    containerDiv.appendChild(rowDiv);
}



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