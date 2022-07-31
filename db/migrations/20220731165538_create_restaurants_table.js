exports.up = function (knex) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments().index();
    table
      .integer("locations_site_id")
      .references("site_id")
      .inTable("locations")
      .onDelete("CASCADE");
    table.string("restaurant_name").notNullable();
    table.string("restaurant_logo").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schmea.dropTable("restaurants");
};
