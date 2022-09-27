'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "fk_produto" on table "carrinho"
 * changeColumn "fk_produto" on table "carrinho"
 *
 **/

var info = {
    "revision": 12,
    "name": "meu_migration",
    "created": "2022-08-25T19:24:37.547Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "carrinho",
            "fk_produto",
            {
                "type": Sequelize.BIGINT(10).UNSIGNED,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "produtos",
                    "key": "id_produto"
                },
                "allowNull": true,
                "field": "fk_produto"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "carrinho",
            "fk_produto",
            {
                "type": Sequelize.BIGINT(10).UNSIGNED,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "produtos",
                    "key": "id_produto"
                },
                "allowNull": true,
                "field": "fk_produto"
            }
        ]
    }
];

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
