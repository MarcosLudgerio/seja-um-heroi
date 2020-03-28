
exports.up = function(knex) { //MÉTODO QUE CRIA A TABELA QUANDO A MIGRATE É EXECUTADA
  return knex.schema.createTable('ongs', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('cidade').notNullable();
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {// CASO O UP NÃO DÊ CERTO POR QUALQUER MOTIVO, ENTÃO EXECUTA ISSO
    return knex.schema.dropTable('ongs');  
};
