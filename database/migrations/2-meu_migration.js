'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "produtoCategoria"
 * createTable "ProdutoCategoria", deps: [categorias, produtos]
 *
 **/

var info = {
    "revision": 6,
    "name": "meu_migration",
    "created": "2022-07-29T15:28:14.258Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["produtoCategoria"]
    },
    {
        fn: "createTable",
        params: [
            "ProdutoCategoria",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "fk_produto": {
                    "type": Sequelize.BIGINT(10).UNSIGNED,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "categorias",
                        "key": "idCategoria"
                    },
                    "unique": "ProdutoCategoria_fk_categoria_fk_produto_unique",
                    "field": "fk_produto",
                    "allowNull": false
                },
                "fk_categoria": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "produtos",
                        "key": "idProduto"
                    },
                    "unique": "ProdutoCategoria_fk_categoria_fk_produto_unique",
                    "field": "fk_categoria",
                    "allowNull": false
                }
            },
            {}
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
