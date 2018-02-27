// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();


const toppings = [
    {value: 'berries', img: '../assets/berries.png'}, 
    {value: 'brocoli', img: '../assets/brocoli.png'}, 
    {value: 'camamber', img: '../assets/camamber.png'}, 
    {value: 'cheese', img: '../assets/cheese.png'}, 
    {value: 'chilli', img: '../assets/chilli.png'}, 
    {value: 'garlic', img: '../assets/garlic.png'}, 
    {value: 'ginger', img: '../assets/ginger.png'}, 
    {value: 'lobster', img: '../assets/lobster.png'}, 
    {value: 'mashrooms', img: '../assets/mashrooms.png'}, 
    {value: 'olives', img: '../assets/olives.png'}, 
    {value: 'peperoni', img: '../assets/peperoni.png'}, 
    {value: 'pepper', img: '../assets/pepper.png'}, 
    {value: 'pickles', img: '../assets/pickles.png'}, 
    {value: 'shampinion', img: '../assets/shampinion.png'}, 
    {value: 'salad', img: '../assets/salad.png'}, 
    {value: 'shrimp', img: '../assets/shrimp.png'}, 
    {value: 'tomato', img: '../assets/tomato.png'},
    {value: 'nana', img: '../assets/nana.png'}, 
    {value: 'cherri', img: '../assets/cherri.png'}, 
    {value: 'green', img: '../assets/green.png'}, 
    {value: 'oyister', img: '../assets/oyister.png'}
  ];













// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/sizes', (req,res) => {
    res.send({daniel: 2});
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