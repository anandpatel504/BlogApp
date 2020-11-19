
exports.up = function(knex) {
    return knex.schema.createTable('likeDislike', (table) => {
        table.increments().primary();
        table.integer('user_id').notNullable();
        table.string('like');
        table.string('dislike');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('likeDislike');
};
