    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameOver = false;

    const cells = document.querySelectorAll(".cell");
    const resetBtn = document.getElementById("reset");
    const statusText = document.getElementById("status");
    let Xwidth = 0;
    let Ywidth = 0;
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const progressPerWin = 10;

// Colourful X and O marks function----------
function applyColourfulMarks() {
  const colours = { X: "blue", O: "red" };

  cells.forEach((cell, index) => {
    if (board[index] !== "") {
      cell.style.color = colours[board[index]];
    }
  });
}

function removeColourfulMarks() {
  cells.forEach(cell => {
    cell.style.color = "white";
  });
}
//Sound effects Toggle----------------------

function enableSounds() {
  document.getElementById("won").muted = false;
}
function muteSounds() {
  document.getElementById("won").muted = true;
}


//------------------------------------------
function updateTurnIndicator() {
    if(settings.turnIndicator && !gameOver){
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

//------------------------------------------

function applyTurnIndicator() {
    if(settings.turnIndicator){
        // If on, show current player's turn
        statusText.style.display = "block";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        // If off, hide it
        statusText.style.display = "none";
    }
}

//-----------------------------------------
    function checkWin() {
      for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (settings.highlightWin) {  
              combo.forEach(index => {
            cells[index].style.backgroundColor = "green";
                });
           }
          gameOver = true;
          statusText.textContent = `${board[a]} Wins 🎉`;
          document.getElementById("won").play();
        }
      }

      if (!board.includes("") && !gameOver) {
        gameOver = true;
        statusText.textContent = "It's a Draw 😶";
      }

// Update progress ONLY if Match Mode is ON
if (gameOver && settings.matchMode) {

  if (statusText.textContent.includes("X Wins")) {
    Xwidth++;
    document.getElementById("myBar").style.width =
      (Xwidth * progressPerWin) + "%";
  }

  if (statusText.textContent.includes("O Wins")) {
    Ywidth++;
    document.getElementById("yourBar").style.width =
      (Ywidth * progressPerWin) + "%";
  }

  // Final match win
  if (Xwidth * progressPerWin >= 100 || Ywidth * progressPerWin >= 100) {
    let winner = Xwidth > Ywidth ? "X" : "O";
    statusText.textContent = `🎉 Player ${winner} is the Final Winner!`;
    resetBtn.style.backgroundColor = "red";
    resetBtn.textContent = "Restart Match";
    cells.forEach(cell => cell.style.pointerEvents = "none");

  }
}
    }




    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (board[index] === "" && !gameOver) {
          board[index] = currentPlayer;
          cell.textContent = currentPlayer;
          checkWin();
          if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator();
          }
        };
          if (settings.colourfulMarks) {
             applyColourfulMarks();
          }
      });
    });

    resetBtn.addEventListener("click", () => {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameOver = false;
      statusText.textContent = "Player X's turn";

      cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#333";
        cell.style.borderRadius = "0%";
        cell.style.pointerEvents = "auto";
      });

      cells.forEach(cell => cell.style.borderRadius = "50%");
      cells.forEach(cell => cell.style.backgroundColor = "purple");
setTimeout(() => {
  cells.forEach(cell => {
    cell.style.borderRadius = "8px";
    cell.style.backgroundColor = ""; // 🔥 clear inline override
  });

  // 🔁 Re-apply current theme
  const savedTheme = localStorage.getItem("uiTheme") || "d";
  applyTheme(savedTheme);

}, 600);

      if (Xwidth * progressPerWin >= 100 || Ywidth * progressPerWin >= 100) {
        // Full reset
        Xwidth = 0;
        Ywidth = 0;
        document.getElementById("myBar").style.width = "0%";
        document.getElementById("yourBar").style.width = "0%";
        resetBtn.style.backgroundColor = "#444";
        resetBtn.textContent = "Reset Round";
      }
    });

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

