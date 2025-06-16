const jwt = require("jsonwebtoken")
const isLoggedInOrNot = (req, res) => {
    console.log("hahah")
    // token receive garne paila
    const token = req.cookies.token


    // Now verifying the token
    if(!token){
        res.send("Please login first")
    }
    else{
        // code to perform verification
        jwt.verify(token,"haha_secretkey",
        (error, result) => {
            if(error){
                res.send("Invalid Token")
            }
            else{
                res.send("Valid token", verified)
            }
            
        })

    }



}
module.exports = isLoggedInOrNot