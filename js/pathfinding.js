// A* pathfinding with optional teleportation support via "black holes"
// This module is intentionally decoupled from DOM and state.
// Call findPath(startRow, startCol, endRow, endCol, isValidMove, blackHoles)
// - isValidMove(row, col) => boolean
// - blackHoles: [{ row, col, linkedTo: {row, col} }, ...]

function heuristic(row1, col1, row2, col2, blackHoles) {
    // If at a black hole, be conservative to explore teleportation
    const isBlackHole = blackHoles && blackHoles.some(bh => bh.row === row1 && bh.col === col1);
    if (isBlackHole) return 0;

    // Compare direct Manhattan distance vs shortest via any teleport pair
    let minViaTeleport = Infinity;
    if (blackHoles && blackHoles.length > 0) {
        for (const bh of blackHoles) {
            const distToHole = Math.abs(row1 - bh.row) + Math.abs(col1 - bh.col);
            const distFromPair = Math.abs(bh.linkedTo.row - row2) + Math.abs(bh.linkedTo.col - col2);
            const totalViaTeleport = distToHole + 1 + distFromPair; // +1 cost for teleport
            if (totalViaTeleport < minViaTeleport) {
                minViaTeleport = totalViaTeleport;
            }
        }
    }
    const direct = Math.abs(row1 - row2) + Math.abs(col1 - col2);
    return Math.min(direct, minViaTeleport);
}

function getNeighbors(row, col, isValidMove, blackHoles) {
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

    // Teleport neighbor if standing on a black hole
    const blackHole = blackHoles && blackHoles.find(bh => bh.row === row && bh.col === col);
    if (blackHole && isValidMove(blackHole.linkedTo.row, blackHole.linkedTo.col)) {
        neighbors.push({
            row: blackHole.linkedTo.row,
            col: blackHole.linkedTo.col,
            isTeleport: true
        });
    }
    return neighbors;
}

function reconstructPath(cameFrom, current) {
    const nodes = [];
    let currentKey = `${current.row},${current.col}`;
    while (cameFrom.has(currentKey)) {
        const cameFromEntry = cameFrom.get(currentKey);
        nodes.unshift({
            row: current.row,
            col: current.col,
            isTeleport: cameFromEntry.isTeleport || false
        });
        current = { row: cameFromEntry.row, col: cameFromEntry.col };
        currentKey = `${current.row},${current.col}`;
    }
    // Add the start node (no teleport for initial)
    nodes.unshift({ row: current.row, col: current.col, isTeleport: false });
    // Drop the starting position so the path only includes moves
    nodes.shift();
    return nodes;
}

export function findPath(startRow, startCol, endRow, endCol, isValidMove, blackHoles = []) {
    const openSet = [];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    const inOpenSet = new Set();

    const startKey = `${startRow},${startCol}`;
    const endKey = `${endRow},${endCol}`;

    openSet.push({ row: startRow, col: startCol });
    inOpenSet.add(startKey);
    gScore.set(startKey, 0);
    fScore.set(startKey, heuristic(startRow, startCol, endRow, endCol, blackHoles));

    while (openSet.length > 0) {
        openSet.sort((a, b) => {
            const aKey = `${a.row},${a.col}`;
            const bKey = `${b.row},${b.col}`;
            return (fScore.get(aKey) ?? Infinity) - (fScore.get(bKey) ?? Infinity);
        });
        const current = openSet.shift();
        const currentKey = `${current.row},${current.col}`;
        inOpenSet.delete(currentKey);

        if (currentKey === endKey) {
            const path = reconstructPath(cameFrom, current);
            return path;
        }

        const neighbors = getNeighbors(current.row, current.col, isValidMove, blackHoles);
        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.row},${neighbor.col}`;
            const tentativeGScore = (gScore.get(currentKey) ?? Infinity) + 1;
            const existingGScore = gScore.get(neighborKey);
            if (existingGScore !== undefined && tentativeGScore >= existingGScore) {
                continue;
            }
            if (!inOpenSet.has(neighborKey)) {
                openSet.push(neighbor);
                inOpenSet.add(neighborKey);
            }
            cameFrom.set(neighborKey, {
                row: current.row,
                col: current.col,
                isTeleport: neighbor.isTeleport
            });
            gScore.set(neighborKey, tentativeGScore);
            fScore.set(neighborKey, tentativeGScore + heuristic(neighbor.row, neighbor.col, endRow, endCol, blackHoles));
        }
    }
    return null;
}


