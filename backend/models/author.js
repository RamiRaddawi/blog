const mongoose = require("mongoose");

const author = mongoose.model('Author',{
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    about:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports = author;