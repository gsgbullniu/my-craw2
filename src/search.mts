import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';

const c = new Crawler({
  maxConnections: 10,
  proxy: 'http://127.0.0.1:7890',

  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$ as CheerioAPI;
      // fs.writeFileSync('test.html', $.html());
      const $item = $('table.dc_bar2 td span.t_subject');
      $item.each((i, el) => {
        console.log(` ===== `, $(el).text(), $(el).find('a').attr('href'));
      });
      // $item.find('a').attr('href');
      // fs.writeFileSync(`aa.txt`, $item.find('a').length + '');

      const title = $('title')
        .text()
        .replace(/ - cool18.com$/g, '')
        // remove invalid characters in file name
        .replace(/[\\/:*?"<>|]/g, '_');

      console.log('Crawled done for ', 'aa');
    }

    (done as any)();
  },
});

c.add(
  'https://www.cool18.com/bbs4/index.php?action=search&bbsdr=life6&act=threadsearch&app=forum&keywords=%E6%83%85%E6%AC%B2%E4%B8%A4%E6%9E%81&submit=%E6%9F%A5%E8%AF%A2',
);
