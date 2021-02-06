const express = require('express');
const { getImages } = require('../sources/jbzd');

const router = express.Router();
const url = 'https://jbzd.com.pl/str/2';

/* GET home page. */
router.get('/', async (req, res, next) => {
  const memes = await getImages(url);

  res.redirect(memes[0].src);
});

module.exports = router;
