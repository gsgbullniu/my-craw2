import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';
import fs from 'fs';
import { conn } from "./item.mjs";

const args = process.argv.slice(2)
console.log('args: ' + args);
const id = args[0]

// Add just one URL to queue, with default callback
conn.add(`https://www.cool18.com/bbs4/index.php?app=forum&act=threadview&tid=${id}`);

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
