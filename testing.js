// https://github.com/node-fetch/node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const db = require("./server/knex.js");

const getLocations = () => {
  return fetch("http://localhost:3000/api/locations").then((res) => res.json());
};

const getTruckServices = () => {
  return fetch("http://localhost:3000/api/truck-services").then((res) =>
    res.json()
  );
};

const getRestaurants = () => {
  return fetch("http://localhost:3000/api/restaurants").then((res) =>
    res.json()
  );
};

const getAmenities = () => {
  return fetch("http://localhost:3000/api/amenities").then((res) => res.json());
};

const getGasPrices = () => {
  return fetch("http://localhost:3000/api/gas-prices").then((res) =>
    res.json()
  );
};

(async () => {
  let locations = await getLocations();
  const truckServices = await getTruckServices();
  const restaurants = await getRestaurants();
  const amenities = await getAmenities();
  const gasPrices = await getGasPrices();

  for (const item of truckServices) {
    for (const location of locations) {
      if (!location.truckServices) location.truckServices = [];
      if (location.id === item.locations_site_id) {
        location.truckServices.push(item.service_name);
      }
    }
  }

  for (const item of amenities) {
    for (const location of locations) {
      if (!location.amenities) location.amenities = [];
      if (location.id === item.locations_site_id) {
        location.amenities.push(item.amenity_name);
      }
    }
  }

  for (const item of restaurants) {
    for (const location of locations) {
      if (!location.restaurants) location.restaurants = [];
      if (location.id === item.locations_site_id) {
        location.restaurants.push(item.restaurant_name);
      }
    }
  }

  for (const item of gasPrices) {
    for (const location of locations) {
      if (!location.gasPrices) location.gasPrices = {};
      if (location.id === item.locations_site_id) {
        location.gasPrices.Unleaded = item.Unleaded;
        location.gasPrices.Midgrade = item.Midgrade;
        location.gasPrices.Premium = item.Premium;
        location.gasPrices.Diesel = item.Diesel;
      }
    }
  }

  console.log(locations);
})();
