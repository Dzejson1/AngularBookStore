const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection")

//find all comments
router.get("/", (req, res) => {
    console.log("uso")
    mysqlConnection.query("SELECT * from Comment", (err, rows, fields) => {
        console.log(err);
        if (!err) {
            
            res.status(201).json({message: 'Success on getting book comments', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred on finding comment', 
                error: err
            });
        }
    })


})

//nadji sve komentare za dati id knjige
router.get("/findBy:idBook", (req, res) => {

    mysqlConnection.query("SELECT * from Comment where idBook=?", [req.params.idBook], (err, rows, fields) => {
        console.log(err);
        if (!err) {
            res.status(201).json({message: 'Success on getting book comments', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred on finding comment', 
                error: err
            });
        }
    })


})

//dodaj novi komentar
router.post("/addComment", (req, res) => {


    var postData = req.body;
    postData.publishDate=new Date(Date.now()).toLocaleDateString("fr-CA");

    mysqlConnection.query("INSERT INTO Comment SET ?", postData, (err, rows, fields) => {
        console.log(err);
        if (!err) {
              
            res.status(201).json({message: 'Success on posting book comments', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred on posting comment', 
                error: err
            });
        }
    })



})


module.exports = router;