function navFunction(x) {
x.classList.toggle("change");
if (x.classList.contains("change")) {
openNav();
} else {
closeNav();
}
}




// Variable related to Options popup
let popupScreen = document.getElementsByClassName("optionTabScreen")[0];
let optionPopup  = document.getElementsByClassName("optionTab")[0];

// Close popup when clicking outside it
popupScreen.addEventListener("click", (event) => {
  if (event.target === popupScreen) popupScreen.style.display = "none";
});

// ===== SETTINGS DEFINITIONS + ACTIONS =====
const defaultSettings = {
  colourfulMarks: true,
  soundEffects: true,
  highlightWin: true,
  matchMode: true,
  turnIndicator: true
};

let settings = JSON.parse(localStorage.getItem("gameSettings"))
            || { ...defaultSettings };

function saveSettings() {
  localStorage.setItem("gameSettings", JSON.stringify(settings));
}

// ===== OPTION ACTIONS =====
const optionActions = {
  colourfulMarks: {
    onEnable: () => {
      console.log("Colourful Marks ENABLED");
      // applyColourfulMarks();
      applyColourfulMarks()
    },
    onDisable: () => {
      console.log("Colourful Marks DISABLED");
      // removeColourfulMarks();
      removeColourfulMarks()
    }
  },

  soundEffects: {
    onEnable: () => {
      console.log("Sound Effects ENABLED");
      // enableSounds();
      enableSounds();
    },
    onDisable: () => {
      console.log("Sound Effects DISABLED");
      // muteSounds();
      muteSounds();
    }
  },

  highlightWin: {
    onEnable: () => {
      console.log("Winning Highlight ENABLED");
    },
    onDisable: () => {
      console.log("Winning Highlight DISABLED");
    }
  },

  matchMode: {
    onEnable: () => {
      console.log("Match Mode ENABLED");
      const matchui = document.getElementById("matchUI")
    },
    onDisable: () => {
      console.log("Match Mode DISABLED");
    document.getElementById("matchUI").style.display = "none";
    } 
  },

  turnIndicator: {
    onEnable: () => {
      console.log("Turn Indicator ENABLED");
      applyTurnIndicator();
    },
    onDisable: () => {
      console.log("Turn Indicator DISABLED");
      applyTurnIndicator();
    }
  }
};

// ===== OPTIONS POPUP =====
function optionFunction() {
  popupScreen.style.display = "flex";
  optionPopup.innerHTML = "";

  const popupOptions = [
    ["colourfulMarks", "Colourful Marks"],
    ["soundEffects", "Sound Effects"],
    ["highlightWin", "Highlight Winning Combo"],
    ["matchMode", "Match Mode"],
    ["turnIndicator", "Turn Indicator"]
  ];

  popupOptions.forEach(([key, label]) => {
    let optionElement = document.createElement("div");

    optionElement.textContent =
      (settings[key] ? "✅ " : "❌ ") + label;

    optionElement.style.marginBottom = "15px";
    optionElement.style.fontSize = "12px";
    optionElement.style.cursor = "pointer";

    optionElement.addEventListener("click", () => {
      settings[key] = !settings[key];
      saveSettings();

      // 🔥 CALL ACTIONS
      if (settings[key]) {
        optionActions[key]?.onEnable?.();
      } else {
        optionActions[key]?.onDisable?.();
      }

      optionElement.textContent =
        (settings[key] ? "✅ " : "❌ ") + label;
    });

    optionPopup.appendChild(optionElement);
  });

  // ===== CLEAR SETTINGS =====
  let clearOption = document.createElement("div");
  clearOption.textContent = "🧹 Clear Settings";
  clearOption.style.marginTop = "20px";
  clearOption.style.fontSize = "12px";
  clearOption.style.color = "#ff6b6b";
  clearOption.style.cursor = "pointer";

  clearOption.addEventListener("click", () => {
    localStorage.removeItem("gameSettings");
    settings = { ...defaultSettings };
    optionFunction();
  });

  optionPopup.appendChild(clearOption);
}




