// ===== Game Configuration =====
const CONFIG = {
    gridCols: 12,
    gridRows: 11,
    cellSize: 60,
    characterSize: 52,
    moveSpeed: 150, // ms per cell (faster!)
};

// ===== Maze Layout (0 = wall, 1 = path) =====
const MAZE_LAYOUT = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,0,1,0,1,0,0],
    [0,1,0,0,0,1,0,1,0,1,1,0],
    [0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,0,1,1,0,0,1,1,0],
    [0,1,0,1,0,1,1,1,0,1,0,0],
    [0,1,1,1,0,1,0,1,1,1,0,0],
    [0,1,0,1,1,1,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
];

// ===== Hotspot Locations =====
const HOTSPOTS = [
    {
        row: 2, col: 1, type: 'about', icon: '\uf007', discovered: false,
        title: 'About Me',
        description: 'Learn about my background and expertise'
    },
    {
        row: 2, col: 6, type: 'experience', icon: '\uf0b1', discovered: false,
        title: 'Work Experience',
        description: 'My professional journey in AI & ML'
    },
    {
        row: 3, col: 3, type: 'education', icon: '\uf19d', discovered: false,
        title: 'Education',
        description: 'Academic background and qualifications'
    },
    {
        row: 7, col: 7, type: 'skills', icon: '\uf121', discovered: false,
        title: 'Technical Skills',
        description: 'Technologies and tools I work with'
    },
    {
        row: 9, col: 5, type: 'blog', icon: '\uf781', discovered: false,
        title: 'Blog & Writing',
        description: 'Technical articles and research insights'
    },
    {
        row: 3, col: 9, type: 'projects', icon: '\uf542', discovered: false,
        title: 'Featured Projects',
        description: 'Explore my recent work and research'
    },
    {
        row: 6, col: 1, type: 'references', icon: '\uf508', discovered: false,
        title: 'References',
        description: 'Professional recommendations'
    },
    {
        row: 8, col: 3, type: 'contact', icon: '\uf0e0', discovered: false,
        title: 'Get In Touch',
        description: 'Contact information and social links'
    },
];

// ===== End Goal Location =====
const END_GOAL = {
    row: 9,
    col: 1,
    icon: '\uf091', // Trophy icon
    title: 'Finish',
    description: 'Complete your journey'
};

// ===== Black Holes (Teleportation Points) =====
const BLACK_HOLES = [
    {
        row: 3,
        col: 7,
        linkedTo: { row: 6, col: 6 },
        icon: '\uf0c1', // Link icon
        name: 'Portal A'
    },
    {
        row: 6,
        col: 6,
        linkedTo: { row: 3, col: 7 },
        icon: '\uf0c1', // Link icon
        name: 'Portal B'
    }
];

// ===== Highlight Cells (shown when reaching end goal with all hotspots) =====
const HIGHLIGHT_CELLS = [
    { row: 1, col: 1 }, { row: 1, col: 3 },
    { row: 2, col: 1 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 }, { row: 2, col: 9 },
    { row: 3, col: 1 }, { row: 3, col: 5 }, { row: 3, col: 7 }, { row: 3, col: 9 },
    { row: 4, col: 1 }, { row: 4, col: 5 }, { row: 4, col: 7 }, { row: 4, col: 9 },
    { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 9 },
    { row: 7, col: 1 }, { row: 7, col: 3 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 }, { row: 7, col: 9 },
    { row: 8, col: 1 }, { row: 8, col: 2 }, { row: 8, col: 3 }, { row: 8, col: 5 }, { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 8, col: 9 },
    { row: 9, col: 1 }, { row: 9, col: 3 }, { row: 9, col: 5 }, { row: 9, col: 8 }, { row: 9, col: 9 },
];

// ===== Device Detection =====
const DEVICE = {
    isMobile: false,
    isTablet: false,
    isTouch: false,
};

// ===== Game State =====
const gameState = {
    characterPos: { row: 1, col: 1 }, // Starting position
    isMoving: false,
    movementQueue: [],
    discoveredCount: 0,
    showCongratsOnClose: false, // Flag for showing congratulations after closing modal
    stepCount: 0, // Total steps taken
    aiPathfindingEnabled: false, // AI pathfinding mode (off by default)
};

// ===== DOM Elements =====
let mazeGrid, character, modal, modalBody, modalClose;
let instructionsOverlay, startBtn, discoveredCountElement, stepCountElement, aiToggleBtn;
let tutorialOverlay, tutorialCallout, tutorialSpotlight, tutorialPointer;
let tutorialStepNumber, tutorialTitle, tutorialDescription, tutorialTipElement;
let tutorialPrevBtn, tutorialNextBtn, tutorialSkipBtn, tutorialDots;

// ===== Tutorial State =====
const tutorialState = {
    currentStep: 1,
    totalSteps: 5
};

