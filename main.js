const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const pkg = require("./package.json");

// App updater (checks for new releases)
const setupUpdater = require("./src/system/updater");

// AppImage builds require sandbox disabled (Linux portability)
if (process.env.APPIMAGE) {
  app.commandLine.appendSwitch("no-sandbox");
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      // Preload isolates IPC and exposes a safe API to the renderer
      preload: path.join(__dirname, "src/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  // Uncomment when we make frameless
  // mainWindow.setMenu(null);
  // mainWindow.setMenuBarVisibility(false);
  // mainWindow.setAutoHideMenuBar(true);

  // Hook for unsaved‑changes or shutdown prompts
  mainWindow.on("close", () => {
    console.log("Window is closing");
  });

  // Load the main UI
  mainWindow.loadFile("src/index.html");

  // Initialize auto‑update system (safe‑guarded)
  if (typeof setupUpdater === "function") {
    setupUpdater(mainWindow);
  }
}

app.whenReady().then(createWindow);

// Standard Electron behaviour for non‑macOS platforms
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// --------------------------------------------------
// Version metadata exposed to the renderer via IPC
// --------------------------------------------------
ipcMain.handle("get-version", async () => {
  return {
    version: pkg.version,
    stage: pkg.buildStage,
    date: pkg.releaseDate
  };
});