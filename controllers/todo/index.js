
const { todo } = require("../../db/models");

// const { checkVal } = require("../../utils");


const get = (req, res) => {
  const { limit, offset } = req.query;
  const {todoUserId, ...others} = req.body
  const {id} = req.headers

  todo
    .findAll({
      where: {todoUserId: id},
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { id, ...other } = req.body;

  todo
    .update(other, { where: { id } })
    .then((data) => {
      res.status(200).send({data, status: 'OK'});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const post = (req, res) => {
  todo
    .create({ description: req.body.description, isDone: false, todoUserId: req.headers.id })
    .then((data) => {
      res.status(200).send({data, status: 'OK'});
    })
    .catch((err) => {
      console.log(err);
    });
};

const remove = (req, res) => {
    const { id, ...other } = req.body;
    todo.destroy({where: {id}}).then(data => {res.send({data, status: 'todo was deleted'})})

}

module.exports = (router) => {
  router.get("/", get);
  //   router.get("/:id", getURI);
  router.post("/", post);

  router.put("/", update);
  router.delete("/", remove);

  return true;
};
