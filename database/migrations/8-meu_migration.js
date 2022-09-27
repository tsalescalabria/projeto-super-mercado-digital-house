'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "id_categoria" on table "categorias"
 *
 **/

var info = {
    "revision": 8,
    "name": "meu_migration",
    "created": "2022-07-30T20:28:00.869Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "categorias",
        "id_categoria",
        {
            "type": Sequelize.INTEGER,
            "field": "id_categoria",
            "primaryKey": true,
            "autoIncrement": true,
            "allowNull": false
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
