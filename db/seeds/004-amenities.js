const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/locations.json"));

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("amenities").del();
  try {
    for (let i = 0; i < data.length; i++) {
      const site_id = data[i].Site.SiteId;

      for (const customField of data[i].CustomFields) {
        const amenity = {
          locations_site_id: site_id,
          amenity_name: customField.CustomField.Label,
          amenity_logo: customField.CustomField.FacilityLogo,
        };
        await knex("amenities").insert(amenity);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
