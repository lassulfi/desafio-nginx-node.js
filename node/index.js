const express = require('express');
const app = express();
const port = 3000;

const db = require('./db/db');
const nameUtils = require('./utils/nameGenerator');

app.get('/', (req, res) => {
    const name = nameUtils.getRandomNames();
    db.insertPeople(name);
    res.setHeader('Content-Type', 'text/html');
    let html = '<h1>Full Cycle Rocks!</h1>';
    html += '<h2>People list</h2>';
    db.findNames()
    .then(results => {
        html += `<h3>${results.length} entries found</h3>`
        html += '<ul>'
        for (let names in results) {
            html += `<li>${results[names].name}</li>`;
        }
        html += '</ul>';
        res.end(html);
    })
    .catch(err => {
        console.error('Promisse rejection error: ', err);
        html += '<h3>Error</h3>';
        res.end(html);
    });
});

app.listen(port, () => {
    console.log(`Node-app running on port ${port}`);
});
