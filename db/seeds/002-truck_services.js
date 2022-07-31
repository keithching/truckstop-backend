const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/locations.json"));

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("truck_services").del();
  try {
    for (let i = 0; i < data.length; i++) {
      const site_id = data[i].Site.SiteId;

      for (const additionalAmenity of data[i].AdditionalAmenities) {
        let amenity = additionalAmenity.SiteManagementItem;

        const truck_service = {
          locations_site_id: site_id,
          service_name: amenity.Title,
        };

        await knex("truck_services").insert(truck_service);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
