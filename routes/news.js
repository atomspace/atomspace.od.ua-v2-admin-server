const express = require('express');
const { News } = require('../models');
const multer = require('multer');
const path = require('path');

const upload = multer();

const newsRouter = express.Router();

newsRouter.get('/get-all-news', (req, res) => {
  News.getAll().then(news => {
    return res.status(200).json(news);
  });
});

newsRouter.post('/add-news-photo', upload.single('photo'), (req, res) => {
  req.files.photo
    .mv(path.join(__dirname, `../uploads/news/${req.files.photo.name}`))
    .then(saved => {
      return res.json({ ok: true });
    })
    .catch(err => console.log(err));
});

newsRouter.post('/add-new-article', (req, res) => {
  console.log(req.body);
  News.addNewArticle(req.body)
    .then(data => {
      return res.json({
        success: true,
        payload: 'Added'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send('An error occured unexpectadly');
    });
});

newsRouter.post('/edit-article', (req, res) => {
  News.editArticle(req.body)
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

newsRouter.delete('/delete-article', (req, res) => {
  News.deleteArticle(req.body.id)
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

module.exports = newsRouter;
