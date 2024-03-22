let isDarkMode =
    localStorage.getItem("isDarkMode") === "true" ||
    (!("isDarkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

function applyTheme() {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("isDarkMode", isDarkMode);
}

applyTheme();

document.querySelector("#toggle-theme").addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    applyTheme();
});