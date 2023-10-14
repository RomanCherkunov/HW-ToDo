const { EventEmitter } = require("events");

class MyEvents extends EventEmitter {}

const myEvents = new MyEvents();

myEvents.on("roman", () => {
  console.log("roman event");
});
myEvents.on("roman", () => {
  console.log("roman event 2");
});

myEvents.on("wsData", ({data, send}) => {
  send('pong:  ' + data)
});
myEvents.on("wsData", ({data, send}) => {
  send('pong 1 more :  ' + data)
});


process.myEvents = myEvents

myEvents.emit("roman");

module.exports = myEvents