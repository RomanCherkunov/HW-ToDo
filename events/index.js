const { EventEmitter } = require("events");

class MyEvents extends EventEmitter {}

const myEvents = new MyEvents();

myEvents.on("roman", () => {
  console.log("roman event");
});
myEvents.on("roman", () => {
  console.log("roman event 2");
});


process.myEvents = myEvents

myEvents.emit("roman");

module.exports = myEvents