const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection")

//find all posts
router.get("/", (req, res) => {
    console.log("uso")
    mysqlConnection.query("SELECT * from Post", (err, rows, fields) => {
        console.log(err);
        if (!err) {

            res.status(201).json({message: 'Success on finding all of the posts', obj: rows});
           
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting find all of the posts', 
                error: err
            });
        }
    })
})

//find post by id
router.get("/findBy:idPost", (req, res) => {

    mysqlConnection.query("SELECT * from Post where idPost=?", [req.params.idPost], (err, rows, fields) => {
        console.log(err);
        if (!err) {
            res.status(201).json({message: 'Success on finding the post', obj: rows[0]});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to find the post', 
                error: err
            });
        }
    })


})

//add new post
router.post("/addPost", (req, res) => {


    var postData = req.body;


    mysqlConnection.query("INSERT INTO Post SET ?", postData, (err, rows, fields) => {
        console.log(err);
        if (!err) {

            res.status(201).json({message: 'Success on the post', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to add the post', 
                error: err
            });
        }
    })



})

//update post(jedino admin moze)
router.patch("/updatePost", (req, res) => {


    mysqlConnection.query("UPDATE Post set title=?, content =? where idPost=?", [req.body.title, req.body.content, req.body.idPost], (err, rows, fields) => {
        console.log(err);
        res.send(fields);
        if (!err) {

            res.status(201).json({message: 'Success on the patch the post', obj: rows});
        }
        else {

            res.status(500).json({
                title: 'An error occurred on patching post', 
                error: err
            });
        }
    })
})

//delete post(samo admin)
router.delete("/deletePost:idPost", (req, res) => {


    mysqlConnection.query("DELETE from Post where idPost=?", [req.params.idPost], (err, rows, fields) => {
        console.log(err);

        if (!err) {

            res.status(201).json({message: 'Success on deleting the post', obj: rows});
        }
        else {

            res.status(500).json({
                title: 'An error occurred attempting to delete the post', 
                error: err
            });
        }
    })
})


module.exports = router;
