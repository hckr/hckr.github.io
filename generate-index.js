let fs = require('fs'),
    prismjs = require('prismjs');

let info = fs.readFileSync('info.json', 'utf8'),
    infoHtml = prismjs.highlight(info, prismjs.languages.javascript),
    css = fs.readFileSync('node_modules/prismjs/themes/prism-tomorrow.css', 'utf8');

JSON.parse(info); // validation

infoHtml = infoHtml.replace(/https?:\/\/[^\s/$.?#].[^\s"]*/ig, match => `<a class="token url" href="${match}">${match}</a>`);

css += '\n\n' + 'pre { overflow: visible !important; } html { background: #2d2d2d; }';

html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Jakub Młokosiewicz – hckr.pl</title>
<style>
${css}
</style>
</head>
<body>
<pre class="language-js">${infoHtml}</pre>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
