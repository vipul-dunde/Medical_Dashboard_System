const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.get('/login', function(req,res){
    res.render("login");
});

router.get('/register', function(req, res){
    res.render("register");
});

router.get('/rooms', function(req, res){
    res.render("rooms");
});

router.get('/dashboard', function(req, res){
    res.render("dashboard");
});

router.get('/addpatient', function(req, res){
    res.render("addpatient");
});

router.get("/adddoctor", function(req, res){
    res.render("adddoctor");
});

router.get("/deletepage", function(req, res){
    res.render("deletepage");
});

router.get("/complain",function(req,res){
    res.render("complain");
})

router.get("/salary",function(req,res){
    res.render("salary");
})




module.exports =  router;