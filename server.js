const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var initializePassport = require("./passport-config");
var passport = require("passport-local");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");

let users = [];
const app = express();



initializePassport(passport,
    email=> users.find((user)=> user.email == email,
    id=>users.find( user => user.id === id))
)
app.set("view-engine","ejs");
app.use(bodyParser());
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(methodOverride('_method'))
app.get("/",checkAuthenticated,(req,res)=>{
    res.render("index.ejs",{name:"Rahul"});
})
app.get("/login",checkAuthenticated,(req,res)=>{
    res.render("login.ejs");
})
app.get("/register",checkAuthenticated,(req,res)=>{
    res.render("register.ejs");
})
app.post("/register",async (req,res)=>{
   try {  
    let hashPassword = await bcrypt.hash(req.body.password,10);
    let {name,email}=req.body;
    users.push({
        name,
        email,
        password:hashPassword,
    })
    console.log("user registered");
    res.redirect("/login");
}
catch(error){
    console.log(error);
    res.redirect("/register");
} 
})

app.post("/login",(req,res)=>{

    successredirect = "/";
    failureRedirect = "/login"
    failureFlash = true;
    let {email,password} = req.body;

    let foundEmail= users.find((user)=>{
        return user.email === email;
    })
    console.log(foundEmail);
    res.redirect("/");
})
app.listen(3000,()=>{
    console.log("starting the application at 3000");
})