// Alias wrapper for document.getElementById()
function $(elid) {
    return document.getElementById(elid);
}

// Styles the cursor to the initial state on window load
let cursor;
window.onload = init;

// Styles the cursor to be indented 0px
function init() {
    cursor = $("cursor");
    cursor.style.left = "0px";
}

// Globally removes newline characters from the given string
function nl2br(txt) {
    return txt.replace(/\n/g, '');
}

// Takes keyboard text input and renders it in the typer span
function typeIt(from, e) {
    e = e || window.event;
    let w = $("typer");
    let tw = from.value;
    if (!pw) {
        w.innerHTML = nl2br(tw);
    }
}

// Moves the cursor when left and right arrow keys are pressed
function moveIt(count, e) {
    e = e || window.event;
    let keycode = e.keyCode || e.which;
    if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
        cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
    } else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
        cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
    }
}

// Displays the given text in the console
function alert(txt) {
    console.log(txt);
}