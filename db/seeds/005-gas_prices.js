const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/locations.json"));

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("gas_prices").del();
  try {
    for (let i = 0; i < data.length; i++) {
      const test = data[i].Site.FuelPrices.map((fuelPrice) => {
        if (
          fuelPrice.FuelType === "Unleaded" ||
          fuelPrice.FuelType === "Midgrade" ||
          fuelPrice.FuelType === "Premium" ||
          fuelPrice.FuelType === "Diesel"
        ) {
          return {
            [fuelPrice.FuelType]: fuelPrice.CashPrice,
          };
        }
      }).filter((item) => item !== undefined);

      // create combinedObj
      let combinedObj = {};
      for (const element of test) {
        combinedObj = { ...combinedObj, ...element };
      }

      const finalObj = {
        locations_site_id: data[i].Site.SiteId,
        Unleaded: combinedObj.Unleaded ? combinedObj.Unleaded : "Not available",
        Midgrade: combinedObj.Midgrade ? combinedObj.Midgrade : "Not available",
        Premium: combinedObj.Premium ? combinedObj.Premium : "Not available",
        Diesel: combinedObj.Diesel ? combinedObj.Diesel : "Not available",
      };

      await knex("gas_prices").insert(finalObj);
    }
  } catch (err) {
    console.error(err);
  }
};
