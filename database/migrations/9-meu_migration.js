'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "quantidade" to table "produtos"
 *
 **/

var info = {
    "revision": 9,
    "name": "meu_migration",
    "created": "2022-08-16T19:38:31.164Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "produtos",
        "quantidade",
        {
            "type": Sequelize.INTEGER,
            "field": "quantidade"
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
