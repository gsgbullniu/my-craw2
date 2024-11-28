import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';
import fs from 'fs';

export const conn = new Crawler({
  maxConnections: 10,
  proxy: 'http://127.0.0.1:10090',
  rateLimit: 200,

  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$ as CheerioAPI;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      // fs.writeFileSync('test.html', $.html());
      const title = $('title')
        .text()
        .replace(/ - cool18.com$/g, '')
        // remove invalid characters in file name
        .replace(/[\\/:*?"<>|]/g, '_');

      const $content = $('.show_content pre');
      const $hide = $content.find('font[color=#E6E6DD]');
      $hide.next('p:empty').replaceWith('\n\n').end().remove();

      $content.find('font[color=E6E6DD]').replaceWith('\n\n');
      // $content.find('p').before('\n').after('\n');

      /*       $content.find('p').each((i, el) => {
        const pText = $(el).text();
        $(el).replaceWith(`\n${pText}\n`);
      }); */

      $content.find('br').replaceWith('\n');
      fs.writeFileSync(`data/${title}.txt`, $content.text() + '\n\n\n');
      console.log('Crawled done for ', title);
    }

    (done as any)();
  },
});
