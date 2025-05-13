// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const apiKey = process.env.SKY_SCANNER_API_KEY;


const app = express();
app.use(cors());
app.use(express.json());


// Endpoint to search for airports
app.get('/api/airports', async (req, res) => {
  try {
    const { query } = req.query;    

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      params: {
        query: query,
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching airports:', error);
    res.status(500).json({ error: 'Failed to search airports' });
  }
});



// Endpoint to search for flights
app.get('/api/flights', async (req, res) => {
  try {
    const { originSkyId, destinationSkyId, originEntityId, destinationEntityId, date, returnDate } = req.query;



    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
       params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        cabinClass: 'economy',
        adults: '1',
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
     
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});