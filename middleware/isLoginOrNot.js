const jwt = require("jsonwebtoken")
const isLoggedInOrNot = (req, res, next) => {
    //yo next garesi uta app.js ma middleware bata easily lina milxa tei specific function ma matra
    // console.log("hahah")
    // token receive garne paila
    const token = req.cookies.setting_name


    // Now verifying the token
    if(!token){
        res.send("Please login first")
    }
    else{
        // code to perform verification
        jwt.verify(token,"haha_secretkey",(error, result) => {
            if(error){
                res.send("Invalid Token")
            }
            else{
                // res.send("Valid token", verified)
                console.log(result)
                req.userId = result.id
                next()

            }
            
        })

    }



}
module.exports = isLoggedInOrNot