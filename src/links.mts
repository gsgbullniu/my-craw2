import { CheerioAPI } from 'cheerio';
import Crawler from 'crawler';
import fs from 'fs';

const args = process.argv.slice(2);
console.log('args: ' + args);
const id = args[0];

const conn = new Crawler({
  maxConnections: 10,
  proxy: 'http://127.0.0.1:10090',
  rateLimit: 200,

  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$ as CheerioAPI;
      const title = $('title')
        .text()
        .replace(/ - cool18.com$/g, '')
        .replace(/[\\/:*?"<>|]/g, '_');

      const $content = $('.show_content pre');

      const links: string[] = [];

      $content.find('a').each((i, el) => {
        const pText = $(el).text();
        let link = $(el).attr('href');
        if (!link?.startsWith('http')) link = `https://www.cool18.com/bbs4/${link}`;

        links.push(`${pText}\n${link}`);
        // console.log(` ===== `, pText);
        // console.log(` ===== `, link);
      });

      console.log('============',
      $('p:contains("所有跟帖:")')
      .next()
      .find('li').length
      );

      $('p:contains("所有跟帖:")')
        .next()
        .find('li')
        .each((i, el) => {
          const $a = $(el).children('a')
          const pText = $a.text();
          const link = $a.attr('href');

          // let allEmpty = $(el).find('li:contains("(0 bytes)")').length === $(el).find('li').length

          if (!pText.includes('(0 bytes)') && !pText.includes('(无内容)')) {
            // console.log(` ===== `, pText);
            // console.log(` ===== `, link);
            links.push(`${pText}\nhttps://www.cool18.com/bbs4/${link}`);
          }
        });

      fs.writeFileSync(`data/link-${title}.txt`, links.join('\n\n'));
      console.log('Crawled done for ', title);
    }

    (done as any)();
  },
});

conn.add(`https://www.cool18.com/bbs4/index.php?app=forum&act=threadview&tid=${id}`);
