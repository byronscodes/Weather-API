// Runs JavaScript app so Jest automated testing and local server don't conflict on PORT 8080

// Imports app from app.js
const app = require('./app');
const PORT = 8080;

// Starts the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/locations/24060`)
});