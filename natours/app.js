const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRouts');
const userRouter = require('./routes/userRouts');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
	console.log('Hi from middleware 🌿');
	next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// SERVER
const port = 3000;

app.listen(port, () => {
	console.log(`App running on port: ${port}`);
});
