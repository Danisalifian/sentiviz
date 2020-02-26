const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DataTeranalises = require('../models/DataTeranalises');

router.get('/', (req, res, next) => {
  DataTeranalises.find()
  .exec()
  .then(docs => {
    // console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:statusesId', (req, res, next) => {
  const id = req.params.statusesId;
  DataTeranalises.findById(id)
    .exec()
    .then(doc => {
      console.log("From Database : ", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: 'No valid entry found for provided Id'})
      }

    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
  });
});

module.exports = router;
