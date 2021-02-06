const express = require('express');
const client = require('../redis_client');
const { getImages } = require('../sources/jbzd');

const router = express.Router();
const REDIS_KEYS = {
  JBZD: 'JBZD',
};

const url = 'https://jbzd.com.pl/str/2';

/* GET home page. */
router.get('/next', async (req, res, next) => {
  client.get(`${REDIS_KEYS}_1`, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ error: 'error' });
    } else {
      res.redirect(result);
    }
  });
});

router.get('/refresh', async (req, res, next) => {
  const memes = await getImages(url);
  memes.forEach((m, i) => {
    console.log(`${REDIS_KEYS}_${i}: `, m.src);
    client.set(`${REDIS_KEYS}_${i}`, m.src);
  });
  res.json({ ok: 'true' });
});

module.exports = router;
