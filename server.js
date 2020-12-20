const { render } = require("ejs");
const express = require("express");
const bodyParser = require("bodyParser");

const app = express();

app.set("view-engine","ejs");
app.use(bodyParser());
app.get("/",(req,res)=>{
    res.render("index.ejs",{name:"Rahul"});
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})
app.post("/register",(req,res)=>{
    res.render("index.ejs");
})
app.listen(3000,()=>{
    console.log("starting the application at 3000");
})