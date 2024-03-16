// Tweakables
const cols = 50;
const rows = 50;
const frameDelayMs = 10;

// Main container.
const appElem = document.getElementById('app');

// Element that displays the iteration count.
const iterationsElem = document.getElementById('iterations');

// Matrix to hold the matrix DOM elements to avoid having to call getElementById over and over.
const elemMatrix = provisionMatrix();

let matrixFrameBuffer = [
  // Provision two matrices so we can avoid provisioning one on each frame.
  // The code flip-flops between them.
  provisionMatrix(),
  provisionMatrix()
]

// Choose the first frame as the current.
let matrix = matrixFrameBuffer[0];

// Handle on the interval returned with setInterval() below.
let interval = null;

// Iteration count.
let iterations = 0;

// Values that have associated inputs.
const vals = {
  random: 0.2,
  lonely: 1,
  crowded: 4,
  spawn: 3
};


// Helper function to create a 2-D array of size cols x rows.
function provisionMatrix() {
  let arr = new Array(cols);
  for (let x = 0; x < cols; x++) {
    arr[x] = new Array(rows);
  }
  return arr;
}


// Seed the current matrix with random values.
function seedMatrix() {
  iterateMatrix( (x, y) => {
    matrix[x][y] = parseInt(vals.random + Math.random(1));
  });
}


// Run one iteration on the matrix.
function iterate() {
  // Flip-flop thru the frameBuffer to avoid provisioning a matrix every time.
  const newMatrix = matrixFrameBuffer[iterations % 2];

  iterateMatrix( (x, y) => {
    const numNeighbors = neighborCount(x, y);
    const currVal = matrix[x][y];

    if (currVal === 1 && (numNeighbors > vals.lonely && numNeighbors < vals.crowded)) {
      newMatrix[x][y] = 1;
    } else if (currVal === 0 && numNeighbors === vals.spawn) {
      newMatrix[x][y] = 1;
    } else {
      newMatrix[x][y] = 0;
    }
  });
  matrix = newMatrix;

  iterations += 1;
  iterationsElem.innerHTML = iterations;
}


// Return a count of how many neighboring cells are turned on.
function neighborCount(x, y) {
  let neighbors = 0;
  for (let dy = -1; dy <= 1; dy++) {
    // Using modulo allows the automata to wrap around the board (a virtual torus).
    let ny = (rows + y + dy) % rows;
    for (let dx = -1; dx <= 1; dx++) {
      let nx = (cols + x + dx) % cols;

      if (nx === x && ny === y) { continue; }

      neighbors += matrix[nx][ny];
    }
  }
  return neighbors;
}


// Provision DOM elements for each cell in the matrix and cache them.
function initMatrixElements() {
  iterateMatrix( (x, y) => {
    let elem = document.createElement('div');
    elem.style['grid-row'] = y + 1;
    elem.style['grid-column'] = x + 1;
    elem.className = 'cell';
    elemMatrix[x][y] = elem;
    appElem.appendChild(elem);
  });
}

// Render the current matrix.
function render() {
  iterateMatrix( (x, y) => {
    if (matrix[x][y] === 1) {
      elemMatrix[x][y].classList.add('on');
    } else {
      elemMatrix[x][y].classList.remove('on');
    }
  });
}


// Helper function that runs passed in function yieldXY(x,y) across the whole matrix.
function iterateMatrix(yieldXY) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      yieldXY(x,y);
    }
  }
}


// Called by the onChange handler on the input elements.
function setVal(key) {
  vals[key] = parseFloat(document.getElementById(key).value);
}

// Step forward one iteration.
function step() {
  iterate();
  render();
}

function start() {
  interval = setInterval( () => {
    step();
  }, frameDelayMs);
};

function pause() {
  clearInterval(interval);
  interval = null;
}

function playPause() {
  if (interval !== null) {
    pause();
  } else {
    start();
  }
}

function clickStep() {
  if (interval !== null) {
    pause();
  }
  step();
}

function reset() {
//  if (interval !== null) {
//    pause();
//  }
  iterations = 0;
  seedMatrix();
  render();
//  start();
}

// Populate input values.
for (const key in vals) {
  document.getElementById(key).value = vals[key];
}
// Initialize the matrix DOM nodes.
initMatrixElements();

// Now go for it.
reset();
start();
