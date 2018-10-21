const express = require('express');
const bodyParser = require('body-parser');

const { execFile } = require('child_process');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ci', (req, res) => {
	try {
		const child = execFile('./main.sh'], (error, stdout, stderr) => {
			if (error) {
				throw error;
			}
			console.log(stdout);
			res.status(200).json({
				'message': 'successfully updated deployment'
			});
		});
	} catch(e) {
		console.log(e);
		res.status(200).json({
			'message': 'Something went wrong',
			'error': JSON.stringify(e)
		});
	}
	
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});