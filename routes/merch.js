const express = require('express');
const { Merch } = require('../models');

const merchRouter = express.Router();

merchRouter.post('/edit-merch', (req, res) => {
  Merch.editMerch(req.body)
    .then(data => {
      return res.json({
        success: true,
        payload: 'Edited'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send('An error occured unexpectadly');
    });
});

merchRouter.get('/get-all-merch', (req, res) => {
  Merch.getAll().then(merches => {
    return res.status(200).json(merches);
  });
});

merchRouter.delete('/delete-merch', (req, res) => {
  Merch.deleteMerch(req.body.id)
    .then(data => {
      return res.json({
        success: true,
        payload: 'Deleted'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send('An error occured unexpectadly');
    });
});

module.exports = merchRouter;
