var socket = io.connect();
let message = socket.on("connect", function () {
  console.log("Connected");
});

socket.on("message", function (message) {
  console.log(message);

  var d = document.createElement("DIV");
  d.innerHTML = message.chatMessage;
  //did.innerHTML = message.username + ": " + message.chatMessage;
  document.getElementById("chatDiv").prepend(d);
  d.classList.add("messages");
  d.style.backgroundColor = message.boxColor;
  d.style.color = message.textColor;
  // d.style.backgroundCOlor =

  // var v = document.createElement("video");
  // v.src = file;
  // v.controls = true;
  // document.body.appendChild(v);
});

// This array will contain "chunks" of the video captured by the MediaRecorder
let userDiv;
let messageDiv;
let boxColorDiv;
let textColorDiv;
var button;
var canvas;
var stream;

let userStuff;
let username;
let boxColorPicker;
let textColorPicker;
let colorDiv;
function setup() {
  //boxColorDiv = select("#boxColorDiv");
  colorDiv = select("#colorDiv");

  // canvas = createCanvas(400, 400);
  boxColorPicker = createColorPicker("#ed225d");
  boxColorPicker.id("boxColor");
  boxColorPicker.parent(colorDiv);

  textColorPicker = createColorPicker("#e0faFF");
  textColorPicker.id("textColor");
  textColorPicker.parent(colorDiv);

  userDiv = select("#userDiv");
  messageDiv = select("#messageDiv");
  messageDiv.hide();

  username = document.getElementById("username");
  username.addEventListener("keyup", onMyKeyPress);
  userStuff = document.getElementById("userStuff");
  userStuff.addEventListener("keyup", messageKeyPress);
}

function draw() {}

function userPutStuff() {
  let boxColor = boxColorPicker.value();
  let textColor = textColorPicker.value();
  let msg = document.getElementById("userStuff").value;
  if (msg != "") {
    socket.emit("message", {
      username: username,
      chatMessage: msg,
      boxColor: boxColor,
      textColor: textColor,
    });
    console.log(msg);
    document.getElementById("userStuff").value = "";
  } else {
    alert("Please Enter a Message");
  }
}

function onMyKeyPress(e) {
  if (e.key === "Enter") {
    userID();
  }
}
function messageKeyPress(f) {
  if (f.key === "Enter") {
    userPutStuff();
  }
}

function userID() {
  //    <input id="username" type="text" placeholder="Username" />

  username = select("#username").value();
  if (username != "") {
    //colorDiv.hide();
    userDiv.hide();
    messageDiv.show();

    //document.getElementById("boxColorText").remove()
  } else {
    alert("Please set a username and pick a color");
  }
}
