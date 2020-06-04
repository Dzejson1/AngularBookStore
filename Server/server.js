const express = require("express");
const bodyParser=require("body-parser");
const books=require("./routes/books");
const comments=require("./routes/comments");
const posts=require("./routes/posts");
const users=require("./routes/users");
const mysqlConnection=require("./connection")

var app=express();
app.use(bodyParser.json());

app.use("/books",books);
app.use("/comments",comments);
app.use("/posts",posts);
app.use("/users",users);
app.listen(3000); 