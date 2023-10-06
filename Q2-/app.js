const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/numbers', (req, res) => {
    const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];
    const results = [];

    urls.forEach(url => {
        axios.get(url)
            .then(response => {
                results.push(response.data.numbers);

                if (results.length === urls.length) {
                    res.json({ numbers: results.flat() });
                }
            })
            .catch(error => {
                console.error(`Error fetching data from ${url}: ${error.message}`);
                results.push([]);  // Push an empty array in case of an error

                if (results.length === urls.length) {
                    res.json({ numbers: results.flat() });
                }
            });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
