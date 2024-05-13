var fs = require("fs");
var Datastore = require("nedb");
var db = new Datastore({ filename: "data.db", autoload: true });

// Express is a node module for building HTTP servers
var express = require("express");
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static("public"));

// If the user just goes to the "route" / then run this function
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Here is the actual HTTP server
var http = require("http");
// We pass in the Express object
var httpServer = http.createServer(app);
// Listen on port provided by Glitch
httpServer.listen(process.env.PORT);

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require("socket.io")(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log(socket.id + " has joined the chat.");

    //socket.color = Math.floor(Math.random() * 255);

    db.find({})
      .sort({ timestamp: 1 })
      .exec(function (err, docs) {
        //db.find({}, function(err, docs) {
        // Loop through the results, send each one as if it were a video file
        for (var i = 0; i < docs.length; i++) {
          socket.emit("video", docs[i]);
        }
      });

    socket.on("message", function (data) {
      //io.emit("mouse", data);
      var datatosave = {
        //username: data.username,
        username: data.username,
        message: data.message,
        boxColor: data.boxColor,
        textColor: data.textColor,
        timestamp: Date.now(),
      };
      io.emit("message", data);
      db.insert(datatosave, function (err, newDocs) {
        console.log("err: " + err);
        console.log("newDocs: " + newDocs);
      });
    });

    socket.on("disconnect", function () {
      console.log(socket.id + " has disconnected.");
    });
  }
);
