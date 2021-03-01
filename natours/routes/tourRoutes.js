const express = require('express');
const { get } = require('mongoose');
const tourController = require('../controllers/tourController');

const router = new express.Router();

// router.param('id', tourController.checkId);

router
	.route('/top-5-chip')
	.get(tourController.aliasTopTours, tourController.getAllTours);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(tourController.createTour);

router
	.route('/:id')
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
