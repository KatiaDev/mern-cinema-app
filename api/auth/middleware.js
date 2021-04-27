const Users = require('../user/model');
const jwt = require("jsonwebtoken");


//role 1, active true
const restrictedAcces = async (req,res,next) => {
    console.log("Cookies = ",req.cookies.token);

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please SingIn !!!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        return res.status(401).json({ message: 'Token invalid, please SingIn !!!" ' })
      } 
       const {userId} = req.decoded;
       
       const isAdmin = await Users.find({
            userId,
            active: true,
            role:1,
       }).exec().
       catch(next);
      
        if(isAdmin){
          next();
        } 
        return res.status(401).json("Sorry you don't have enough rights !!!"); 
    });

    }


module.exports =  {
    restrictedAcces,
}
