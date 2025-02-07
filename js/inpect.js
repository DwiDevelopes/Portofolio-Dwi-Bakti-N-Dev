  // Mendeteksi saat developer tools dibuka
  function detectDevTools() {
    const devTools = /./;
    devTools.toString = function() {
    };

    console.log(devTools);
}

window.onload = function() {
    detectDevTools();
};

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Mencegah penggunaan F12 atau shortcut lainnya
document.onkeydown = function(event) {
    if (event.key === "F12" || event.ctrlKey && event.shiftKey && event.key === "I" || event.ctrlKey && event.shiftKey && event.key === "J") {
        event.preventDefault(); // Menonaktifkan F12 dan shortcut developer tools lainnya
    }
};