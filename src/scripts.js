// imports will need to be updated
import { initTheme } from './ui/theme.js';
import { setupChat } from './ai/chat.js';
import { initSidebars } from './ui/sidebar.js';
import { initSettingsUI } from './ui/settings.js';
import { initUpdaterUI } from "./ui/updater.js";
import { initSystemStatus } from "./ui/systemStatus.js";
import { initChatHistoryUI } from "./ui/chatHistory.js";



// updater 
document.addEventListener("DOMContentLoaded", () => {
    initUpdaterUI();
});


document.addEventListener('DOMContentLoaded', () => {
    console.log("ZiaStudio Initialized");

    initSidebars();
    initSettingsUI();
    initTheme();
    setupChat();
    initSystemStatus();
    initChatHistoryUI();



    if (window.electronAPI) {
        window.electronAPI.getVersion().then(data => {
            const versionString = `ZiaStudio ${data.version} (${data.stage}) — ${data.date}`;
            document.getElementById('versionTag').innerText = versionString;
        });
    }
});