const dotenv = require('dotenv').config();
const router = require('express').Router();
const snoowrap = require('snoowrap');

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USER,
  REDDIT_PASSWORD
} = process.env;

router.get('/dashboard', (req, res) => {
    res.send(`
      <h1>DASHBOARD</h1>
    `)
  })

module.exports = router;
