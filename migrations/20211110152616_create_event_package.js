exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('event_package', function (t) {
    t.uuid('id_event_package').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_event').notNullable();
    t.string('code').unique().notNullable();
    t.string('name').notNullable();
    t.text('image');
    t.text('banner');
    t.text('description');
    t.boolean('is_recommendation').defaultTo(false);
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('event_package');
};
