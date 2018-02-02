let fs = require('fs'),
    prismjs = require('prismjs');

let info = fs.readFileSync('info.json', 'utf8'),
    infoHtml = prismjs.highlight(info, prismjs.languages.javascript),
    css = fs.readFileSync('style.inc.css', 'utf8');

JSON.parse(info); // validation

infoHtml = infoHtml.replace(/https?:\/\/[^\s/$.?#].[^\s"]*/ig, match => `<a class="token url" href="${match}">${match}</a>`);

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
<pre>${infoHtml}</pre>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
