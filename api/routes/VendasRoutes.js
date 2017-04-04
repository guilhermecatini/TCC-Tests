'use strict'

const express = require('express');
const router = express.Router();
const VendasModel = require('../models/VendasModel')

router.get('/vendas', (req, res) => {
  VendasModel.find({}, (err, data) => {
  	if (err) return res.json(err)
  		return res.json(data)
  })
});

module.exports = router;