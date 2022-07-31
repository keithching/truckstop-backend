exports.up = function (knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.integer("site_id").notNullable();
    table.string("highway").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("phone_number").notNullable();

    table.float("latitude").notNullable().alter();
    table.float("longitude").notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.dropColumn("site_id");
    table.dropColumn("highway");
    table.dropColumn("city");
    table.dropColumn("state");
    table.dropColumn("phone_number");

    table.setNullable("latitude");
    table.setNullable("longitude");
  });
};
