const router = require('express').Router();
let Onepoint = require('../models/onepoint.model');

router.route('/').get((req, res) => {
    Onepoint.find()
    .then(onepoint => res.json(onepoint))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const E = req.body.E;
  const x = req.body.x;
  const error = req.body.error;


  const newOnepoint = new Onepoint({
    E,
    x,
    error
  });

  newOnepoint.save()
  .then(() => res.json('Onepoint added!'))
  .catch(() => res.json('Error: Onepoint Fail!'));
});

  
module.exports = router;