# Tic Tac Toe PvP

A lightweight, browser-based Tic Tac Toe game built using pure HTML, CSS, and JavaScript.
It focuses on player vs player gameplay, clean DOM-based logic, and a modular structure that keeps the project easy to read, modify, and extend.

Tic Tac Toe PvP runs fully offline, adapts smoothly to different screen sizes, and can be played instantly in any modern browser. It follows a structured versioning approach with both standalone and modular builds, making it suitable for learning, experimentation, and iterative development.

---

⚠️ Disclaimer
This project is currently under active development. It is not fully stable, and some features may be incomplete or behave inconsistently. Minor bugs, edge cases, or logic gaps may exist and are intentionally left as opportunities for exploration, debugging, and improvement.

---

## Usage

### Option 1 — Quick Use (Recommended)

1. Download `dist/tic-tac-toe-pvp.html`
2. Open it in any browser
3. Start playing immediately

* Works offline
* No installation required

---

### Option 2 — Development Mode

1. Clone the repository
2. Open:

```
src/index.html
```

3. Edit files inside the `src/` directory
4. Build the project when needed:

```
python scripts/build.py
```

Recommended for development, customization, and learning.

---

## Features

* Classic 3×3 Tic Tac Toe gameplay
* Player vs Player mode

  * X = First Player
  * O = Second Player
* Detects wins, draws, and ongoing states
* Highlights winning combinations
* Match progress tracking using progress bars
* Reset round or full match
* Optional non-match mode for casual play
* Multiple color themes for customization
* Sound effects for interactions
* Fully offline and self-contained

---

## Project Structure

```
tic-tac-toe-pvp/
│
├── index.html              # Entry / landing page
│
├── src/                    # Development source code
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── dist/                   # Final build (for users)
│   └── tic-tac-toe-pvp.html  # Single-file app
│
├── scripts/                # Build tools
│   └── build.py
│
├── README.md
├── LICENSE
└── .gitignore
```

---

### Build System

Run:

```
python scripts/build.py
```

This will:

* Combine HTML, CSS, and JavaScript
* Bundle everything into a single file
* Output the final build into the `dist/` directory

---

## Architecture Overview

This project uses two modes:

### Development Mode

* Modular structure inside `src/`
* Easier debugging and editing
* Ideal for learning and extending gameplay logic

### Production Mode

* Single-file build inside `dist/`
* Fully portable
* Offline-ready with no dependencies

---

## Technology Stack

* HTML5
* CSS3
* Vanilla JavaScript (DOM manipulation)

---

## Limitations

* No online multiplayer support
* No persistent storage of match history
* Some features may be incomplete or experimental
* Browser rendering may vary slightly across environments
* UI is intentionally minimal for clarity and learning

---

## Live Demo

Try it here:
https://akpandey-dev.github.io/tic-tac-toe-pvp

---

## Contributing

* Open for learning and experimentation
* Bugs may exist due to ongoing development
* Improvements, suggestions, and fixes are welcome

---

## License

This project is open for learning, modification, and experimentation.
