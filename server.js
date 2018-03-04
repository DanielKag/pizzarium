// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();


const toppings = [
    {value: 'Berries', img: '../assets/berries.png', extraData:{price: 5}}, 
  {value: 'Brocoli', img: '../assets/brocoli.png', extraData:{price: 2}}, 
  {value: 'Camamber', img: '../assets/camamber.png', extraData:{price: 5}}, 
  {value: 'Cheese', img: '../assets/cheese.png', extraData:{price: 3}}, 
  {value: 'Chilli', img: '../assets/chilli.png', extraData:{price: 3}}, 
  {value: 'Garlic', img: '../assets/garlic.png', extraData:{price: 1}}, 
  {value: 'Ginger', img: '../assets/ginger.png', extraData:{price: 2}}, 
  {value: 'Lobster', img: '../assets/lobster.png', extraData:{price: 10}}, 
  {value: 'Mashrooms', img: '../assets/mashrooms.png', extraData:{price: 5}}, 
  {value: 'Olives', img: '../assets/olives.png', extraData:{price: 2}}, 
  {value: 'Peperoni', img: '../assets/peperoni.png', extraData:{price: 7}}, 
  {value: 'Pepper', img: '../assets/pepper.png', extraData:{price: 4}}, 
  {value: 'Pickles', img: '../assets/pickles.png', extraData:{price: 3}}, 
  {value: 'Shampinion', img: '../assets/shampinion.png', extraData:{price: 5}}, 
  {value: 'Salad', img: '../assets/salad.png', extraData:{price: 4}}, 
  {value: 'Shrimp', img: '../assets/shrimp.png', extraData:{price: 6}}, 
  {value: 'Tomato', img: '../assets/tomato.png', extraData:{ price: 3}},
  {value: 'Nana', img: '../assets/nana.png', extraData:{price: 3}}, 
  {value: 'Cherri', img: '../assets/cherri.png', extraData:{price: 5}}, 
  {value: 'Green', img: '../assets/green.png', extraData:{price: 4}}, 
  {value: 'Oyister', img: '../assets/oyister.png', extraData:{price: 4}}
  ];


const sizes = [
    {value: 'Small', img: '../assets/pizza-small.png', extraData:{price: 10}}, 
    {value: 'Medium', img: '../assets/pizza-medium.png', extraData:{price: 15}}, 
    {value: 'Large', img: '../assets/pizza-large.png', extraData:{price: 20}}, 
    {value: 'Extra large', img: '../assets/pizza-extra.png', extraData:{price: 25}}
  ];


 

 





// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/sizes', (req,res) => {
    res.send(sizes);
})

app.get('/toppings', (req,res) => {
    res.send(toppings);
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.send('404')
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));