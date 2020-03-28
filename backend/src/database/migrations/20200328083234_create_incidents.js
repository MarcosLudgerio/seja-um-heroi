
exports.up = function(knex) {//MÉTODO QUE CRIA A TABELA DE CASOS(INCIDENTS) QUANDO A MIGRATE É EXECUTADA
    return knex.schema.createTable('incidents', (table) => {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); // ID DA ONG QUE CRIOU ESSE CASO

        //ong_id faz referência a id da tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs'); 
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');  
};