let currentTheme = "Dark";
const themeDialog = document.getElementById("themeDialog");
const themeInput = document.getElementById("themeInput");
const currentThemeText = document.getElementById("currentThemeText");

const themes = {
  a: "Angel",
  l: "Light",
  i: "Hulk",
  c: "Carbon",
  d: "Dark",
  e: "Evil",
  h: "Hacker",
  p: "Pennywise",
  b: "Blood"
};




const themeMap = {
  a: { panel: "pink", back: "magenta", text: "blue" },
  l: { panel: "grey", back: "white", text: "black" },
  i: { panel: "green", back: "purple", text: "black"},
  c: { panel: "gray", back: "black", text: "royalblue" },
  d: { panel: "#333", back: "#111", text: "#f1f1f1" },
  e: { panel: "yellow", back: "#0a0a0a", text: "#ff1e1e" },
  h: { panel: "#333", back: "#0b0f0c", text: "#00ff00" },
  p: { panel: "#973636", back: "#fbfae2", text: "#fff200" },
  b: { panel: "white", back: "black", text: "red" }
};


function resetTheme() {
  applyTheme("d"); // Dark
  localStorage.removeItem("uiTheme");
}


function applyTheme(theme) {
  const colors = themeMap[theme];
  if (!colors) return;

  currentTheme = themes[theme];

  document.querySelectorAll(".ui-panel").forEach(el => {
    el.style.backgroundColor = colors.panel;
  });

  document.querySelectorAll(".ui-back").forEach(el => {
    el.style.backgroundColor = colors.back;
    el.style.color = colors.text;
  });

  document.querySelectorAll(".ui-text").forEach(el => {
    el.style.color = colors.text;
  });

  document.querySelectorAll(".ui-button").forEach(el => {
    el.style.backgroundColor = colors.panel;
    el.style.color = colors.text;
  });

  currentThemeText.textContent = `Current theme is ${currentTheme}`;

    // ✅ NEW (persistence)
  localStorage.setItem("uiTheme", theme);

}


function themeImplierOpen() {
  themeInput.value = "";
  themeDialog.showModal();
}

document.getElementById("applyThemeBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const userTheme = themeInput.value.trim().toLowerCase();

  if (userTheme === "r") {
    resetTheme();
    themeDialog.close();
  } else if (themes[userTheme]) {
    applyTheme(userTheme);
    themeDialog.close();
  } else {
    alert("Invalid theme code!");
  }
});


//=========Bonus Theme=============//

function bonusTheme(){
  //Currently not implemented, I am trying to upload it soon!
  window.alert("Coming soon!")
}

//======== More From Us Function ========//

