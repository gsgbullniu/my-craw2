import * as cheerio from 'cheerio';
const $ = cheerio.load(`
  <html lang="en">
<head>
  <meta charset="utf-8">
  <title>next demo</title>
  <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
</head>
<body>

<p>Hello</p>
<p class="selected">Hello Again</p>
<div><span>And Again</span></div>
<p class="selected">Hello Again 2</p>

</body>
</html>
  `);

const r = $('p').next('.selected').text();

console.log(` ===== `, r);
// .css('background', 'yellow');
