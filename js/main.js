// Global variables
let before = document.getElementById("before");
let liner = document.getElementById("liner");
let command = document.getElementById("typer");
let textarea = document.getElementById("texter");
let terminal = document.getElementById("terminal");

let git = 0;
id = "visitor@wanadam:~$ "
let pw = false;
let pwd = false;
let animation = true;
let admin = false;
let commands = [];

let body = document.body;

setTimeout(function() {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log("You hacked my password! ");
console.log("Password: " + password + " - I wonder what it does?");

// Init
textarea.value = "";
command.innerHTML = textarea.value;

// Track and respond to key presses
function enterKey(e) {
    // 181: audio volume mute
    if (e.keyCode == 181) {
        document.location.reload(true);
    }
    if (pw) {
        let et = "*";
        let w = textarea.value.length;
        // Hide password with * characters
        command.innerHTML = et.repeat(w);
        // If the password has been entered correctly, toggle pwd to true
        if (textarea.value === password) {
            pwd = true;
        }
        // 13: enter
        if (pwd && e.keyCode == 13) {
            // Display the secret
            loopLines(secret, "color2 margin", 120);
            command.innerHTML = "";
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLine("Wrong password", "error", 0);
            command.innerHTML = "";
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }
    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;
            addLine(id + command.innerHTML, "no-animation", 0);
            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
        }
        // 38: arrow up
        if (e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.value = commands[git];
            command.innerHTML = textarea.value;
        }
        // 40: arrow down
        if (e.keyCode == 40 && git != commands.length) {
            git += 1;
            if (commands[git] === undefined) {
                textarea.value = "";
            } else {
                textarea.value = commands[git];
            }
            command.innerHTML = textarea.value;
        }
    }
}

// Switch statement to handle commands
function commander(cmd) {
    switch (cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "whois":
            loopLines(whois, "color2 margin", 80);
            break;
        case "sudo":
            if (admin) {
                addLine("You win, here's a cookie 🍪!", "color2", 80);
            } else {
                addLine("Wait, you're not admin...", "color2", 80);
                setTimeout(function() {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                }, 1000);
            }
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "secret":
            liner.classList.add("password");
            pw = true;
            break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
        case "password":
            addLine("<span class=\"inherit\"> You\'re gonna have to try harder than that!</span>", "error", 100);
            break;
        case "history":
            addLine("<br>", "", 0);
            loopLines(commands, "color2", 80);
            addLine("<br>", "command", 80 * commands.length + 50);
            break;
        case "email":
            addLine('Opening mailto:<a href="mailto:wnadam96@gmail.com">wnadam96@gmail.com</a>...', "color2", 80);
            newTab(email);
            break;
        case "clear":
            setTimeout(function() {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
            break;
        case "banner":
            loopLines(banner, "", 80);
            break;
            // socials
        case "linkedin":
            addLine("Opening LinkedIn...", "color2", 0);
            newTab(linkedin);
            break;
        case "instagram":
            addLine("Opening Instagram...", "color2", 0);
            newTab(instagram);
            break;
        case "github":
            addLine("Opening GitHub...", "color2", 0);
            newTab(github);
            break;
        case "anim":
            animation = !animation;
            state = "on";

            if (!animation) {
                state = "off";
            }

            addLine(`Toggling settings...animations are ${state}`, "color2 ", 0);
            break;
        case "mode":
            body.classList.toggle("light");
            let index = document.getElementsByClassName("index")[0];
            index.classList.toggle("index-light");
            addLine("Switching mode...", "color2", 0);
            break;
        case "other":
            addLine("Opening my other site...", "color2", 0);
            newTab(otherSite);
            break;
        case "pwd":
            addLine("/Users/visitor/admin-command:hire-me", "color2", 0);
            break;
        case "hire-me":
            admin = true;
            id = "admin@jasonzhang.com:~$ ";
            liner.classList.add("admin")
            addLine("Welcome, admin...", "color2", 0);
            break;
        default:
            addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            break;
    }
}

// Opens the given link in a new tab in the browser
function newTab(link) {
    setTimeout(function() {
        window.open(link, "_blank");
    }, 500);
}

// Renders a new line with the given text, style, and time delay to the terminal display
function addLine(text, style, time) {
    if (!animation) {
        time = 0;
        style = `${style} no-animation`
    }

    let t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            // Add non-breaking spaces to render double space characters in browser
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function() {
        // Create a p-tag element and add text and style
        let next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        // Insert the created p-tag in front of the before a-tag
        before.parentNode.insertBefore(next, before);

        // Scrolls the window along with text rendering for smooth transition
        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

// Dynamically render lines
// name: array of text to render
// style: styling of text
// time: ms of delay
// Loops through each item of the given text array
function loopLines(name, style, time) {
    // Render with animation if toggle is on false
    if (!animation) {
        name.forEach(function(item, index) {
            addLine(item, style, 0);
        });
    } else {
        name.forEach(function(item, index) {
            addLine(item, style, index * time);
        });
    }
}