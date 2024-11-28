import readline from 'readline';
import fs from 'fs';
import { conn } from './item.mjs';

const args = process.argv.slice(2);
console.log('args: ' + args);
const taskFile = args[0];

export async function processLineByLine() {
  const fileStream = fs.createReadStream(`data/${taskFile}.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const urls: string[] = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    if (line.startsWith('http')) {
      urls.push(line);
    }
  }

  return urls;
}

const urls = await processLineByLine();
console.log(`urls to dw ${urls.length} links: ${urls[0]}`);

// type def issue
conn.add(urls as any);
