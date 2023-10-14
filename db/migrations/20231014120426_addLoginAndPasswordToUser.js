const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(password) => "todoUsers"
 * addColumn(login) => "todoUsers"
 *
 */

const info = {
  revision: 6,
  name: "addLoginAndPasswordToUser",
  created: "2023-10-14T12:04:26.878Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "todoUsers",
      "password",
      { type: Sequelize.TEXT, field: "password" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "todoUsers",
      "login",
      { type: Sequelize.TEXT, field: "login" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["todoUsers", "password", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["todoUsers", "login", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
