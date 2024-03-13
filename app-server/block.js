const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
let intervalId;
// Define a function to fetch the website
const fetchWebsite = async () => {
  try {
    const response = await axios.get('https://www.thestalkingdirectory.co.uk/');
    // console.log('Response from website:', response.status);
  } catch (error) {
    // console.error('Error fetching website:', error.message);
  }
};

// Define a route to start fetching the website
app.get('/start', (req, res) => {
  // Fetch the website every 1 second
   intervalId = setInterval(fetchWebsite, 1);
  
  res.send('Fetching website started.');
});

// Define a route to stop fetching the website
app.get('/stop', (req, res) => {
  clearInterval(intervalId); // Stop fetching
  res.send('Fetching website stopped.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//https://www.thestalkingdirectory.co.uk/threads/makita-milwaukee-de-walt-impact-drivers.280676/latest
//https://www.facebook.com/TheStalkingDirectory/?locale=en_GB