const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
