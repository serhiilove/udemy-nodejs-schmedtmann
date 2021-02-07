const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/toursModel');

dotenv.config({ path: './config.env' });

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

const importData = async () => {
	try {
		const tours = JSON.parse(
			fs.readFileSync(`${__dirname}/tours-simple.json`, {
				encoding: 'utf-8',
			})
		);
		await Tour.create(tours);
		console.log('Data succesfully loaded');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log('Data succesfully deleted');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
