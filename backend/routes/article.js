const express = require('express');

const router = express.Router();

const Article = require('../models/article');

const multer = require('multer');


filename="";

const myStorage = multer.diskStorage({
    destination : './uploads',
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let f1 = date+'.'+file.mimetype.split("/")[1];
        redirect(null,f1);
        filename = f1;
    }
});
const upload = multer({storage:myStorage});

router.post('/ajout',upload.any('image'),(req,res)=>{
    let data = req.body;
    let article = new Article(data);
    console.log("idAuthor => "+article.idAuthor);
    article.date = new Date();
    article.image = filename;
    article.tags = data.tags.split(',');
    article.save().then((saved)=>{
        filename = "";
        console.log(article);
        res.status(200).send("saved");
        console.log("ajout avec succés !!");
    }).catch((err)=>{
        res.status(400).send(err);
        console.log("erreur d'ajout !!");
    });
});
router.get('/all',(req,res)=>{
    Article.find({}).then((articles)=>{
        res.status(200).send(articles);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});
router.get('/getbyid/:id',(req,res)=>{
let id = req.params.id;
Article.findOne({_id:id}).then((articles)=>{
    res.status(200).send(articles);
}).catch((err)=>{
    res.status(400).send(err);
});
});
router.get('/getbyauthorid/:id',(req,res)=>{
    let idAuthor = req.params.id;
    Article.find({idAuthor:idAuthor}).then((articles)=>{
        res.status(200).send(articles);
    }).catch((err)=>{
        res.status(400).send(err);
    });
    
});
router.delete('/supprimer/:id',(req,res)=>{
    let id = req.params.id;
    Article.findByIdAndDelete({_id:id}).then((article)=>{
        res.status(200).send(article);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});
router.put('/update/:id',upload.any('image'),(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    
    data.tags = data.tags.split(',');
    if(filename.length > 0){
        data.image = filename;
    }
    Article.findByIdAndUpdate({_id:id},data).then((article)=>{
        res.status(200).send("article modifié avec succés ! ");
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

module.exports = router;