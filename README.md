# Weather-API

This simple API allows you to find the temperature of a specified US zip code in either Fahrenheit or Celsius using the OpenWeather Current Weather API. If the units are not specified, then it defaults to Fahrenheit.

## References

During development, I took reference for structure of the API and Jest + Supertest tests from various API and testing examples found online. No code was directly generated for this project besides the last two Jest tests in `app.test.js`.

## Technologies

- Node.js
- Express
- Jest
- Supertest

## Requirements

- Node.js and npm installed
- An OpenWeather API key (set in a `.env` file as `API_KEY`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your API key:

```
API_KEY={openweather_api_key}
```

3. Run the API:

```bash
npm start
```

By default the development server prints a local example URL when it starts: `Server is running at http://localhost:8080/locations/24060`. The HTTP endpoint provided is described below.

## API

GET /locations/:zipcode

- Path parameter:
	- `zipcode` (required): `<five-digit number>`
- Query parameter:
	- `scale` (optional): `Fahrenheit` (default) or `Celsius`
- Responses:
	- 200: `{ "temperature": <number>, "scale": "Fahrenheit"|"Celsius" }`
	- 400: invalid zip code or invalid scale
	- 4xx/5xx: forwarded or internal errors when the upstream OpenWeather API fails

## Tests

Run the test suite (uses Jest + Supertest):

```bash
npm test
```

The tests exercise the route handlers and include checks for response errors.
