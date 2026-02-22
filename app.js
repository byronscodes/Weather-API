// JavaScript app using Node.js and Express to send a GET request to OpenWeather's current weather API
// Tested GET requests with Postman during development

// Import Express and intialize Express app
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = 8080;

// RESTful GET Request for OpenWeather API from zip code and optional scale
app.get('/locations/:zipcode', async (req, res) => {
    const {zipcode} = req.params;
    const {scale = "Fahrenheit"} = req.query;

    // Check for valid zip code, return 400 error if not valid
    if (zipcode.length != 5) {
        return res.status(400).json({
            status: 400,
            error: "Valid zip code is required"
        });
    }

    // Check for valid scale, return 400 error if not valid
    if (scale != "Fahrenheit" && scale != "Celsius") {
        return res.status(400).json({
            status: 400,
            error: "Invalid scale entered"
        });
    }

    // Converts scale to OpenWeather API preferred parameter name
    let units;
    if (scale == "Fahrenheit") {
        units = "imperial";
    }
    else {
        units = "metric";
    }

    // Create the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=${units}&appid=${process.env.API_KEY}`

    // Use try...catch block for catching errors when connecting with OpenWeather API
    try {
        const response = await fetch(apiUrl);

        // Check if response is successful
        if (!response.ok) {
            return res.status(response.status).json({
                status: response.status,
                error: `OpenWeather API failed: "${response.statusText}"`
            });
        }

        // Convert successful response to JSON
        const data = await response.json();

        // Pluck wanted key
        const {
            "main": {
                temp
            }
        } = data;

        // Return clean data and original scale
        return res.status(200).json({
            "temperature": temp,
            "scale": scale
        });

    }
    catch (error) {
        // Return error encountered
        return res.status(500).json({
            status: 500,
            error: `Internal server error: ${error.message}`
        });
    }
});

// Export the app so Jest testing can be used
module.exports = app;