const cheerio = require('cheerio');
const axios = require('axios');

const memes = [];
export async function getImages(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const images = $('article .article-image');
    images.each(function () {
      const src = $(this).find('img').attr('src');
      memes.push({ src });
    });
    return memes;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default getImages;