// ===== Tutorial Steps Configuration =====
const tutorialSteps = [
    {
        step: 1,
        title: 'Welcome to the Maze!',
        description: 'Click on adjacent cells (up, down, left, right) to move your character one step at a time.',
        tip: 'Use Arrow Keys or WASD on desktop!',
        highlightElement: '#character',
        calloutPosition: 'center'
    },
    {
        step: 2,
        title: 'AI Pathfinding Assistant',
        description: 'Toggle the AI button to enable automatic pathfinding. When enabled, click anywhere and your character finds the best route!',
        tip: 'Manual mode is more challenging!',
        highlightElement: '#ai-toggle-btn',
        calloutPosition: 'left'
    },
    {
        step: 3,
        title: 'Discover Hotspots',
        description: 'Navigate to colored markers throughout the maze to discover portfolio sections. Each reveals experience, skills, projects, and more!',
        tip: 'Track progress at the top - collect all 8!',
        highlightElement: '.cell.hotspot',
        calloutPosition: 'right'
    },
    {
        step: 4,
        title: 'Portal Shortcuts',
        description: 'Find purple portals that teleport you instantly between connected locations. These shortcuts help navigate faster!',
        tip: 'Portals work both ways and count as 1 step!',
        highlightElement: '.cell.black-hole',
        calloutPosition: 'right'
    },
    {
        step: 5,
        title: 'Complete Your Journey',
        description: 'After collecting all 8 sections, navigate to the golden trophy to complete your journey!',
        tip: 'Try to finish in as few steps as possible!',
        highlightElement: '.cell.end-goal',
        calloutPosition: 'center'
    }
];

// ===== Initialize Game =====
document.addEventListener('DOMContentLoaded', () => {
    detectDevice();
    calculateResponsiveSizes();
    initializeDOM();
    generateMaze();
    positionCharacter();
    setupEventListeners();
});

// ===== DOM Initialization =====
function initializeDOM() {
    mazeGrid = document.getElementById('maze');
    character = document.getElementById('character');
    modal = document.getElementById('content-modal');
    modalBody = document.getElementById('modal-body');
    modalClose = document.getElementById('modal-close');
    instructionsOverlay = document.getElementById('instructions');
    startBtn = document.getElementById('start-btn');
    discoveredCountElement = document.getElementById('discovered-count');
    stepCountElement = document.getElementById('step-count');
    aiToggleBtn = document.getElementById('ai-toggle-btn');

    // Tutorial elements
    tutorialOverlay = document.getElementById('tutorial-overlay');
    tutorialCallout = document.querySelector('.tutorial-callout');
    tutorialSpotlight = document.querySelector('.tutorial-spotlight');
    tutorialPointer = document.querySelector('.tutorial-pointer');
    tutorialStepNumber = document.querySelector('.tutorial-step-number');
    tutorialTitle = document.querySelector('.tutorial-title');
    tutorialDescription = document.querySelector('.tutorial-description');
    tutorialTipElement = document.querySelector('.tutorial-tip span');
    tutorialPrevBtn = document.getElementById('tutorial-prev');
    tutorialNextBtn = document.getElementById('tutorial-next');
    tutorialSkipBtn = document.getElementById('tutorial-skip');
    tutorialDots = document.querySelectorAll('.tutorial-dot');
}

// ===== Device Detection =====
function detectDevice() {
    // Check for touch capability
    DEVICE.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Check screen size for mobile/tablet
    const width = window.innerWidth;
    DEVICE.isMobile = width < 768;
    DEVICE.isTablet = width >= 768 && width <= 1024;

    // Add class to body for CSS targeting
    document.body.classList.toggle('is-mobile', DEVICE.isMobile);
    document.body.classList.toggle('is-tablet', DEVICE.isTablet);
    document.body.classList.toggle('is-touch', DEVICE.isTouch);
}

// ===== Responsive Sizing =====
function calculateResponsiveSizes() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate available space (accounting for margins and UI)
    const horizontalPadding = DEVICE.isMobile ? 20 : 48; // 1.5rem mobile, 3rem desktop
    const verticalPadding = DEVICE.isMobile ? 100 : 150; // Account for UI bar

    const availableWidth = width - horizontalPadding;
    const availableHeight = height - verticalPadding;

    // Calculate cell size to fit grid
    const cellSizeByWidth = Math.floor(availableWidth / CONFIG.gridCols);
    const cellSizeByHeight = Math.floor(availableHeight / CONFIG.gridRows);

    // Use the smaller dimension, with minimum and maximum constraints
    let cellSize = Math.min(cellSizeByWidth, cellSizeByHeight);

    // Set minimum cell size for usability
    const minCellSize = DEVICE.isMobile ? 25 : 40;
    const maxCellSize = 60; // Desktop default

    cellSize = Math.max(minCellSize, Math.min(maxCellSize, cellSize));

    // Update CONFIG
    CONFIG.cellSize = cellSize;
    CONFIG.characterSize = Math.max(20, cellSize - 8); // Slightly smaller than cell

    // Update CSS custom properties
    document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
    document.documentElement.style.setProperty('--character-size', `${CONFIG.characterSize}px`);
}

// ===== Window Resize Handler =====
function handleResize() {
    detectDevice();
    calculateResponsiveSizes();

    // Regenerate maze with new sizes
    if (mazeGrid) {
        generateMaze();
        positionCharacter();
    }
}

// ===== Helper Functions =====
function getTooltipPosition(row, col) {
    // Define edge thresholds
    const topEdge = row <= 2;
    const bottomEdge = row >= CONFIG.gridRows - 3;
    const leftEdge = col <= 2;
    const rightEdge = col >= CONFIG.gridCols - 3;

    // Priority: avoid top/bottom cutoff first, then left/right
    if (topEdge) {
        return 'bottom'; // Show below if near top
    }
    if (leftEdge) {
        return 'right'; // Show on right if near left edge
    }
    if (rightEdge) {
        return 'left'; // Show on left if near right edge
    }
    // Default: show above (most common case)
    return 'top';
}

