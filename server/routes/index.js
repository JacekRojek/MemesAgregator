const express = require('express');
const client = require('../redis_client');
const { getImages } = require('../sources/jbzd');

const router = express.Router();
const REDIS_KEYS = {
  JBZD: 'jbzd:',
};

const url = 'https://jbzd.com.pl/str/2';

router.get('/refresh', async (req, res, next) => {
  const memes = await getImages(url);
  memes.forEach((m, i) => {
    client.set(`${REDIS_KEYS.JBZD}${i}`, m.src);
  });
  res.json({ ok: 'true' });
});

/* GET home page. */
router.get('/:key/:id', async (req, res, next) => {
  const { params } = req;
  client.get(params.id, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ error: 'error' });
    } else {
      res.json(result);
    }
  });
});

router.get('/:key/', async (req, res, next) => {
  const { params } = req;
  const data = [];
  const stream = client.scanStream({
    match: `${REDIS_KEYS.JBZD}*`,
    count: 100,
  });
  stream.on('data', (keys) => {
    data.push([...keys]);
  })
  stream.on('end', () => {
    res.json({ data });
  })
});

module.exports = router;
