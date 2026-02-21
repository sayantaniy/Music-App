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

async function getAllMusic(req,res){
    const musics = await musicModel.find().limit(20).populate('artist',"username email")
    res.status(200).json({
        message: "Musics Found Successfully",
        musics
    })
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().limit(20).select('album artist').populate('artist',"username email")
    res.status(200).json({
        message: "Albums Found Successfully",
        albums
    })
}

async function getAlbumById(req,res){
    const id = req.params.id
    const album = await albumModel.findById(id).populate('artist','username email')
    res.status(200).json({
        message: "Album Fetched Successfully",
        album
    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById };