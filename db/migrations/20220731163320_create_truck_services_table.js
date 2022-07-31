exports.up = function (knex) {
  return knex.schema.createTable("truck_services", (table) => {
    table.increments().index();
    table
      .integer("locations_site_id")
      .references("site_id")
      .inTable("locations")
      .onDelete("CASCADE");
    table.string("service_name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schmea.dropTable("truck_services");
};
