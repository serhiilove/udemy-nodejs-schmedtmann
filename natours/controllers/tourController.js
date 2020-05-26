const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
	const id = val * 1;
	const tour = tours.find((obj) => obj.id === id);

	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	next();
}

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price)
		return res.status(500).json({
			status: 'bad request',
			data: null,
		});

	next();
}

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours: tours,
		},
	});
};

exports.getTour = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			tour: tour,
		},
	});
};

exports.updateTour = (req, res) => {
	res.status(200).json({
		status: 'success',
		tour: '<Updated tour here ...>',
	});
};

exports.createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/../dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			if (err) throw err;

			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
};

exports.deleteTour = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};

