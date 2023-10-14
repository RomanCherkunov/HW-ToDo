require("module-alias/register");
require("./config");
require("./events");
const express = require("express");
const { todoUser } = require("./db/models");
// const todo = require('./db/models/todo')
const controllers = require("./controllers");
const wsServer = require("./wsServer");

const app = express();

if (typeof wsServer === "function") {
  wsServer(app);
}

app.use(express.json());

if (Array.isArray(controllers.private)) {
  controllers.private.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}

if (Array.isArray(controllers.public)) {
  controllers.public.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}

app.listen(8989, () => {
  console.log("Server started at PORT:  8989");
});

// console.log(
//   todoUser.findAll().then((data) => {
//     console.log(data.map((item) => item.toJSON()));
//   })
// );

// todoUser.create({
//   name: "new user test jwt",
//   login: "hwtUser",
//   password: "123",
// });

// todoUser.findAll().then(data => {
//     console.log(data.map(item => item.toJSON()))
// })

// good
//   .findAll({
//     include: [
//       {
//         association: new HasOne(good, storeSetting, {
//           sourceKey: "storeId",
//           foreignKey: "storeId",
//         }),
//       },
//     ],
//   })
//   .then((rows) => {
//     console.log(
//       rows.map((item) => ({
//         goodName: item.caption,
//         currency: item.storeSetting?.caption,
//         currencyDescription: item.storeSetting?.description,
//       }))
//     );
//   });
