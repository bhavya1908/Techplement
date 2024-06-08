
//exporting required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const server = express();
server.use(express.static('build'));
const PORT = process.env.PORT ||3000; 

server.use(cors());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
//ROUTING
// Route to get a random quote
  server.get('/quote', async (req, res) => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching random quote:', error.message);
      res.status(500).send('Error fetching random quote');
    }
  });
  
// Route to get a random quote by specified author
  server.get('/quote/:author', async (req, res) => {
    const author = req.params.author;
    try {
      const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`);
      // console.log(response.data)-->FOR FETCHING ERRORS IF ANY BY PRINTING THE DATA
      // console.log(response.data.count)-->FOR FETCHING ERRORS IF ANY BY PRINTING THE DATA
      if (response.data.length === 0) {
        res.status(404).send('Author not found');
      } else {
        const randomIndex = Math.floor(Math.random() * response.data.count);
      //  console.log(response.data.results[randomIndex]);-->FOR FETCHING ERRORS IF ANY BY PRINTING THE DATA 
        res.json(response.data.results[randomIndex]);
      }
    } catch (error) {
      console.error(`Error fetching quotes by author '${author}':`, error.message);
      res.status(500).send(`Error fetching quotes by author '${author}'`);
    }
  });
  
  

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

