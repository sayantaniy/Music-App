const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
    album: {
        required: true,
        type: String,
    },
    musics: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music',
        required: true
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel