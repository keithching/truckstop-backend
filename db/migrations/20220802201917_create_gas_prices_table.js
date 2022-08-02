exports.up = function (knex) {
  return knex.schema.createTable("gas_prices", (table) => {
    table.increments().index();
    table
      .integer("locations_site_id")
      .references("site_id")
      .inTable("locations")
      .onDelete("CASCADE");
    table.string("Unleaded");
    table.string("Midgrade");
    table.string("Premium");
    table.string("Diesel");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gas_prices");
};
