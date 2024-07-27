let columns
function createGrid(cells, classAdd="") {
    columns = [];
    gridContainer.innerHTML = "" 
    let row;
    let col;
    // Create 16 rows intially
    for (let i = 0; i < cells; i++) {
        row = document.createElement("div");
        row.classList = "grid";

        // Create 16 rows intially
        for (let j = 0; j < cells; j++) {
            col = document.createElement("div");
            col.classList = `grid col ${classAdd}`;
            columns.push(col);
            row.appendChild(col);
        }
        gridContainer.appendChild(row);
    }
}
function drag(e) {
    let position = +window.getComputedStyle(gridSizeBtn).left.slice(0,-2);
    if (position < 99 && e.movementX > 0 && e.movementX > 3) {
        position = position + 5 >= 99 ? 98 : position + 5;
        gridSizeBtn.style.left = `${position + 1}px`;
        position += 1;
    }
    else if (position < 99 && e.movementX > 0) {
        gridSizeBtn.style.left = `${position + 1}px`;
        position += 1;
    }
    else if (position > 0 && e.movementX < 0 && e.movementX < -3) {
        position = position - 5 <= 0 ? 1 : position - 5;
        gridSizeBtn.style.left = `${position - 1}px`;
        position -= 1;
    }
    else if (position > 0 && e.movementX < 0) {
        gridSizeBtn.style.left = `${position - 1}px`;
        position -= 1;
    }
    
    gridSizeLabel.textContent = `Number of grids: ${position + 1}`
   
}
function color (e) {
    e.preventDefault();
    if (rainbowFlag) {
        penColor = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*11)/10})`;
    } 
    if (e.target.classList.contains("col")) {
        e.target.style.backgroundColor = penColor;
    }    
}


// Select and create containers for styling
const etchContainer = document.createElement("div");
etchContainer.classList = "etch-container container";

const gridContainer = document.querySelector("div");
const btnsContainer = document.createElement("div");
btnsContainer.classList = "btns-container container"; 

// Create draggable button for grid-size selection 
const gridSizeContanier = document.createElement("div");
gridSizeContanier.classList = "grid-size container"
gridSizeContanier.id = "grid-size";

const gridSizeBtn = document.createElement("button");
gridSizeBtn.classList = "grid-size btn drag";

const gridSizeLabel = document.createElement("label");
gridSizeLabel.for = "grid-size";
gridSizeLabel.textContent = "Number of grids: 16";
gridSizeLabel.style.marginTop = "25px"; 

const gridSizeSubmitBtn = document.createElement("button");
gridSizeSubmitBtn.textContent = "Create Grid";
gridSizeSubmitBtn.classList = "submit grid-size btn";


// Prompt grid-visibility
const visibilityContainer = document.createElement("div");
visibilityContainer.classList = "visibility";

const gridVisibility = document.createElement("input");
gridVisibility.type = "checkbox";
const gridVisibilityLabel = document.createElement("label");
gridVisibilityLabel.textContent = "Visible Grid";

visibilityContainer.appendChild(gridVisibilityLabel);
visibilityContainer.appendChild(gridVisibility);

gridSizeContanier.appendChild(gridSizeBtn);
btnsContainer.appendChild(gridSizeLabel);
btnsContainer.appendChild(gridSizeContanier);
btnsContainer.appendChild(visibilityContainer);
btnsContainer.appendChild(gridSizeSubmitBtn);

// Create standard options to use in color-picker
let pickerOpts = {
    width: 150, 
    layout: [
        { 
            component: iro.ui.Box,
            options: {wheelLightness: false}
        },
        { 
            component: iro.ui.Slider,
            options: {
              sliderType: 'hue',
            }
        },
        { 
            component: iro.ui.Slider,
            options: {
              sliderType: 'alpha',
            }
          },
      ] 
}

// Create background-color fill option
let pen = document.createElement("div");
let colorPicker = new iro.ColorPicker(pen, pickerOpts);
pen.style = "position: relative; top: 80px; left: 110px; display: none;";



const backgroundSelector = document.createElement("div");
backgroundSelector.classList = "background-color";

backgroundSelector.style.backgroundColor = "rgba(253, 249, 249, 0.5)";
const backgroundSelectorLabel = document.createElement("label");
backgroundSelectorLabel.for = "background-color";
backgroundSelectorLabel.textContent = "background color";
backgroundSelectorLabel.style.marginTop = "-20px"; 

backgroundSelector.appendChild(pen);
btnsContainer.appendChild(backgroundSelector);
btnsContainer.appendChild(backgroundSelectorLabel);

// Create pen-color fill option
let penColor = "#000000";
let pen2 = document.createElement("div");
let colorPicker2 = new iro.ColorPicker(pen2, pickerOpts);
pen2.style = "position: relative; top: 80px; left: 110px; display: none;";


const penSelector = document.createElement("div");
penSelector.classList = "pen-color";
penSelector.style.backgroundColor = penColor;
const penSelectorLabel = document.createElement("label");
penSelectorLabel.for = "pen-color";
penSelectorLabel.textContent = "pen color";
penSelectorLabel.style.marginTop = "-20px"; 

penSelector.appendChild(pen2);
btnsContainer.appendChild(penSelector);
btnsContainer.appendChild(penSelectorLabel);

// Create eraser and rainbow-pen container
const miscDiv = document.createElement("div");
miscDiv.classList = "misc-container";

// Rainbow part
const rainbowPen = document.createElement("button");
rainbowPen.classList = "misc-btn rainbow";
rainbowPen.textContent = "Rainbow pen";

// Eraser part 
const eraser = document.createElement("button");
eraser.classList = "misc-btn eraser";
eraser.textContent = "Eraser";

miscDiv.appendChild(rainbowPen);
miscDiv.appendChild(eraser);

btnsContainer.appendChild(miscDiv);

//insert btns container and grid container to body
etchContainer.appendChild(btnsContainer);
etchContainer.appendChild(gridContainer);
document.body.appendChild(etchContainer);

// Create starting grid
createGrid(16);
// Create flag for rainbow-pen functionality, true => rainbowPen 
let rainbowFlag = false;

// Listener for grid-sizing
gridSizeBtn.addEventListener("mousedown", function () {
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", () => {document.removeEventListener("mousemove", drag);});
});

// Listener for create new-grid
gridSizeSubmitBtn.addEventListener("click", () => {
    if (columns[0].classList.contains("visible")) {
        createGrid(+gridSizeLabel.textContent.split(" ")[3], "visible");
    }    
    else {
        createGrid(+gridSizeLabel.textContent.split(" ")[3]);
    }
});

// Listener for visibility toggle
gridVisibility.addEventListener("change", (e) => {
    columns.forEach((column) => column.classList.toggle("visible"));
});

// Listeners for toggling display of color-picker of background color
backgroundSelector.addEventListener("click", () => {
    pen.style.display = "flex";
        
});

backgroundSelector.addEventListener("mouseleave", ()=> {
    pen.style.display = "none";
});

// Apply selected background-color
colorPicker.on('color:change', function(color) {
    backgroundSelector.style.backgroundColor = color.rgbaString;
    gridContainer.style.backgroundColor = color.rgbaString;
});


//Listeners for toggling display of color-picker of pen-color
penSelector.addEventListener("click", () => {
    pen2.style.display = "flex";
    rainbowFlag = false;
    penColor = window.getComputedStyle(penSelector).backgroundColor;     
});

penSelector.addEventListener("mouseleave", ()=> {
    pen2.style.display = "none";
});
// Apply selected pen-color
colorPicker2.on('color:change', function(color) {
    penSelector.style.backgroundColor = penColor = color.rgbaString;
});

// Listeners for draw on grid
gridContainer.addEventListener("mousedown", (e) => {
    e.preventDefault()
    color(e)
    gridContainer.addEventListener("mousemove", color);
    gridContainer.addEventListener("mouseup", () => {gridContainer.removeEventListener("mousemove", color);});
    gridContainer.addEventListener("mouseleave", () => {gridContainer.removeEventListener("mousemove", color);});
});

// Listener for rainbow-pen
rainbowPen.addEventListener("click", (e) => {rainbowFlag = true;});

// Listener for eraser
eraser.addEventListener("click", (e) => {
    rainbowFlag = false;
    penColor = "rgba(0, 0, 0, 0)";
});
 