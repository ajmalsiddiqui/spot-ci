const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ci', (req, res) => {
	res.send('hello');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});