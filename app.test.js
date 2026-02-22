// Jest testing file for app.js

// Import Supertest and JavaScript app
const request = require('supertest');
const app = require('./app');

test('Successful; scale unspecified', async () => {
    const res = await request(app).get('/locations/24060');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("temperature");
    expect(typeof res.body.temperature).toBe("number");
    expect(res.body.scale).toBe("Fahrenheit");
});

test('Successful; Fahrenheit specified', async () => {
    const res = await request(app).get('/locations/23116?scale=Fahrenheit');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("temperature");
    expect(typeof res.body.temperature).toBe("number");
    expect(res.body.scale).toBe("Fahrenheit");
});

test('Successful; Celsius specified', async () => {
    const res = await request(app).get('/locations/30548?scale=Celsius');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("temperature");
    expect(typeof res.body.temperature).toBe("number");
    expect(res.body.scale).toBe("Celsius");
});

test('400 Status; No zip code', async () => {
    const res = await request(app).get('/locations/');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Zip code is required");
});

test('400 Status; Too big zip code', async () => {
    const res = await request(app).get('/locations/200000');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Valid zip code is required");
});

test('400 Status; Too small zip code', async () => {
    const res = await request(app).get('/locations/23');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Valid zip code is required");
});

// AI-generated tests for OpenWeather API Failure and 500 Status

test('502 Status; OpenWeather API failure', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 502,
        statusText: 'Bad Gateway'
    });

    const res = await request(app).get('/locations/24060');

    expect(res.status).toBe(502);
    expect(res.body.error).toMatch(/OpenWeather API failed/);

    jest.restoreAllMocks();
});

test('500 Status; Network/fetch error', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network failure'));

    const res = await request(app).get('/locations/24060');

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/Internal server error/);

    jest.restoreAllMocks();
});