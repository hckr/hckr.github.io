let fs = require('fs'),
    prismjs = require('prismjs'),
    Hjson = require('hjson');

let info = fs.readFileSync('info.json', 'utf8');

let data = Hjson.parse(info.replace(/,.*\/\/.*/g, ''));

let tech_counts = {};
for (let project in data['selected projects']) {
    for (let tech of data['selected projects'][project]['technologies']) {
        tech_counts[tech] = (tech_counts[tech] + 1) || 1
    }
}
let tech_counts_arr = [];
for (let tech in tech_counts) {
    tech_counts_arr.push([tech, tech_counts[tech]]);
}

let technologies = tech_counts_arr.sort((a, b) => b[1] - a[1]).map(a => a[0]);

info = info.replace(',\n\n', `,\n    "technologies used": [ // in the projects below, not all that I know ;)\n        ${technologies.map(t => `"${t}"`).join(', ')}\n    ],\n`)

let infoHtml = prismjs.highlight(info, prismjs.languages.javascript),
    css = fs.readFileSync('style.inc.css', 'utf8'),
    js = fs.readFileSync('script.inc.js', 'utf8');

infoHtml = infoHtml.replace(/(https?:\/\/|\.\/)[^\s/$.?#].[^\s"]*/ig, match => `<a class="token url" href="${match}">${match}</a>`);

for (let tech of technologies) {
    let escaped = tech.replace(/\+/g, '\\+');
    infoHtml = infoHtml.replace(
        new RegExp(`<span class="token string">"${escaped}"</span>`, 'g'),
        `<span class="token string technology">"${tech}"</span>`);
}

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
<script>
${js}
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
