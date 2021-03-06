const express = require('express');
const bodyParser = require('body-parser');

const { execFile } = require('child_process');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ci', (req, res) => {
	try {
		const child = execFile('./main.sh', {cwd: __dirname}, (error, stdout, stderr) => {
			if (error) 
				res.status(200).json({
					'message': 'Something went wrong',
					'error': JSON.stringify(error)
				});
			console.log(stdout);
			console.log(stderr);
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