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
// const options = {
//   method: 'GET',
//   url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
//   params: {
//     query: 'ghana',
//     locale: 'en-US'
//   },
//   headers: {
//     'x-rapidapi-key': apiKey,
//     'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
//   }
// };

// async function fetchData() {
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();


app.get('/api/airports', async (req, res) => {
  try {
    const { query } = req.query; // Get query from request query parameters    

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

    // const response = await axios.request(options);
    // res.json(response.data);
  } catch (error) {
    console.error('Error searching airports:', error);
    res.status(500).json({ error: 'Failed to search airports' });
  }
});



// Endpoint to search for flights
// app.get('/api/flights', async (req, res) => {
//   try {
//     const { originSkyId, destinationSkyId, originEntityId, destinationEntityId, date } = req.body;
//     const apiKey = process.env.SKY_SCANNER_API_KEY;
//     const apiUrl = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights';

//     const options = {
//       method: 'GET',
//       url: apiUrl,
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': apiKey,
//         'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
//       },
//       data: {
//         originSkyId,
//         destinationSkyId,
//         originEntityId,
//         destinationEntityId,
//         date
//       }
//     };

//     const response = await axios.request(options);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching flights:', error);
//     res.status(500).json({ error: 'Failed to fetch flight data' });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});