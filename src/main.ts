// Copyright (c) 2024 Agfa HealthCare Corporation

import Crawler from 'crawler';

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log($('#repository-link').text());
    }
    (done as any)();
  },
});

// Add just one URL to queue, with default callback
c.add('https://www.npmjs.com/package/crawler');
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
