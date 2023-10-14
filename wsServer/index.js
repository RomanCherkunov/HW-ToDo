const expressWs = require("express-ws");
const { jwtValidate } = require("@utils");

module.exports = (app) => {
  expressWs(app, undefined, {wsOptions: {verifyClient: (data, next) => {

    const query = new URLSearchParams(data.req.url.split('?')[1])
    
    next(!!jwtValidate(query.get('token')))
  }}});

  const clients = {}

  app.ws("/ws/user", (wsClient) => {

    const id = Math.floor((Math.random()*1000))
    console.log('new client:  ', id)

    clients[id] = wsClient

    wsClient.on("message", (data) => {
      console.log(data, id);
      process.myEvents.emit("wsData", {
        data,
        send: (sendData) => {
          wsClient.send(sendData);
        },
      });
    });

    wsClient.on("close", () => {
      console.log("client connect closed ", id);
      delete clients[id]
    });
  });
};
