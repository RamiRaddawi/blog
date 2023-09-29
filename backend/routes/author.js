const express = require('express');

const router = express.Router();

const Author = require('../models/author');

const multer = require('multer');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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

router.post('/register',upload.any('image'),(req,res)=>{
    let data = req.body;
    console.log(data);
    let author = new Author(data);
    let salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password,salt);
    console.log("idAuthor => "+author.id);
    author.date = new Date();
    author.image = filename;
    
    author.save().then((saved)=>{
        filename = "";
        console.log(author);
        res.status(200).send(saved);
        console.log("ajout avec succés !!");
    }).catch((err)=>{
        res.status(400).send(err);
        console.log("erreur d'ajout !!");
    });
});

router.post('/login',(req,res)=>{
    let data = req.body;
    console.log(data);
    Author.findOne({email:data.email}).then((author)=>{
        let valid = bcrypt.compareSync(data.password,author.password);
        if(!valid){
            res.send("email or password invalid !! ");
        }else{
                let payload = {
                    _id:author.id,
                    email:author.email,
                    fullname: author.name+" "+author.lastname
                }
                let token = jwt.sign(payload,'123456789');
                res.send({mytoken:token});
        }
    })
    
    
   
});

router.get('/all',(req,res)=>{
    Author.find({}).then((authors)=>{
        res.status(200).send(authors);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Author.findOne({_id:id}).then((author)=>{
        res.status(200).send(author);
    }).catch((err)=>{
        res.status(400).send(err);
    });
 });

 router.delete('/supprimer/:id',(req,res)=>{
    let id = req.params.id;
    Author.findByIdAndDelete({_id:id}).then((author)=>{
        res.status(200).send("suppression avec succés !!");
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

module.exports = router;