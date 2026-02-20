const musicModel = require("../models/music.model");
const albumModel = require("../models/album model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");


async function createMusic(req, res) {

  const { title } = req.body
  const file = req.file

  const result = await uploadFile(file.buffer.toString('base64'))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
  })

  res.status(201).json({
    message: "Music Created Successfully",
    music
  })
}

async function createAlbum(req,res){

    const { album, musics } = req.body

    const albumCreated = await albumModel.create({
        album,
        artist: req.user.id,
        musics
    })

    res.status(201).json({
        message: "Album Created Successfully",
        albumCreated
    })

}

module.exports = { createMusic, createAlbum };
