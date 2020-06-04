const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection")
var jwt = require('jsonwebtoken');

//nadji sve korisnike(samo admin)
router.get("/", (req, res) => {



    mysqlConnection.query("SELECT * from User", (err, rows, fields) => {
        
        if (!err) {

            res.status(201).json({ message: 'Success on finding all of the users', obj: rows });

        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting find all of the users',
                error: err
            });
        }
    })


})

//nadji korisnika po id-u
router.get("/findBy:idUser", (req, res) => {

    mysqlConnection.query("SELECT * from User where idUser=?", [req.params.idUser], (err, rows, fields) => {
        console.log(err);
        if (!err) {
            res.status(201).json({ message: 'Success on the book finding the user', obj: rows[0]});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to find the user',
                error: err
            });
        }
    })


})

//dodaj novog korisnika(registracija, mora i login)
router.post("/addUser", (req, res) => {


    var postData = req.body;

    mysqlConnection.query("SELECT * from User where email=? AND password=?", [req.body.email, req.body.password], (err, rows, fields) => {
        console.log(err);
        if (!err) {
            var i = 0;
            for (var m in rows) {
                i++;
            }
            if (i == 0) {
                mysqlConnection.query("INSERT INTO User SET ?", postData, (err, rows, fields) => {
                    console.log(err);
                    if (!err) {

                        res.status(201).json({ message: 'Success on the adding the user', obj: rows });
                    }
                    else {
                        res.status(500).json({
                            title: 'An error occurred attempting to add the user',
                            error: err
                        });
                    }
                })
            } else {
                res.status(500).json({
                    title: 'Not unique user',
                    error: err
                });



            }
            // res.status(201).json({message: 'Success on the book finding the user', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to find the user',
                error: err
            });
        }
    })





})

//update korisnika
router.patch("/updateImage:idUser", (req, res) => {


    mysqlConnection.query("UPDATE User set image=? where idUser=?", [req.body.image, req.params.idUser], (err, rows, fields) => {
       
        if (!err) {

            res.status(201).json({ message: 'Success on the patch the user', obj: rows });
        }
        else {

            res.status(500).json({
                title: 'An error occurred on patching user',
                error: err
            });
        }
    })
})

//logovanje korisnika
router.post('/login', (req, res) => {

    mysqlConnection.query("SELECT * from User where email=? AND password=?", [req.body.email, req.body.password], (err, rows, fields) => {
       
        if (!err) {
            var i = 0;
            for (var m in rows) {
                i++;
            }
            if (i == 1) {

                res.status(201).json({
                    obj:rows[0],
                    msg: 'Successfully logged in',
                    token: jwt.sign({ user: req.body.password }, 'SECRET'),
                    log: 1,
                    // token: jwt.sign({user: user.username}, 'SECRET')
                });



            }
            else {
                res.status(500).json({
                    title: 'Login failed',
                    msg: 'Invalid email and/or password!',
                    log: 0,
                    // token: jwt.sign({user: user.username}, 'SECRET')
                });

            }

            //res.status(201).json({message: 'Success on the book finding the user', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to login',
                msg: 'Invalid email and/or password!',
                error: err
            });
        }
    })

});




module.exports = router;
