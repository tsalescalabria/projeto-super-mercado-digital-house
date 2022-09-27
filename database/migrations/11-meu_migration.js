'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "fk_produto" to table "carrinho"
 *
 **/

var info = {
    "revision": 11,
    "name": "meu_migration",
    "created": "2022-08-25T19:20:39.473Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "carrinho",
        "fk_produto",
        {
            "type": Sequelize.INTEGER,
            "field": "fk_produto",
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "produtos",
                "key": "id_produto"
            },
            "allowNull": true
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
