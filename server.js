const express = require('express');
const { getMasterStrategy } = require('./logic');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/analyze', (req, res) => {
    res.json({ strategy: getMasterStrategy(req.body.history) });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Sniper v7 LIVE. Open the "Ports" tab to see the URL.');
});
