// const express = require("express")
// require("./database/config")
// const app = express()

// app.set("view engine","ejs")

// app.get("/", (req,res)=>{
//     res.render("home", { title : "haina Nishant Gay"})
// })
// app.listen(3000, ()=>{
//     console.log("Server is running on http://localhost:3000")
// })










const express = require("express")
const db = require("./database/config")

const app = express()
app.use(express.urlencoded({ extended: true}))
const bcrypt = require("bcrypt")


app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("home", {title: "hahah"})
})

app.get("/register", (req, res)=>{
    res.render("authentication/register")
})
app.post("/register", async (req, res) =>{
    console.log(req.body);

     const{ username, email, password, confirm_password } = req.body
    // const name = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirm_password = req.body.confirm_password;

    if (password !== confirm_password){
        res.send("Confirm password and Password doesnot match")
    }
    await db.users.create({
        name : username, 
        password : bcrypt.hashSync(password, 10),
        email : email,
    })

    res.send("Registration Sucessfull")

})
app.get("/createTodo",(req, res) =>{
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
    // res.redirect("/")  //yesley chai aru url ma redirect garxa 
})


app.listen(3000, ()=>{
    console.log("server is running perfectly.")
})