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

    document.getElementsByClassName("board")[0].style.backgroundColor =
      winner === "X" ? "blue" : "red";

    setTimeout(() => {
      document.getElementsByClassName("board")[0].style.backgroundColor = "#1e1e1e";
    }, 1000);
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
        cells.forEach(cell => cell.style.borderRadius = "8px");
        cells.forEach(cell => cell.style.backgroundColor = "#333");
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
      matchui.style.display = "block";
      matchui.style.marginTop = "10px";
      matchui.style.width = "100%";

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
    optionElement.style.color = "white";
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
  c: "Carbon",
  d: "Dark",
  h: "Hacker",
  b: "Blood"
};




const themeMap = {
  a: { panel: "pink", back: "magenta", text: "blue" },
  l: { panel: "grey", back: "white", text: "black" },
  c: { panel: "gray", back: "black", text: "royalblue" },
  d: { panel: "#333", back: "#111", text: "#f1f1f1" },
  h: { panel: "#333", back: "#111", text: "#00ff00" },
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