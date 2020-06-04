const mysql=require("mysql");

var mysqlConncetion=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Priboj_98",
    database:"BookTradingClub",
    multipleStatements:true
    
}) 
mysqlConncetion.connect((err)=>{
    if(!err){
        console.log("connected") 
    }else{
       console.log("not connected")
    }
    //console.log(err);
})

module.exports=mysqlConncetion;