const express = require('express');
const axios = require('axios');

const app = express();

// Middleware per aggiungere intestazioni CORS a tutte le risposte
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/image', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send('URL is required');
  }

  console.log('Fetching image from URL:', imageUrl);

  try {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    res.send(dataUrl);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send('Error fetching image');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
