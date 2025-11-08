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
        row: 8, col: 8, type: 'skills', icon: '\uf121', discovered: false,
        title: 'Technical Skills',
        description: 'Technologies and tools I work with'
    },
    {
        row: 4, col: 9, type: 'projects', icon: '\uf542', discovered: false,
        title: 'Featured Projects',
        description: 'Explore my recent work and research'
    },
    {
        row: 6, col: 1, type: 'references', icon: '\uf508', discovered: false,
        title: 'References',
        description: 'Professional recommendations'
    },
    {
        row: 9, col: 4, type: 'contact', icon: '\uf0e0', discovered: false,
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
};

// ===== DOM Elements =====
let mazeGrid, character, modal, modalBody, modalClose;
let instructionsOverlay, startBtn, discoveredCountElement;

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

    // Start button
    startBtn.addEventListener('click', () => {
        instructionsOverlay.classList.add('hidden');
        setTimeout(() => {
            instructionsOverlay.style.display = 'none';
        }, 300);
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

    // Find path using A*
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
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    const startKey = `${startRow},${startCol}`;
    const endKey = `${endRow},${endCol}`;

    openSet.push({ row: startRow, col: startCol });
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

        // Check if we reached the end
        if (currentKey === endKey) {
            return reconstructPath(cameFrom, current);
        }

        closedSet.add(currentKey);

        // Check all neighbors
        const neighbors = getNeighbors(current.row, current.col);

        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.row},${neighbor.col}`;

            if (closedSet.has(neighborKey)) continue;

            const tentativeGScore = gScore.get(currentKey) + 1;

            if (!openSet.find(n => `${n.row},${n.col}` === neighborKey)) {
                openSet.push(neighbor);
            } else if (tentativeGScore >= gScore.get(neighborKey)) {
                continue;
            }

            cameFrom.set(neighborKey, current);
            gScore.set(neighborKey, tentativeGScore);
            fScore.set(neighborKey, tentativeGScore + heuristic(neighbor.row, neighbor.col, endRow, endCol));
        }
    }

    return null; // No path found
}

// ===== Heuristic Function (Manhattan Distance) =====
function heuristic(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
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

    return neighbors;
}

// ===== Reconstruct Path =====
function reconstructPath(cameFrom, current) {
    const path = [];
    let currentKey = `${current.row},${current.col}`;

    while (cameFrom.has(currentKey)) {
        const prev = cameFrom.get(currentKey);
        currentKey = `${prev.row},${prev.col}`;
        path.unshift(prev);
    }

    // Remove the starting position
    path.shift();

    // Add the final position
    path.push(current);

    return path;
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
    await moveCharacter(nextPos.row, nextPos.col);

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

// ===== Debug Function =====
function debugMaze() {
    console.log('Character Position:', gameState.characterPos);
    console.log('Hotspots:', HOTSPOTS);
    console.log('Discovered:', gameState.discoveredCount);
}

// Make debug function available globally
window.debugMaze = debugMaze;
