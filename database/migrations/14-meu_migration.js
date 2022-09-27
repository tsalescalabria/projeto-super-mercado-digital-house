'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "produtos"
 * removeColumn "ProdutoId" from table "produto_compra"
 * dropTable "carrinho"
 * addColumn "id_produto" to table "produtos"
 * addColumn "ProdutoIdProduto" to table "produto_compra"
 * addColumn "id" to table "produto_compra"
 * changeColumn "CompraId" on table "produto_compra"
 * changeColumn "CompraId" on table "produto_compra"
 * changeColumn "produto_id" on table "produto_compra"
 * changeColumn "produto_id" on table "produto_compra"
 * changeColumn "produto_id" on table "produto_compra"
 * changeColumn "produto_id" on table "produto_compra"
 *
 **/

var info = {
    "revision": 14,
    "name": "meu_migration",
    "created": "2022-08-29T19:31:14.425Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["produtos", "id"]
    },
    {
        fn: "removeColumn",
        params: ["produto_compra", "ProdutoId"]
    },
    {
        fn: "dropTable",
        params: ["carrinho"]
    },
    {
        fn: "addColumn",
        params: [
            "produtos",
            "id_produto",
            {
                "type": Sequelize.INTEGER,
                "field": "id_produto",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "produto_compra",
            "ProdutoIdProduto",
            {
                "type": Sequelize.INTEGER,
                "field": "ProdutoIdProduto",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "produtos",
                    "key": "id_produto"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "produto_compra",
            "id",
            {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "CompraId",
            {
                "type": Sequelize.INTEGER,
                "field": "CompraId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "compras",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "CompraId",
            {
                "type": Sequelize.INTEGER,
                "field": "CompraId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "compras",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "produto_id",
            {
                "type": Sequelize.INTEGER,
                "field": "produto_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "produto_id",
            {
                "type": Sequelize.INTEGER,
                "field": "produto_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "produto_id",
            {
                "type": Sequelize.INTEGER,
                "field": "produto_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "produto_compra",
            "produto_id",
            {
                "type": Sequelize.INTEGER,
                "field": "produto_id"
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
