const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MyBlog").then(()=>{
console.log("connected database ...");
}).catch((err)=>{
    console.log("erreur de connection "+err);
});

module.exports = mongoose;