function moreFromUs() {

  let moreFromUsText = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>More From Us</title>
</head>

<body style="
  margin:0;
  padding:20px;
  font-family:system-ui, sans-serif;
  background:#0f0f0f;
  color:#eaeaea;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
">

  <div style="
    max-width:600px;
    background:#1a1a1a;
    padding:24px;
    border-radius:12px;
    box-shadow:0 0 20px rgba(0,0,0,0.6);
  ">

    <h2 style="
      margin-top:0;
      text-align:center;
      letter-spacing:1px;
    ">
      More From Us
    </h2>

    <p style="line-height:1.6;">
      We don’t just build projects — we build <strong>experiments</strong>.
    </p>

    <p style="line-height:1.6;">
      Every project you see is part of a learning loop:
      build → break → improve.
      Clean logic, readable code, and full control always come first.
    </p>

    <p style="line-height:1.6;">
      What you’ll find here:
    </p>

    <ul style="line-height:1.8; padding-left:20px;">
      <li>Interactive games and tools</li>
      <li>UI and logic experiments</li>
      <li>Developer-focused utilities</li>
      <li>Ideas pushed beyond tutorials</li>
    </ul>

    <p style="line-height:1.6;">
      This space keeps evolving — sharper logic, stronger systems,
      and better decisions with every iteration.
    </p>

    <p style="line-height:1.6;">
    <ul style="line-height:1.8; padding-left:20px;">
      <li>Chemistry Explorer, if you want to study elements</li>
      <li>Tic-Tac-Toe Bot, if you liked this project</li>
      <li>VoidCode, Ace or Monaco editions</li>
      <li>Compact text editor in HTML format</li>
      <li>Live HTML editor, see output quickly with a button</li>
    </ul>
    </p>

    <p style="
      text-align:center;
      margin-top:24px;
      font-style:italic;
      opacity:0.85;
    ">
      Stay curious. Keep building.
    </p>

  </div>

</body>
</html>
  `;

  let win = window.open("", "_blank");
  win.document.write(moreFromUsText);
  win.document.close();
}

//=======About Function==========//

//======== About Function ========//

function aboutFunc() {

  // Prevent multiple overlays
  if (document.getElementById("aboutOverlay")) return;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "aboutOverlay";

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.backdropFilter = "blur(6px)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  // Create content box
  const box = document.createElement("div");

  box.style.background = "#111";
  box.style.color = "#f1f1f1";
  box.style.padding = "24px";
  box.style.width = "70vw";
  box.style.maxWidth = "600px";
  box.style.maxHeight = "80vh";
  box.style.overflowY = "auto";
  box.style.borderRadius = "14px";
  box.style.boxShadow = "0 0 25px rgba(0,0,0,0.8)";
  box.style.fontFamily = "system-ui, sans-serif";

  box.innerHTML = `
    <h2 style="margin-top:0; text-align:center;">About Tic Tac Toe</h2>

    <p style="line-height:1.6;">
      Tic Tac Toe is a classic two-player strategy game where players take turns
      marking a 3×3 grid with <strong>X</strong> or <strong>O</strong>.
      The goal is simple — be the first to align three of your marks
      horizontally, vertically, or diagonally.
    </p>

    <h3>How to Play</h3>
    <ul style="line-height:1.7; padding-left:20px;">
      <li>Player X always starts the game</li>
      <li>Players take turns selecting empty cells</li>
      <li>The game ends when a player forms a line of three</li>
      <li>If the board fills with no winner, the round is a draw</li>
    </ul>

    <h3>Features</h3>
    <ul style="line-height:1.7; padding-left:20px;">
      <li>Clean and responsive user interface</li>
      <li>Theme system with multiple visual styles</li>
      <li>Round reset and live status updates</li>
      <li>Match progress tracking</li>
    </ul>

    <h3>Why This Game Exists Digitally</h3>
    <p style="line-height:1.6;">
      This project was created to explore logic building, UI interaction,
      and dynamic state handling in a simple yet meaningful way.
      Turning classic games into electronic form allows us to experiment,
      improve, and learn through real interaction instead of static examples.
    </p>

    <p style="line-height:1.6; margin-top:16px;">
      You can explore more projects and experiments by selecting
      <strong>“More From Us”</strong> from the sidebar.
    </p>

    <div style="text-align:center; margin-top:20px;">
      <button id="closeAboutBtn"
        style="
          padding:8px 20px;
          border:none;
          border-radius:8px;
          cursor:pointer;
          background:#333;
          color:#fff;
        ">
        Close
      </button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Close handler
  document.getElementById("closeAboutBtn").onclick = () => {
    overlay.remove();
  };
}


// ===== APPLY SAVED SETTINGS ON LOAD =====
Object.keys(settings).forEach(key => {
  if (settings[key]) {
    optionActions[key]?.onEnable?.();
  } else {
    optionActions[key]?.onDisable?.();
  }
});

(function initTheme() {
  const savedTheme = localStorage.getItem("uiTheme");
  if (savedTheme && themeMap[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    applyTheme("d"); // default Dark
  }
})();

