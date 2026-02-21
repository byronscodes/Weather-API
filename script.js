// JavaScript file using Node.js and Express to send a GET request to OpenWeather's current weather API

// Import Express and intialize Express app
const express = require('express');
const app = express();
const PORT = 3000;

// RESTful GET Request for Weather API from zip code
app.get('/locations/:zipcode', async (req, res) => {
    const {zipcode} = req.params;
    const {scale} = req.query || "Fahrenheit";

    // Check for zip code, return 400 if not entered
    if (!zipcode) {
        return res.status(400).json({
            status: 400,
            error: "Zip code is required"
        });
    }

    // Check for valid scale, return 400 if not valid
    if (scale != "Fahrenheit" || scale != "Celsius") {
        return res.status(400).json({
            status: 400,
            error: "Invalid scale entered"
        });
    }

    // Converts scale to OpenWeather API preferred parameter name
    if (scale == "Fahrenheit") {
        scale = "imperial";
    }
    else {
        scale = "metric"
    }

    // Create the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=${scale}&appid=${process.env.API_KEY}`




});