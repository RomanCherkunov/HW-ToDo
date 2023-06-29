const { Op } = require("sequelize");
const { todoUser } = require("../../db/models");
const {todo} = require("../../db/models");
// const { checkVal } = require("../../utils");

// const getURI = (req, res) => {
//   const { id } = req.params;

//   user
//     .findOne({ where: { id } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// };

const get = (req, res) => {
  const { limit, offset } = req.query;
  const id = req.headers.id
  console.log(id)

  // const where = name ? { name: { [Op.getLike()]: `%${name}%` } } : null;

      todoUser.findAll({
        include: [
            {
                model: todo
            }
        ]
    }).then(data => {
      console.log(data.map((item) => item.toJSON()))
    })

  // todoUser
  //   .findAndCountAll({
  //     include : [
  //       {
  //         model: todo
  //       }
  //     ],
  //     where,
  //     ...(limit ? { limit } : {}),
  //     ...(offset ? { offset } : {}),
  //   })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
};

const update = (req, res) => {
  const { id, ...other } = req.body;

  todoUser
    .update(other, { where: { id } })
    .then((data) => {
      res.status(200).send({data, status: 'OK'});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const post = (req, res) => {
    todoUser
    .create({ name: req.body.name})
    .then((data) => {
      res.status(200).send({data, status: 'OK'});
    })
    .catch((err) => {
      console.log(err);
    });
};

const remove = (req, res) => {
    const { id, ...other } = req.body;
    todoUser.destroy({where: {id}}).then(data => {res.send({data, status: 'user was deleted'})})

}

module.exports = (router) => {
  router.get("/", get);
  //   router.get("/:id", getURI);
  router.post("/", post);

  router.put("/", update);
  router.delete("/", remove);

  return true;
};