// ===== Maze Generation =====
function generateMaze() {
    mazeGrid.innerHTML = '';

    for (let row = 0; row < CONFIG.gridRows; row++) {
        for (let col = 0; col < CONFIG.gridCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (MAZE_LAYOUT[row][col] === 0) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');

                // Check if this cell is a hotspot
                const hotspot = HOTSPOTS.find(h => h.row === row && h.col === col);
                if (hotspot) {
                    cell.classList.add('hotspot', hotspot.type);
                    cell.dataset.hotspot = hotspot.type;
                    cell.dataset.icon = hotspot.icon;

                    // Add tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'hotspot-tooltip';
                    tooltip.innerHTML = `
                        <div class="hotspot-tooltip-title">${hotspot.title}</div>
                        <div class="hotspot-tooltip-description">${hotspot.description}</div>
                    `;

                    // Determine tooltip position based on cell location
                    const tooltipPosition = getTooltipPosition(row, col);
                    tooltip.classList.add(`position-${tooltipPosition}`);

                    cell.appendChild(tooltip);
                }

                // Check if this cell is the end goal
                if (row === END_GOAL.row && col === END_GOAL.col) {
                    cell.classList.add('end-goal');
                    cell.dataset.icon = END_GOAL.icon;
                }

                // Check if this cell is a black hole
                const blackHole = BLACK_HOLES.find(bh => bh.row === row && bh.col === col);
                if (blackHole) {
                    cell.classList.add('black-hole');
                    cell.dataset.icon = blackHole.icon;
                    
                    // Add tooltip for black hole
                    const tooltip = document.createElement('div');
                    tooltip.className = 'hotspot-tooltip black-hole-tooltip';
                    tooltip.innerHTML = `
                        <div class="hotspot-tooltip-title">${blackHole.name}</div>
                        <div class="hotspot-tooltip-description">Teleports to ${blackHole.linkedTo.row}, ${blackHole.linkedTo.col}</div>
                    `;
                    
                    const tooltipPosition = getTooltipPosition(row, col);
                    tooltip.classList.add(`position-${tooltipPosition}`);
                    
                    cell.appendChild(tooltip);
                }

                // Add click listener for path cells
                cell.addEventListener('click', () => handleCellClick(row, col));
            }

            mazeGrid.appendChild(cell);
        }
    }
}

// ===== Character Positioning =====
function positionCharacter(checkForHotspot = false) {
    // Calculate centering offset
    const offsetX = (CONFIG.cellSize - CONFIG.characterSize) / 2;
    const offsetY = (CONFIG.cellSize - CONFIG.characterSize) / 2;

    // Get the maze grid's position
    const mazeRect = mazeGrid.getBoundingClientRect();
    const containerRect = mazeGrid.parentElement.getBoundingClientRect();

    // Calculate position relative to maze grid
    const mazeOffsetLeft = mazeRect.left - containerRect.left;
    const mazeOffsetTop = mazeRect.top - containerRect.top;

    // Account for grid gap (1px between cells)
    const gapSize = 1;
    const totalGapX = gameState.characterPos.col * gapSize;
    const totalGapY = gameState.characterPos.row * gapSize;

    // Calculate final position with gap compensation
    const left = Math.round(mazeOffsetLeft + gameState.characterPos.col * CONFIG.cellSize + totalGapX + offsetX);
    const top = Math.round(mazeOffsetTop + gameState.characterPos.row * CONFIG.cellSize + totalGapY + offsetY);

    character.style.left = `${left}px`;
    character.style.top = `${top}px`;

    // Only check hotspot if explicitly requested (at final destination)
    if (checkForHotspot) {
        checkHotspot();
    }
}

// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Keyboard controls (desktop only)
    if (!DEVICE.isMobile) {
        document.addEventListener('keydown', handleKeyPress);
    }

    // Window resize and orientation change
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250); // Debounce resize
    });

    // Prevent zoom on double-tap (mobile)
    if (DEVICE.isTouch) {
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Start button - show tutorial
    startBtn.addEventListener('click', () => {
        instructionsOverlay.classList.add('hidden');
        setTimeout(() => {
            instructionsOverlay.style.display = 'none';
            showTutorial();
        }, 300);
    });

    // AI toggle button
    aiToggleBtn.addEventListener('click', toggleAIPathfinding);

    // Tutorial navigation
    tutorialPrevBtn.addEventListener('click', previousTutorialStep);
    tutorialNextBtn.addEventListener('click', nextTutorialStep);
    tutorialSkipBtn.addEventListener('click', closeTutorial);

    // Tutorial dot navigation
    tutorialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.getAttribute('data-step'));
            goToTutorialStep(step);
        });
    });
}

// ===== Keyboard Controls =====
function handleKeyPress(e) {
    if (gameState.isMoving || modal.classList.contains('active')) return;

    const { row, col } = gameState.characterPos;
    let newRow = row;
    let newCol = col;

    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            newRow = row - 1;
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            newRow = row + 1;
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            newCol = col - 1;
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            newCol = col + 1;
            e.preventDefault();
            break;
        default:
            return;
    }

    // Check if move is valid
    if (isValidMove(newRow, newCol)) {
        moveCharacterWithHotspotCheck(newRow, newCol);
    }
}

