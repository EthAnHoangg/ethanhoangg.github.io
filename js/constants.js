// Centralized constants and static data used across the maze app
// This keeps the main logic file focused on behavior and UI wiring.

export const CONFIG = {
    gridCols: 12,
    gridRows: 11,
    cellSize: 60,
    characterSize: 52,
    moveSpeed: 150, // ms per cell (faster!)
};

export const MAZE_LAYOUT = [
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

export const HOTSPOTS = [
    { row: 2, col: 1, type: 'about', icon: '\uf007', discovered: false, title: 'About Me', description: 'Learn about my background and expertise' },
    { row: 2, col: 6, type: 'experience', icon: '\uf0b1', discovered: false, title: 'Work Experience', description: 'My professional journey in AI & ML' },
    { row: 3, col: 3, type: 'education', icon: '\uf19d', discovered: false, title: 'Education', description: 'Academic background and qualifications' },
    { row: 7, col: 7, type: 'skills', icon: '\uf121', discovered: false, title: 'Technical Skills', description: 'Technologies and tools I work with' },
    { row: 9, col: 5, type: 'blog', icon: '\uf781', discovered: false, title: 'Blog & Writing', description: 'Technical articles and research insights' },
    { row: 3, col: 9, type: 'projects', icon: '\uf542', discovered: false, title: 'Featured Projects', description: 'Explore my recent work and research' },
    { row: 6, col: 1, type: 'references', icon: '\uf508', discovered: false, title: 'References', description: 'Professional recommendations' },
    { row: 8, col: 3, type: 'contact', icon: '\uf0e0', discovered: false, title: 'Get In Touch', description: 'Contact information and social links' },
];

export const END_GOAL = {
    row: 9,
    col: 1,
    icon: '\uf091', // Trophy icon
    title: 'Finish',
    description: 'Complete your journey'
};

// Known optimal solution steps for this maze
export const OPTIMAL_STEPS = 34;

export const BLACK_HOLES = [
    { row: 3, col: 7, linkedTo: { row: 6, col: 6 }, icon: '\uf0c1', name: 'Portal A' },
    { row: 6, col: 6, linkedTo: { row: 3, col: 7 }, icon: '\uf0c1', name: 'Portal B' }
];

export const HIGHLIGHT_CELLS = [
    { row: 1, col: 1 }, { row: 1, col: 3 },
    { row: 2, col: 1 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 }, { row: 2, col: 9 },
    { row: 3, col: 1 }, { row: 3, col: 5 }, { row: 3, col: 7 }, { row: 3, col: 9 },
    { row: 4, col: 1 }, { row: 4, col: 5 }, { row: 4, col: 7 }, { row: 4, col: 9 },
    { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 9 },
    { row: 7, col: 1 }, { row: 7, col: 3 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 }, { row: 7, col: 9 },
    { row: 8, col: 1 }, { row: 8, col: 2 }, { row: 8, col: 3 }, { row: 8, col: 5 }, { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 8, col: 9 },
    { row: 9, col: 1 }, { row: 9, col: 3 }, { row: 9, col: 5 }, { row: 9, col: 8 }, { row: 9, col: 9 },
];

export const tutorialSteps = [
    { 
        step: 1, 
        title: 'Welcome to the Maze!', 
        description: 'Tap on adjacent cells (up, down, left, right) to move your character one step at a time.', 
        tip: 'Use Arrow Keys or WASD on desktop!', 
        mobileTip: 'Tap adjacent cells to move!',
        highlightElement: '#character', 
        calloutPosition: 'center' 
    },
    { 
        step: 2, 
        title: 'AI Pathfinding Assistant', 
        description: 'Toggle the AI button to enable automatic pathfinding. When enabled, tap anywhere and your character finds the best route!', 
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


