'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id_produto" from table "produtos"
 * createTable "compras", deps: [Clientes, Clientes]
 * createTable "produto_compra", deps: [produtos, compras, produtos]
 * addColumn "id" to table "produtos"
 * changeColumn "fk_produto" on table "carrinho"
 *
 **/

var info = {
    "revision": 13,
    "name": "meu_migration",
    "created": "2022-08-28T22:26:04.132Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["produtos", "id_produto"]
    },
    {
        fn: "createTable",
        params: [
            "compras",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "data": {
                    "type": Sequelize.DATE,
                    "field": "data",
                    "allowNull": false
                },
                "cliente_id": {
                    "type": Sequelize.INTEGER(11),
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Clientes",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "cliente_id"
                },
                "compra_id": {
                    "type": Sequelize.BIGINT(10).UNSIGNED,
                    "field": "compra_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Clientes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "produto_compra",
            {
                "compra_id": {
                    "type": Sequelize.INTEGER,
                    "field": "compra_id"
                },
                "produto_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "produtos",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "field": "produto_id"
                },
                "quantidade": {
                    "type": Sequelize.INTEGER,
                    "field": "quantidade"
                },
                "preco": {
                    "type": Sequelize.FLOAT,
                    "field": "preco"
                },
                "CompraId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "field": "CompraId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "compras",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "ProdutoId": {
                    "type": Sequelize.INTEGER,
                    "field": "ProdutoId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "produtos",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "produtos",
            "id",
            {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
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
                    "key": "id"
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
