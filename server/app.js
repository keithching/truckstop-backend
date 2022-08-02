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
    const locations = await db.select().table("locations");
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
