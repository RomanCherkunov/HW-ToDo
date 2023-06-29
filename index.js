require('./config')
const express = require('express')
const controllers = require('./controllers')
const todoUser = require('./db/models/todoUser')
const todo = require('./db/models/todo')

const app = express()
app.use(express.json())


if(Array.isArray(controllers)) {
    controllers.forEach(item => {
        if(item.name && item.router) {
            app.use(item.name, item.router)
        }
    })
}

app.listen(8989, () => {
    console.log('Server started at PORT:  8989')
})

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


