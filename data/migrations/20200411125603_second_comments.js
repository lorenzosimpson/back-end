
exports.up = function(knex) {
  return knex.schema
  .createTable('comments', tbl => {
      tbl.increments()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('trip_id')
        .unsigned()
        .references('id')
        .inTable('trips')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    tbl.string('commenter_name')
        .references('username')
        .inTable('users')
    tbl.string('comment', 255)
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('comments')
};
