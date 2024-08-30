import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';
import fs from 'fs';

const args = process.argv.slice(2)
console.log('args: ' + args);
const kw = args[0]

const c = new Crawler({
  maxConnections: 10,
  proxy: 'http://127.0.0.1:10090',

  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$ as CheerioAPI;
      // fs.writeFileSync('test.html', $.html());
      const $item = $('table.dc_bar2 td span.t_subject');
      const links:string[]=[]
      $item.each((i, el) => {
        links.push(`${$(el).text()}\nhttps://www.cool18.com/bbs4/${$(el).find('a').attr('href')}`)
      });
      // $item.find('a').attr('href');
      // fs.writeFileSync(`aa.txt`, $item.find('a').length + '');
      fs.writeFileSync(`data/s-${kw}.txt`, links.join('\n\n'));

      console.log('search done for ', kw);
    }

    (done as any)();
  },
});


const r = new URL('https://www.cool18.com/bbs4/index.php?action=search&bbsdr=life6&act=threadsearch&app=forum&submit=%E6%9F%A5%E8%AF%A2');
r.searchParams.set('keywords', kw)
console.log(r.toString());

c.add(r.toString());
/* c.add(
  'https://www.cool18.com/bbs4/index.php?action=search&bbsdr=life6&act=threadsearch&app=forum&keywords=%E6%83%85%E6%AC%B2%E4%B8%A4%E6%9E%81&submit=%E6%9F%A5%E8%AF%A2',
); */
