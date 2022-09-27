'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Clientes", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "meu_migration",
    "created": "2022-06-28T00:32:19.301Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Clientes",
        {
            "id": {
                "type": Sequelize.BIGINT(10).UNSIGNED,
                "field": "id",
                "autoIncrement": true,
                "allowNull": false,
                "primaryKey": true
            },
            "nome": {
                "type": Sequelize.STRING(100),
                "field": "nome",
                "allowNull": false
            },
            "email": {
                "type": Sequelize.STRING(15),
                "field": "email",
                "allowNull": false
            },
            "ativo": {
                "type": Sequelize.BOOLEAN,
                "field": "ativo",
                "allowNull": false
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            }
        },
        {}
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
