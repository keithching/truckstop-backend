const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/locations.json"));

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("restaurants").del();
  try {
    for (let i = 0; i < data.length; i++) {
      const site_id = data[i].Site.SiteId;

      for (const concept of data[i].Site.Concepts) {
        const restaurant = {
          locations_site_id: site_id,
          restaurant_name: concept.Concept.Name,
          restaurant_logo: concept.Concept.ConceptIcon,
        };
        await knex("restaurants").insert(restaurant);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
