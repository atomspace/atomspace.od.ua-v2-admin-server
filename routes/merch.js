const express = require('express');
const { Merch } = require('../models');
const multer = require('multer');
const upload = multer();

const merchRouter = express.Router();

merchRouter.get('/get-all-merch', (req, res) => {
  Merch.getAll().then(merches => {
    return res.status(200).json(merches);
  });
});

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

merchRouter.post('/add-new-merch', upload.single('myFile'), (req, res) => {
  console.log(req.files);
  return res.json({ ok: true });
  // Merch.addNewMerch(req.body)
  //   .then(data => {
  //     return res.json({
  //       success: true,
  //       payload: 'Edited'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return res.status(500).send('An error occured unexpectadly');
  //   });
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
