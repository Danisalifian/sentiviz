const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Keywords = require('../models/Keywords')

router.get('/', (req, res, next) => {
	Keywords.find()
	.exec()
	.then(docs => {
		res.status(200).json(docs)
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
})

router.post('/', (req, res, next) => {
	const keywords = new Keywords({
		_id: new mongoose.Types.ObjectId(),
		keyword: req.body.keyword
	})

	keywords.save().then(result => {
		res.status(201).json({
			message: "Handling post keywords",
			Keywords: result
		})
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
})

router.get('/:keywordsId', (req, res, next) => {
	const id = req.params.keywordsId
	Keywords.findById(id)
	.exec()
	.then(doc => {
		if (doc) {
			res.status(200).json(doc)
		} else {
			res.status(404).json({message: "No valid entry provided"})
		}
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
})

router.delete('/:keywordsId', (req, res, next) => {
	const id = req.params.keywordsId
	Keywords.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result)
	})
	.catch(err => {
		err.status(500).json({
			error: err
		})
	})
})

module.exports = router