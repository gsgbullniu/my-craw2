import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';
import fs from 'fs';

const c = new Crawler({
  maxConnections: 10,
  proxy: 'http://127.0.0.1:7890',
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$ as CheerioAPI;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      // fs.writeFileSync('test.html', $.html());
      const $content = $('.show_content pre');
      const $hide = $content.find('font[color=#E6E6DD]');
      $hide.next('p:empty').replaceWith('\n\n').end().remove();
      // $content.find('p').replaceWith('\n\n');
      /*       $content.find('p').each((i, el) => {
        const pText = $(el).text();
        $(el).replaceWith(`\n${pText}\n`);
      }); */

      $content.find('br').replaceWith('\n');
      fs.writeFileSync('test.txt', $content.text());
    }

    console.log('Crawled done');
    (done as any)();
  },
});

// Add just one URL to queue, with default callback
c.add('https://www.cool18.com/bbs4/index.php?app=forum&act=threadview&tid=14280908');

/*
// Add a list of URLs
c.add(['http://www.google.com/', 'http://www.yahoo.com']);

// Add URLs with custom callbacks & parameters
c.add([
  {
    url: 'http://parishackers.org/',
    jQuery: false,

    // The global callback won't be called
    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Grabbed', res.body.length, 'bytes');
      }
      done();
    },
  },
]);

// Add some HTML code directly without grabbing (mostly for tests)
c.add([
  {
    html: '<title>This is a test</title>',
  },
]);
 */
