// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");
// const knex = require("knex");

const cors = require("cors");

const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

// enabling all CORS requests
// https://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight
app.use(cors());

app.use(express.json()); // middleware. every incoming request gets parsed as JSON

app.get("/api/locations", async (req, res) => {
  try {
    const queries = {};
    if (req.query) {
      if (req.query.state) queries.state = req.query.state;
      if (req.query.city) queries.city = req.query.city;
      if (req.query["truck-services"])
        queries["truck-services"] = req.query["truck-services"];
      if (req.query["restaurants"])
        queries["restaurants"] = req.query["restaurants"];
      if (req.query["amenities"]) queries["amenities"] = req.query["amenities"];
    }

    let locations =
      Object.keys(queries).length === 0
        ? await db.select().table("locations")
        : await db
            .select()
            .table("locations")
            .where("city", req.query.city)
            .andWhere("state", req.query.state);

    const truckServices = await db.select("*").from("truck_services");
    for (const item of truckServices) {
      for (const location of locations) {
        if (!location.truckServices) location.truckServices = [];
        if (location.id === item.locations_site_id) {
          location.truckServices.push(item.service_name);
        }
      }
    }

    const amenities = await db.select("*").from("amenities");
    for (const item of amenities) {
      for (const location of locations) {
        if (!location.amenities) location.amenities = [];
        if (location.id === item.locations_site_id) {
          location.amenities.push(item.amenity_name);
        }
      }
    }

    const restaurants = await db.select("*").from("restaurants");
    for (const item of restaurants) {
      for (const location of locations) {
        if (!location.restaurants) location.restaurants = [];
        if (location.id === item.locations_site_id) {
          location.restaurants.push(item.restaurant_name);
        }
      }
    }

    const gasPrices = await db.select("*").from("gas_prices");
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

    if (queries["truck-services"]) {
      locations = locations.filter((location) =>
        location.truckServices.find(
          (truckService) => truckService === queries["truck-services"]
        )
      );
    }
    if (queries.amenities) {
      locations = locations.filter((location) =>
        location.amenities.find((amenity) => amenity === queries.amenities)
      );
    }
    if (queries.restaurants) {
      locations = locations.filter((location) =>
        location.restaurants.find(
          (restaurant) => restaurant === queries.restaurants
        )
      );
    }

    res.json(locations);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/truck-services", async (req, res) => {
  try {
    const truckServices = await db.select("*").from("truck_services");
    console.log(truckServices);
    res.send(truckServices);
  } catch (err) {
    console.error("Error loading truck services!", err);
    res.send(500).end();
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await db.select("*").from("restaurants");
    res.send(restaurants);
  } catch (err) {
    console.error("Error loading restaurants!", err);
    res.send(500).end();
  }
});

app.get("/api/amenities", async (req, res) => {
  try {
    const amenities = await db.select("*").from("amenities");
    res.send(amenities);
  } catch (err) {
    console.error("Error loading amenities!", err);
    res.send(500).end();
  }
});

app.get("/api/gas-prices", async (req, res) => {
  try {
    const gasPrices = await db.select("*").from("gas_prices");
    res.send(gasPrices);
  } catch (err) {
    console.error("Error loading gas prices!", err);
    res.send(500).end();
  }
});

app.get("/api/searchItems", async (req, res) => {
  try {
    let truckServices = await db
      .distinct("service_name")
      .from("truck_services");
    truckServices = truckServices.map(
      (truckService) => truckService.service_name
    );

    let restaurants = await db.distinct("restaurant_name").from("restaurants");
    restaurants = restaurants.map((restaurant) => restaurant.restaurant_name);

    let amenities = await db.distinct("amenity_name").from("amenities");
    amenities = amenities.map((amenity) => amenity.amenity_name);

    const result = {
      truckServices,
      restaurants,
      amenities,
    };

    res.send(result).status(200);
  } catch (err) {
    console.error("Error loading search items!", err);
    res.send(500).end();
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
