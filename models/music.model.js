const mongoose = require("mongoose");

const musicSchema = mongoose.Schema({
    uri:{
        required:true,
        type:String,
        unique:true
    },
    title:{
        required:true,
        type:String
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:'true'
    }
})

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;