// ===== Cell Click Handler =====
function handleCellClick(targetRow, targetCol) {
    if (gameState.isMoving || modal.classList.contains('active')) return;

    // Don't pathfind if clicking current position
    if (targetRow === gameState.characterPos.row && targetCol === gameState.characterPos.col) {
        return;
    }

    const { row, col } = gameState.characterPos;

    // If AI pathfinding is disabled, only allow adjacent moves
    if (!gameState.aiPathfindingEnabled) {
        const rowDiff = Math.abs(targetRow - row);
        const colDiff = Math.abs(targetCol - col);
        const isAdjacent = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);

        if (!isAdjacent) {
            console.log('AI Pathfinding is OFF - You can only move to adjacent cells!');
            showAIWarning();
            return;
        }

        // Move one step (like keyboard controls)
        if (isValidMove(targetRow, targetCol)) {
            moveCharacterWithHotspotCheck(targetRow, targetCol);
        }
        return;
    }

    // AI mode enabled - use A* pathfinding
    const path = findPath(
        gameState.characterPos.row,
        gameState.characterPos.col,
        targetRow,
        targetCol
    );

    if (path && path.length > 0) {
        // Clear any existing preview
        clearPathPreview();

        // Start moving along path
        gameState.movementQueue = path;
        processMovementQueue();
    }
}

// ===== Pathfinding (A* Algorithm) =====
function findPath(startRow, startCol, endRow, endCol) {
    // A* pathfinding implementation
    // Note: With teleportation, the heuristic is non-monotonic, so we don't use a closed set
    // to ensure we always find the optimal path
    const openSet = [];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    const inOpenSet = new Set(); // Track what's in openSet for faster lookup

    const startKey = `${startRow},${startCol}`;
    const endKey = `${endRow},${endCol}`;

    openSet.push({ row: startRow, col: startCol });
    inOpenSet.add(startKey);
    gScore.set(startKey, 0);
    fScore.set(startKey, heuristic(startRow, startCol, endRow, endCol));

    while (openSet.length > 0) {
        // Find node with lowest fScore
        openSet.sort((a, b) => {
            const aKey = `${a.row},${a.col}`;
            const bKey = `${b.row},${b.col}`;
            return fScore.get(aKey) - fScore.get(bKey);
        });

        const current = openSet.shift();
        const currentKey = `${current.row},${current.col}`;
        inOpenSet.delete(currentKey);

        // Check if we reached the end
        if (currentKey === endKey) {
            const path = reconstructPath(cameFrom, current);

            // Log path information
            const hasTeleport = path.some(node => node.isTeleport);
            console.log('=== A* Path Found ===');
            console.log(`From: (${startRow}, ${startCol}) → To: (${endRow}, ${endCol})`);
            console.log(`Distance: ${path.length} steps`);
            console.log(`Uses teleportation: ${hasTeleport}`);
            console.log('Path:', path.map(p => `(${p.row},${p.col})${p.isTeleport ? ' [TELEPORT]' : ''}`).join(' → '));
            console.log('=====================');

            return path;
        }

        // Check all neighbors
        const neighbors = getNeighbors(current.row, current.col);

        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.row},${neighbor.col}`;

            // Cost is 1 for normal moves and teleports
            const tentativeGScore = gScore.get(currentKey) + 1;

            // Skip if we've already found a better or equal path to this neighbor
            const existingGScore = gScore.get(neighborKey);
            if (existingGScore !== undefined && tentativeGScore >= existingGScore) {
                continue;
            }

            // Debug: Log when we find a teleport neighbor
            if (neighbor.isTeleport) {
                console.log(`  Found teleport: (${current.row},${current.col}) → (${neighbor.row},${neighbor.col}) with gScore=${tentativeGScore}`);
            }

            // Add to openSet if not already there
            if (!inOpenSet.has(neighborKey)) {
                openSet.push(neighbor);
                inOpenSet.add(neighborKey);
            }

            // Store the path with teleport information
            cameFrom.set(neighborKey, {
                row: current.row,
                col: current.col,
                isTeleport: neighbor.isTeleport
            });
            gScore.set(neighborKey, tentativeGScore);
            fScore.set(neighborKey, tentativeGScore + heuristic(neighbor.row, neighbor.col, endRow, endCol));
        }
    }

    // No path found
    console.log('=== A* Path NOT Found ===');
    console.log(`From: (${startRow}, ${startCol}) → To: (${endRow}, ${endCol})`);
    console.log('No valid path exists!');
    console.log('=========================');
    return null;
}

// ===== Heuristic Function (Manhattan Distance) =====
function heuristic(row1, col1, row2, col2) {
    // With teleportation, use a more conservative heuristic
    // Check if current position is a black hole - if so, heuristic should account for potential shortcuts
    const isBlackHole = BLACK_HOLES.some(bh => bh.row === row1 && bh.col === col1);

    if (isBlackHole) {
        // For black holes, use 0 heuristic to ensure we explore teleportation options
        return 0;
    }

    // Check distance to nearest black hole vs direct distance
    let minDistToBlackHole = Infinity;
    let minDistFromBlackHolePair = Infinity;

    for (const bh of BLACK_HOLES) {
        const distToHole = Math.abs(row1 - bh.row) + Math.abs(col1 - bh.col);
        const distFromPair = Math.abs(bh.linkedTo.row - row2) + Math.abs(bh.linkedTo.col - col2);
        const totalViaTeleport = distToHole + 1 + distFromPair; // +1 for teleport

        if (totalViaTeleport < minDistFromBlackHolePair) {
            minDistFromBlackHolePair = totalViaTeleport;
        }
    }

    const directDist = Math.abs(row1 - row2) + Math.abs(col1 - col2);

    // Use the minimum of direct distance and teleport distance as heuristic
    return Math.min(directDist, minDistFromBlackHolePair);
}

// ===== Get Valid Neighbors =====
function getNeighbors(row, col) {
    const neighbors = [];
    const directions = [
        { row: -1, col: 0 },  // up
        { row: 1, col: 0 },   // down
        { row: 0, col: -1 },  // left
        { row: 0, col: 1 },   // right
    ];

    for (const dir of directions) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        if (isValidMove(newRow, newCol)) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }

    // Check if current position is a black hole - add teleport destination as neighbor
    const blackHole = BLACK_HOLES.find(bh => bh.row === row && bh.col === col);
    if (blackHole) {
        // Add the linked destination as a valid neighbor (with cost of 1 for teleportation)
        if (isValidMove(blackHole.linkedTo.row, blackHole.linkedTo.col)) {
            neighbors.push({ 
                row: blackHole.linkedTo.row, 
                col: blackHole.linkedTo.col,
                isTeleport: true 
            });
        }
    }

    return neighbors;
}

// ===== Reconstruct Path =====
function reconstructPath(cameFrom, current) {
    const nodes = [];
    let currentKey = `${current.row},${current.col}`;

    // Collect nodes with their teleport flags
    // The isTeleport flag in cameFrom indicates the move TO that node was a teleport
    while (cameFrom.has(currentKey)) {
        const cameFromEntry = cameFrom.get(currentKey);
        // Add current node with the teleport flag from its cameFrom entry
        nodes.unshift({
            row: current.row,
            col: current.col,
            isTeleport: cameFromEntry.isTeleport || false
        });
        current = {row: cameFromEntry.row, col: cameFromEntry.col};
        currentKey = `${current.row},${current.col}`;
    }

    // Add the start node (no teleport to reach it from previous)
    nodes.unshift({ row: current.row, col: current.col, isTeleport: false });

    // Remove the starting position
    nodes.shift();

    return nodes;
}

// ===== Process Movement Queue =====
async function processMovementQueue() {
    if (gameState.movementQueue.length === 0) {
        gameState.isMoving = false;
        character.classList.remove('moving');
        // Check for hotspot when movement is complete (final destination)
        checkHotspot();
        return;
    }

    gameState.isMoving = true;
    character.classList.add('moving');

    const nextPos = gameState.movementQueue.shift();
    
    // Check if this move is a teleportation
    if (nextPos.isTeleport) {
        // Find which black hole we're currently at
        const blackHole = BLACK_HOLES.find(
            bh => bh.row === gameState.characterPos.row && bh.col === gameState.characterPos.col
        );
        
        if (blackHole) {
            // Perform teleportation
            await teleportThroughBlackHole(blackHole);
            // After teleportation, continue with the rest of the path
            processMovementQueue();
            return;
        }
    }
    
    await moveCharacter(nextPos.row, nextPos.col);
    
    // Check if we just stepped onto a black hole (for manual movement)
    const blackHoleAtCurrent = BLACK_HOLES.find(
        bh => bh.row === gameState.characterPos.row && bh.col === gameState.characterPos.col
    );
    
    if (blackHoleAtCurrent && gameState.movementQueue.length > 0) {
        // We're on a black hole and have more moves queued
        // Teleport immediately and continue
        await teleportThroughBlackHole(blackHoleAtCurrent);
    }

    // Continue processing queue
    processMovementQueue();
}

// ===== Clear Path Preview =====
function clearPathPreview() {
    const previewCells = mazeGrid.querySelectorAll('.cell.preview');
    previewCells.forEach(cell => cell.classList.remove('preview'));
}

// ===== Move Character =====
function moveCharacter(newRow, newCol) {
    return new Promise((resolve) => {
        gameState.characterPos = { row: newRow, col: newCol };
        gameState.stepCount++;
        updateStepCount();
        positionCharacter();

        setTimeout(() => {
            resolve();
        }, CONFIG.moveSpeed);
    });
}

// ===== Move Character with Hotspot Check (for keyboard movement) =====
async function moveCharacterWithHotspotCheck(newRow, newCol) {
    gameState.isMoving = true;
    character.classList.add('moving');

    await moveCharacter(newRow, newCol);

    gameState.isMoving = false;
    character.classList.remove('moving');

    // Check hotspot after movement completes
    checkHotspot();
}

// ===== Validate Move =====
function isValidMove(row, col) {
    // Check bounds
    if (row < 0 || row >= CONFIG.gridRows || col < 0 || col >= CONFIG.gridCols) {
        return false;
    }

    // Check if path (not wall)
    return MAZE_LAYOUT[row][col] === 1;
}

// ===== Check for Hotspot =====
function checkHotspot() {
    // Check for black hole first
    const blackHole = BLACK_HOLES.find(
        bh => bh.row === gameState.characterPos.row && bh.col === gameState.characterPos.col
    );

    if (blackHole) {
        // Trigger teleportation
        setTimeout(() => {
            teleportThroughBlackHole(blackHole);
        }, 200);
        return;
    }

    const hotspot = HOTSPOTS.find(
        h => h.row === gameState.characterPos.row && h.col === gameState.characterPos.col
    );

    if (hotspot) {
        // Mark as discovered if first time
        if (!hotspot.discovered) {
            hotspot.discovered = true;
            gameState.discoveredCount++;
            updateDiscoveredCount();
            markHotspotAsDiscovered(hotspot);
        }

        // Always show content when reaching a hotspot (even if already discovered)
        setTimeout(() => {
            showContent(hotspot.type);
        }, 200);
        return;
    }

    // Check if character reached the end goal
    if (gameState.characterPos.row === END_GOAL.row && gameState.characterPos.col === END_GOAL.col) {
        if (gameState.discoveredCount === HOTSPOTS.length) {
            // All hotspots collected - show congratulations and highlight cells
            setTimeout(() => {
                highlightSpecialCells();
                // Show congratulations modal after highlight effect is visible
                setTimeout(() => {
                    showCongratulations();
                }, 2000); // Delay to let highlight effect show first
            }, 200);
        } else {
            // Not all hotspots collected - show instruction
            setTimeout(() => {
                showIncompleteMessage();
            }, 200);
        }
    }
}

// ===== Mark Hotspot as Discovered =====
function markHotspotAsDiscovered(hotspot) {
    const cell = mazeGrid.querySelector(
        `.cell[data-row="${hotspot.row}"][data-col="${hotspot.col}"]`
    );
    if (cell) {
        cell.classList.add('discovered');

        // Add discovery celebration effect
        createDiscoveryEffect(cell);
    }
}

// ===== Teleport Through Black Hole =====
async function teleportThroughBlackHole(blackHole) {
    // Add teleporting animation to character
    character.classList.add('teleporting');
    
    // Create visual effect at entrance
    const entranceCell = mazeGrid.querySelector(
        `.cell[data-row="${blackHole.row}"][data-col="${blackHole.col}"]`
    );
    if (entranceCell) {
        createTeleportEffect(entranceCell, 'entrance');
    }
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 600));

    // Move character to linked position
    gameState.characterPos = {
        row: blackHole.linkedTo.row,
        col: blackHole.linkedTo.col
    };
    gameState.stepCount++;
    updateStepCount();
    positionCharacter();
    
    // Create visual effect at exit
    const exitCell = mazeGrid.querySelector(
        `.cell[data-row="${blackHole.linkedTo.row}"][data-col="${blackHole.linkedTo.col}"]`
    );
    if (exitCell) {
        createTeleportEffect(exitCell, 'exit');
    }
    
    // Remove teleporting class
    setTimeout(() => {
        character.classList.remove('teleporting');
    }, 300);
}

// ===== Create Teleport Effect =====
function createTeleportEffect(cell, type) {
    const rect = cell.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particleCount = DEVICE.isMobile ? 12 : 20;
    const colors = type === 'entrance' ? 
        ['#667eea', '#764ba2', '#9333ea'] : 
        ['#10b981', '#059669', '#34d399'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'teleport-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = type === 'entrance' ? 80 : 120;
        const distance = type === 'entrance' ? 0 : velocity;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.background = colors[i % colors.length];
        particle.style.setProperty('--tx', `${Math.cos(angle) * (type === 'entrance' ? -distance : distance)}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * (type === 'entrance' ? -distance : distance)}px`);
        
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
    
    // Add pulsing effect to cell
    cell.classList.add('teleport-pulse');
    setTimeout(() => cell.classList.remove('teleport-pulse'), 1000);
}

// ===== Create Discovery Effect =====
function createDiscoveryEffect(cell) {
    const rect = cell.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Reduce particles on mobile for performance
    const particleCount = DEVICE.isMobile ? 4 : 12;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px rgba(251, 191, 36, 0.6)';

        document.body.appendChild(particle);

        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => particle.remove();
    }
}

// ===== Update Discovered Count =====
function updateDiscoveredCount() {
    discoveredCountElement.textContent = gameState.discoveredCount;

    // Add pop animation
    discoveredCountElement.classList.add('updated');
    setTimeout(() => {
        discoveredCountElement.classList.remove('updated');
    }, 600);

    // Check if all sections discovered
    if (gameState.discoveredCount === HOTSPOTS.length) {
        // Do not auto-show congratulations
        // User must reach the end goal to complete the game
    }
}

// ===== Update Step Count =====
function updateStepCount() {
    stepCountElement.textContent = gameState.stepCount;

    // Add pop animation
    stepCountElement.classList.add('updated');
    setTimeout(() => {
        stepCountElement.classList.remove('updated');
    }, 300);
}

// ===== Highlight Special Cells =====
function highlightSpecialCells() {
    HIGHLIGHT_CELLS.forEach(({ row, col }) => {
        const cell = mazeGrid.querySelector(
            `.cell[data-row="${row}"][data-col="${col}"]`
        );
        if (cell && cell.classList.contains('path')) {
            cell.classList.add('highlighted');
        }
    });
}

// ===== Show Content Modal =====
function showContent(type) {
    const contentTemplate = document.getElementById(`${type}-content`);
    if (!contentTemplate) return;

    modalBody.innerHTML = contentTemplate.innerHTML;
    modal.classList.add('active');

    // Prevent character movement while modal is open
    gameState.movementQueue = [];
    gameState.isMoving = false;
    character.classList.remove('moving');
}

// ===== Close Modal =====
function closeModal() {
    modal.classList.remove('active');

    // Check if we should show congratulations after closing
    if (gameState.showCongratsOnClose) {
        gameState.showCongratsOnClose = false; // Reset flag
        setTimeout(() => {
            showCongratulations();
        }, 400); // Small delay for smooth transition
    }
}

// ===== Show Congratulations =====
function showCongratulations() {
    const congratsHTML = `
        <div class="modal-header">
            <i class="fas fa-trophy section-icon" style="color: #fbbf24; font-size: 3rem;"></i>
            <h2>Journey Complete!</h2>
        </div>
        <div class="modal-text" style="text-align: center;">
            <p style="font-size: 1.3rem; color: var(--text-color); margin: 2rem 0; font-weight: 600;">
                🎉 Congratulations! You've successfully completed the maze! 🎉
            </p>
            <p style="font-size: 1.1rem; color: var(--text-light); margin-bottom: 1rem;">
                You discovered all <strong>${HOTSPOTS.length} portfolio sections</strong> and reached the finish line!
            </p>
            <p style="margin-bottom: 2rem; color: var(--text-color);">
                Thank you for taking this interactive journey through my work. I hope you enjoyed exploring my portfolio in this unique way!
            </p>
            <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <p style="margin: 0; color: var(--text-color); font-size: 0.95rem;">
                    Want to learn more or get in touch?
                </p>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="index.html" class="start-btn">View Traditional Version</a>
                <a href="Hoang_Van_An_CV_0210.pdf" download class="start-btn" style="background: linear-gradient(135deg, #10b981, #059669); text-decoration: none;">
                    Download My CV
                </a>
            </div>
        </div>
    `;

    modalBody.innerHTML = congratsHTML;
    modal.classList.add('active');
}

// ===== Show Incomplete Message =====
function showIncompleteMessage() {
    const remaining = HOTSPOTS.length - gameState.discoveredCount;
    const incompleteHTML = `
        <div class="modal-header">
            <i class="fas fa-exclamation-circle section-icon" style="color: #f59e0b;"></i>
            <h2>Not Yet Complete!</h2>
        </div>
        <div class="modal-text" style="text-align: center;">
            <p style="font-size: 1.2rem; color: var(--text-color); margin: 2rem 0;">
                You've reached the finish line, but there's more to discover!
            </p>
            <p style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--text-light);">
                You've found <strong>${gameState.discoveredCount}/${HOTSPOTS.length}</strong> sections.
            </p>
            <p style="margin-bottom: 2rem;">
                Please collect all <strong>${remaining} remaining hotspot${remaining > 1 ? 's' : ''}</strong> before finishing your journey.
            </p>
            <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text-color);">Look for these sections:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
                    ${HOTSPOTS.map(h => !h.discovered ? `
                        <span class="hotspot-badge ${h.type}">
                            <i class="${h.icon.startsWith('\\uf') ? 'fas' : 'fab'}"></i> ${h.title}
                        </span>
                    ` : '').join('')}
                </div>
            </div>
            <button onclick="document.getElementById('modal-close').click()" class="start-btn">
                Continue Exploring
            </button>
        </div>
    `;

    modalBody.innerHTML = incompleteHTML;
    modal.classList.add('active');
}

// ===== Utility: Get Cell Position =====
function getCellPosition(row, col) {
    return {
        left: col * CONFIG.cellSize,
        top: row * CONFIG.cellSize,
    };
}

// ===== Show AI Warning Notification =====
function showAIWarning() {
    // Remove any existing warning
    const existing = document.querySelector('.ai-warning-toast');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const toast = document.createElement('div');
    toast.className = 'ai-warning-toast';
    toast.innerHTML = `
        <i class="fas fa-brain"></i>
        <span>One step at a time. Enable AI mode to move multiple steps!</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after animation
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);

    // Make AI button pulse to draw attention
    aiToggleBtn.classList.add('pulse-attention');
    setTimeout(() => {
        aiToggleBtn.classList.remove('pulse-attention');
    }, 1000);
}

// ===== Tutorial Functions =====
function showTutorial() {
    tutorialOverlay.style.display = 'block';
    tutorialState.currentStep = 1;
    updateTutorialDisplay();
}

function closeTutorial() {
    tutorialOverlay.style.display = 'none';
    // Clear spotlight
    tutorialSpotlight.style.boxShadow = '';
}

function nextTutorialStep() {
    if (tutorialState.currentStep < tutorialState.totalSteps) {
        tutorialState.currentStep++;
        updateTutorialDisplay();
    } else {
        // Last step - close tutorial
        closeTutorial();
    }
}

function previousTutorialStep() {
    if (tutorialState.currentStep > 1) {
        tutorialState.currentStep--;
        updateTutorialDisplay();
    }
}

function goToTutorialStep(step) {
    if (step >= 1 && step <= tutorialState.totalSteps) {
        tutorialState.currentStep = step;
        updateTutorialDisplay();
    }
}

function updateTutorialDisplay() {
    const currentStepIndex = tutorialState.currentStep - 1;
    const stepData = tutorialSteps[currentStepIndex];

    // Update text content
    tutorialStepNumber.textContent = tutorialState.currentStep;
    tutorialTitle.textContent = stepData.title;
    tutorialDescription.textContent = stepData.description;
    tutorialTipElement.textContent = stepData.tip;

    // Update dots
    tutorialDots.forEach((dot, index) => {
        if (index === currentStepIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Update buttons
    if (tutorialState.currentStep === 1) {
        tutorialPrevBtn.style.visibility = 'hidden';
    } else {
        tutorialPrevBtn.style.visibility = 'visible';
    }

    if (tutorialState.currentStep === tutorialState.totalSteps) {
        tutorialNextBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        tutorialNextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    }

    // Position callout and create spotlight
    positionTutorialCallout(stepData);
}

function positionTutorialCallout(stepData) {
    const targetElement = document.querySelector(stepData.highlightElement);

    if (!targetElement) {
        console.warn('Tutorial target element not found:', stepData.highlightElement);
        return;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const calloutRect = tutorialCallout.getBoundingClientRect();

    // Create spotlight effect (cut-out around element)
    const spotlightSize = 20; // padding around element
    tutorialSpotlight.style.boxShadow = `
        0 0 0 9999px rgba(0, 0, 0, 0.7),
        inset 0 0 ${spotlightSize}px rgba(0, 0, 0, 0.3)
    `;
    tutorialSpotlight.style.top = `${targetRect.top - spotlightSize}px`;
    tutorialSpotlight.style.left = `${targetRect.left - spotlightSize}px`;
    tutorialSpotlight.style.width = `${targetRect.width + spotlightSize * 2}px`;
    tutorialSpotlight.style.height = `${targetRect.height + spotlightSize * 2}px`;
    tutorialSpotlight.style.borderRadius = '12px';

    // Position callout based on position preference
    let calloutTop, calloutLeft;
    let pointerTop, pointerLeft, pointerClass;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (stepData.calloutPosition === 'center') {
        // Center on screen
        calloutTop = (viewportHeight - calloutRect.height) / 2;
        calloutLeft = (viewportWidth - calloutRect.width) / 2;
        tutorialPointer.style.display = 'none';
    } else if (stepData.calloutPosition === 'left') {
        // Position to the left of target
        calloutTop = targetRect.top + (targetRect.height / 2) - (calloutRect.height / 2);
        calloutLeft = targetRect.left - calloutRect.width - 40;

        // Pointer on the right side of callout
        pointerTop = targetRect.top + (targetRect.height / 2) - 15;
        pointerLeft = targetRect.left - 40;
        pointerClass = 'arrow-right';
        tutorialPointer.style.display = 'block';
    } else if (stepData.calloutPosition === 'right') {
        // Position to the right of target
        calloutTop = targetRect.top + (targetRect.height / 2) - (calloutRect.height / 2);
        calloutLeft = targetRect.right + 40;

        // Pointer on the left side of callout
        pointerTop = targetRect.top + (targetRect.height / 2) - 15;
        pointerLeft = targetRect.right + 10;
        pointerClass = 'arrow-left';
        tutorialPointer.style.display = 'block';
    }

    // Ensure callout stays within viewport
    calloutTop = Math.max(20, Math.min(calloutTop, viewportHeight - calloutRect.height - 20));
    calloutLeft = Math.max(20, Math.min(calloutLeft, viewportWidth - calloutRect.width - 20));

    // Apply positions
    tutorialCallout.style.top = `${calloutTop}px`;
    tutorialCallout.style.left = `${calloutLeft}px`;

    if (tutorialPointer.style.display !== 'none') {
        tutorialPointer.className = 'tutorial-pointer ' + pointerClass;
        tutorialPointer.style.top = `${pointerTop}px`;
        tutorialPointer.style.left = `${pointerLeft}px`;
    }
}

// ===== Toggle AI Pathfinding =====
function toggleAIPathfinding() {
    gameState.aiPathfindingEnabled = !gameState.aiPathfindingEnabled;

    // Get tooltip elements
    const tooltipStatus = aiToggleBtn.querySelector('.ai-tooltip-status');
    const tooltipDesc = aiToggleBtn.querySelector('.ai-tooltip-desc');

    // Update button appearance
    if (gameState.aiPathfindingEnabled) {
        aiToggleBtn.classList.add('active');
        tooltipStatus.textContent = 'ON - AI Mode';
        tooltipDesc.textContent = 'Click anywhere to navigate';
        console.log('AI Pathfinding: ENABLED - Click anywhere to use A* pathfinding');
    } else {
        aiToggleBtn.classList.remove('active');
        tooltipStatus.textContent = 'OFF - Manual Mode';
        tooltipDesc.textContent = 'Click to enable auto-navigation';
        console.log('AI Pathfinding: DISABLED - Click adjacent cells only');
    }
}

// ===== Debug Function =====
function debugMaze() {
    console.log('Character Position:', gameState.characterPos);
    console.log('Hotspots:', HOTSPOTS);
    console.log('Discovered:', gameState.discoveredCount);
    console.log('AI Pathfinding:', gameState.aiPathfindingEnabled);
}

// Make debug function available globally
window.debugMaze = debugMaze;
