const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.BATABASE_PASSWORD
);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('DB connection succesful!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App running on port: ${port}`);
});
