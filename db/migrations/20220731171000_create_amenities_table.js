exports.up = function (knex) {
  return knex.schema.createTable("amenities", (table) => {
    table.increments().index();
    table
      .integer("locations_site_id")
      .references("site_id")
      .inTable("locations")
      .onDelete("CASCADE");
    table.string("amenity_name").notNullable();
    table.string("amenity_logo").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schmea.dropTable("amenities");
};
