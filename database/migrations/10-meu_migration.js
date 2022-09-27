'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "carrinho", deps: []
 * addColumn "senha" to table "Clientes"
 * addColumn "preco_promocao" to table "produtos"
 * addColumn "promocao" to table "produtos"
 *
 **/

var info = {
    "revision": 10,
    "name": "meu_migration",
    "created": "2022-08-25T18:36:54.839Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "carrinho",
            {
                "id_carrinho": {
                    "type": Sequelize.INTEGER,
                    "field": "id_carrinho",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING(100),
                    "field": "nome",
                    "allowNull": false
                },
                "preco": {
                    "type": Sequelize.DECIMAL,
                    "field": "preco",
                    "allowNull": false
                },
                "quantidade": {
                    "type": Sequelize.DECIMAL,
                    "field": "quantidade",
                    "allowNull": false
                },
                "imagem": {
                    "type": Sequelize.STRING,
                    "field": "imagem"
                }
            },
            {}
        ]
    },
    // {
    //     fn: "addColumn",
    //     params: [
    //         "Clientes",
    //         "senha",
    //         {
    //             "type": Sequelize.STRING(15),
    //             "field": "senha",
    //             "allowNull": false
    //         }
    //     ]
    // },
    {
        fn: "addColumn",
        params: [
            "produtos",
            "preco_promocao",
            {
                "type": Sequelize.DECIMAL,
                "field": "preco_promocao"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "produtos",
            "promocao",
            {
                "type": Sequelize.INTEGER,
                "field": "promocao"
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
