const express = require('express');
const router = express.Router();



/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('here',req.sessionID);
  res.render('index', {title: 'Express'});
});

// router.post('/registration', (req, res) => {
//   console.log(req.body);
// });

module.exports = router;
