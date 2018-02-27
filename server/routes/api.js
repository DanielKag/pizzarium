const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/toppings', (req, res) => {
  res.send('toppings');
});


module.exports = router;