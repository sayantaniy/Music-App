const express = require('express')
const musicController = require('../controllers/music.controller')

const router = express.Router()

router.post('/createmusic', musicController.createMusic)

module.exports = router