// const express = require("express")
// require("./database/config")
// const app = express()

// app.set("view engine","ejs")//tells express js to set environment for ejs to run

// app.get("/", (req,res)=>{
//     res.render("home", { title : "haina Nishant Gay"})
// })
// app.listen(3000, ()=>{
//     console.log("Server is running on http://localhost:3000")
// })


const express = require("express")
const db = require("./database/config")
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
const bcrypt = require("bcrypt")
const isLoggedInOrNot = require("./middleware/isLoginOrNot")


app.set("view engine", "ejs")  


// app.get("/", (req, res)=>{
//     res.render("home", {title: "hahah"})
// })
//geting todos data from db
app.get("/", async (req, res) =>{
    
    const datas = await db.todo.findAll()
    res.render("todo/getTodo", {datas: datas})
})


app.get("/register", (req, res)=>{
    res.render("authentication/register")
})
app.post("/register", async (req, res) =>{
    console.log(req.body);

     const{ name, email, password, confirm_password } = req.body
    // const name = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirm_password = req.body.confirm_password;

    if (password !== confirm_password){
        res.send("Confirm password and Password doesnot match")
    }
    await db.users.create({
        name : name, 
        password : bcrypt.hashSync(password, 10),
        email : email,
    })

    res.send("Registration Sucessfull")

})

app.get("/login", (req, res) =>{
    res.render("authentication/login")
})

app.post("/login", async (req, res) =>{
    const {email, password} = req.body
    
    // Login logic checking if the email exists or not in the db
    
    const users = await db.users.findAll({
        where: {
            email : email
        }
    })
    if(users.lenth ==0){ //check if the user exists, if not then return
        res.send("Email not registered")
    }
    else{
        // now verifying if the password match or not
        const isPasswordMatch = bcrypt.compareSync(password, users[0].password)
        
        if(isPasswordMatch){
            //jwt token generation
            
            const token = jwt.sign({name:"sumit"},"haha_secretkey",{
                expiresIn: "10d" //jwt token expiration time in sec, minutes, hrs and day 
            })
            // res.send(token) //showing token in the browser
            res.cookie("setting_name", token) //storing token as session in the web browser only
            // res.send("Logged in Successfully")
        }
        else{
            res.send("Invalid credentials")
        }
    }
    res.redirect("/")  //yesley chai aru url ma redirect garxa 
})
app.get("/createTodo", isLoggedInOrNot,(req, res) =>{ 
    res.render("todo/createTodo")
})

app.post("/createTodo", async (req, res) =>{
    console.log(req.body)

    const {title, description, date, status } = req.body

    await db.todo.create({
        title: title,
        description: description,
        date: date,
        status: status
    })
    res.send("todo created sucessfully")
})

//geting todos data from db
app.get("/getTodo", isLoggedInOrNot, async (req, res) =>{
    
    const datas = await db.todos.findAll()
    res.render("todo/getTodo", {datas: datas})
})




app.listen(3000, ()=>{
    console.log("server is running perfectly.")
})