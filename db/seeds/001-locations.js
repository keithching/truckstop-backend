const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/locations.json"));

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("locations").del();
  try {
    for (let i = 0; i < data.length; i++) {
      let contact = data[i].ContactMethods.filter((el) => {
        if (el.Type.Name === "Main Phone") {
          return el.Data;
        }
      });
      const location = {
        latitude: data[i].Site.Latitude,
        longitude: data[i].Site.Longitude,
        name: data[i].Addresses[0].Name,
        site_id: data[i].Site.SiteId,
        highway: data[i].Site.DescriptiveAddress || "No highway",
        city: data[i].Addresses[0].City,
        state: data[i].Addresses[0].State,
        phone_number: contact[0].Data,
      };
      await knex("locations").insert(location);
    }
  } catch (err) {
    console.log(err);
  }
};
