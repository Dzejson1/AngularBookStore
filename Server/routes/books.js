const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection")

//find all books
router.get("/", (req, res) => {

  

    mysqlConnection.query("SELECT * from Book", (err, rows, fields) => {
        //console.log(err);
        if (!err) {

           // res.status(201).json({message: 'Success on finding all of the books', obj: rows});
           res.send(rows);
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting find all of the books', 
                error: err
            });
        }
    })


})

//find book by id
router.get("/findBy:idBook", (req, res) => {

   
    
    mysqlConnection.query("SELECT * from Book where idBook=?", [req.params.idBook], (err, rows, fields) => {
       
        if (!err) {
           res.status(201).json({message: 'Success on the book finding the book', obj: rows[0]});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to find the book', 
                error: err
            });
        }
    })


})

//all books that belong to the user
router.get("/nadjiUsera:idUser", (req, res) => {

   
    
    mysqlConnection.query("SELECT * from Book where idUser=?",[req.params.idUser] ,(err, rows, fields) => {
       
        if (!err) {
           res.status(201).json({message: 'Success on the book finding the book', obj: rows});

        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to find the book', 
                error: err
            });
        }
    })


})


//update book(sold), proveri patch adminnov
router.patch("/soldBook:idBook", (req, res) => {

     mysqlConnection.query("UPDATE Book set solded=1, idUserBuyer=? where idBook=?", [req.body.idUser1,req.params.idBook], (err, rows, fields) => {
        
        if (!err) {

            res.status(201).json({message: 'Success on solding the book ', obj: rows});

        }
        else {

            res.status(500).json({
                title: 'An error occurred attempting to sold a book', 
                error: err
            });
        }
    })
})


//update book(sold), proveri patch adminnov
router.patch("/promeni:idBook", (req, res) => {

     mysqlConnection.query("UPDATE Book set title=? where idBook=?", [req.body.title,req.params.idBook], (err,  rows, fields) => {
        
        if (!err) {

            res.status(201).json({message: 'Success on solding the book ', obj: rows});

        }
        else {

            res.status(500).json({
                title: 'An error occurred attempting to sold a book', 
                error: err
            });
        }
    })
})


// book, proveri patch adminnov
router.patch("/updateBook:idBook", (req, res) => {


    mysqlConnection.query("UPDATE Book set ? where idBook=?", [req.body.book,req.params.idBook], (err, rows, fields) => {
        
        if (!err) {

            res.status(201).json({message: 'DObar braca dobar', obj: rows});
        }
        else {

            res.status(500).json({
                title: 'An error occurred on patching book', 
                error: err
            });
        }
    })
})



//add new book
router.post("/addBook", (req, res) => {


    var postData = req.body;
    postData.publishDate=new Date(Date.now()).toLocaleDateString("fr-CA");

    mysqlConnection.query("INSERT INTO Book SET ?", postData, (err, rows, fields) => {
        console.log(err);
        if (!err) {

            res.status(201).json({message: 'Success on the adding the book', obj: rows});
        }
        else {
            res.status(500).json({
                title: 'An error occurred attempting to add the book', 
                error: err
            });
        }
    })
})




//delete book(ostao je delete admin da se napise)
router.delete("/deleteBook:idBook", (req, res) => {


    mysqlConnection.query("DELETE from Comment where idBook=?", [req.params.idBook], (err, rows, fields) => {
        console.log(err);

        if (!err) {
            mysqlConnection.query("DELETE from Book where idBook=?", [req.params.idBook], (err, rows, fields) => {
                
              
                if (!err) {
        
                    res.status(201).json({message: 'Success on deleting the  book', obj: rows});
                    
                }
                else {
        
                    res.status(500).json({
                        title: 'An error occurred attempting to delete a book', 
                        error: err
                    });
                }
            })

        }
        else {

            res.status(500).json({
                title: 'An error occurred attempting to delete a comment for book', 
                error: err
            });
        }
    })


    
})


module.exports = router;
