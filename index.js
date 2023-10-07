require('./config')
const express = require('express')
// const todoUser = require('./db/models/todoUser')
// const todo = require('./db/models/todo')
const controllers = require('./controllers')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())


if(Array.isArray(controllers.private)) {
    controllers.private.forEach(item => {
        if(item.name && item.router) {
            app.use(item.name, item.router)
        }
    })
}

if(Array.isArray(controllers.public)) {
    controllers.public.forEach(item => {
        if(item.name && item.router) {
            app.use(item.name, item.router)
        }
    })
}

app.listen(8989, () => {
    console.log('Server started at PORT:  8989')
})




jwt.sign({id: 1, name: 'Roman'}, '123')
const token = jwt.sign({id: 1, name: 'Roman'}, '123', {noTimestamp: true})

console.log(token)
try {
    const getData = jwt.verify(token, '123')
    console.log(getData)
} catch (error) {
    console.log(error, 'invalid token')
}






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


