exports.up = function (knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.integer("site_id").notNullable().unique().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.dropUnique("site_id");
  });
};
