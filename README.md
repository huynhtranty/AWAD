## Self-Evaluation Report: Tic-Tac-Toe
#### Student Information

* **Student Name**: Huỳnh Trần Ty
* **Student ID**: 22120418


### Feature 1: Current Move Display (1.8 points)
* Status: COMPLETED

* Location: App.jsx:129-138
* Shows "You are at move #..." instead of button for current move
* Score: 1.8/1.8

### Feature 2: Board Generation with Loops (1.8 points)
* Status: COMPLETED

* Location: App.jsx:48-71
* Uses 2 nested loops (rows and columns) instead of hardcoding
* Score: 1.8/1.8

### Feature 3: Sort Toggle Button (1.8 points)
* Status: COMPLETED

* Location: App.jsx:240-246, App.jsx:155
* Toggle button switches between ascending/descending order
* Score: 1.8/1.8

### Feature 4: Win Highlighting & Draw Message (1.8 points)
* Status: COMPLETED

* Location: App.jsx:17, App.jsx:83-86, App.jsx:292-294
* Winning squares highlighted with green background and pulse animation
* Displays "Draw: No winner!" when applicable
* Score: 1.8/1.8

### Feature 5: Move Location Display (1.8 points)
* Status: COMPLETED

* Location: App.jsx:119-126
* Displays location (row, col) format for each move
* Score: 1.8/1.8

### Feature 6: Upload to Public Host (1 point)
* Status: COMPLETED

* Link: https://effervescent-torte-619e9f.netlify.app/
* Score: 1/1


### Summary
#### Total Score: 10.0/10.0 (100%)
* All 6 required features completed
* High-quality code with modern UI using Tailwind CSS
* Responsive design with accessibility support

Final Result: 10.0/10.0 points

---

## Detailed Function Documentation

### Core Components

#### 1. **Square Component** (App.jsx:5-29)
```javascript
function Square({ value, onSquareClick, isWinning, disabled })
```
**Purpose:** Renders individual square button on the game board

**Parameters:**
- `value`: Current square value ('X', 'O', or null)
- `onSquareClick`: Click handler function
- `isWinning`: Boolean to highlight winning squares
- `disabled`: Disables click when game is over

**Features:**
- Dynamic styling with Tailwind CSS
- Hover effects on empty squares
- Green background with pulse animation for winning squares
- Color-coded text (X=blue, O=red)
- Accessibility with ARIA labels

#### 2. **Board Component** (App.jsx:31-102)
```javascript
function Board({ xIsNext, squares, onPlay, winningSquares })
```
**Purpose:** Renders the 3x3 game board and manages square clicks

**Key Functions:**
- `handleClick(i)`: Validates and processes square clicks
  - Prevents moves if game is won or square is filled
  - Creates new array with updated square
  - Calls `onPlay` to update game state

**Board Generation:**
- Uses nested loops (App.jsx:48-71):
  ```javascript
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
    }
  }
  ```
- Dynamically generates all 9 squares
- Uses `useMemo` for performance optimization

**Game Status Display:**
- Shows winner with color-coded player name
- Displays "Draw: No winner!" message when board is full
- Shows "Next Player: X/O" during gameplay

#### 3. **MoveHistory Component** (App.jsx:104-168)
```javascript
function MoveHistory({ history, currentMove, onJumpTo, isAscending })
```
**Purpose:** Displays move history with time travel functionality

**Key Features:**
- **Move List Generation:**
  - Calculates row/col for each move: `Math.floor(move/3)`, `move % 3`
  - Formats as "Move #X (row, col)"
  - Shows "Game start" for initial state

- **Current Move Highlighting:**
  - Displays "You are at move #X" as text (not button)
  - Blue background to distinguish from clickable moves

- **Sort Functionality:**
  - Toggles between ascending/descending order
  - `isAscending ? moves : [...moves].reverse()`

- **Auto-scroll:**
  - Uses `useRef` and `useEffect`
  - Scrolls to bottom in ascending mode when new moves added

#### 4. **Game Component** (App.jsx:170-275)
```javascript
function Game()
```
**Purpose:** Main component managing game state and layout

**State Management:**
```javascript
const [history, setHistory] = useState([...])  // Move history
const [currentMove, setCurrentMove] = useState(0)  // Current position
const [isAscending, setIsAscending] = useState(true)  // Sort order
```

**Derived State:**
- `xIsNext`: Calculated from `currentMove % 2 === 0`
- `currentSquares`: Extracted from history array
- `winnerInfo`: Calculated using `useMemo` for performance

**Event Handlers:**

1. **handlePlay(nextSquares, squareIndex):**
   - Truncates history after current move
   - Adds new move to history
   - Advances to next move

2. **jumpTo(nextMove):**
   - Time travel to specific move
   - Updates `currentMove` state

3. **toggleSortOrder():**
   - Toggles between ascending/descending
   - Updates `isAscending` state

4. **resetGame():**
   - Resets to initial game state
   - Clears all history

**Layout:**
- Responsive grid layout (1 column mobile, 3 columns desktop)
- Board section (2 columns on large screens)
- History sidebar (1 column)
- Gradient background with rounded cards

### Helper Functions

#### 5. **calculateWinner Function** (App.jsx:278-297)
```javascript
function calculateWinner(squares)
```
**Purpose:** Determines if there's a winner and returns winning information

**Logic:**
- Checks all 8 possible winning lines:
  - 3 horizontal rows: [0,1,2], [3,4,5], [6,7,8]
  - 3 vertical columns: [0,3,6], [1,4,7], [2,5,8]
  - 2 diagonals: [0,4,8], [2,4,6]

**Returns:**
- `{ winner: 'X'|'O', line: [a, b, c] }` if winner found
- `null` if no winner

**Usage:**
- Determines game winner
- Provides winning square indices for highlighting
- Used to disable board when game is over

---

## Technical Implementation Details

### React Hooks Used:
1. **useState** - State management for history, moves, sort order
2. **useMemo** - Performance optimization for winner calculation and board rendering
3. **useEffect** - Auto-scroll behavior in move history
4. **useRef** - DOM reference for scroll container

### Styling Approach:
- **Tailwind CSS** utility classes
- **Responsive Design** with breakpoints (sm:, lg:)
- **Animations** using Tailwind's animate utilities
- **Custom Colors** defined in tailwind.config.js

### Accessibility Features:
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators with ring utilities
- Semantic HTML structure

### Performance Optimizations:
- `useMemo` to prevent unnecessary recalculations
- Proper key props in lists
- Conditional rendering to minimize DOM updates