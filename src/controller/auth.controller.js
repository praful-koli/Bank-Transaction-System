const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");


/**
 *  - Register a new user
 *  @path POST /api/auth/register
 *  @body { username, email, password }
 */
const registerController = async (req, res) => {
    try {
         
         const {email , name , password} = req.body;

         if(!email || !name || ! password) {
             return res.status(400).json({
                message : "All fields are required"
             })
         }

         const isUserExist = await userModel.findOne({
            email: email
         })

         if(isUserExist) {
            return res.status(409).json({
                message : "User already exists"
            })
        }   

        const newUser =  await userModel.create({
            email : email,
            name : name,
            password : password
        })

        const token = jwt.sign({
            userId : newUser._id,
        }, config.JWT_SECRET, {
            expiresIn : '1d'
        })

        res.status(201).json({
            message : "User registered successfully",
            user : {
                id : newUser._id,
                email : newUser.email,
                name : newUser.name
            },
            token : token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



/**
 *  -Login a User 
 *  @path POST /api/auth/login
 *  @body {email, password}
 */

 const loginController = async (req, res) => {
    try {
        
        const {email ,password} = req.body
         
         if(!email || ! password) {
             return res.status(400).json({
                message : "All fields are required"
             })
         }
         
         const user = await userModel.findOne({email}).select("+password")

         if(!user) {
            return res.status(401).json({
                message : "Email or Passowrd is Invalid"
            })
         }
         console.log(user)
         const userPasswordValid = await user.comparePassword(password)
         
         if(!userPasswordValid) {
              return res.status(401).json({
                message : "Email or Passowrd is Invalid"
            })
         }

         const token = jwt.sign({
            userId : user._id
         } , config.JWT_SECRET , {
             expiresIn : '1d'
         })


         res.status(200).json({
            message : "User Login successfully",
            user : {
              id : user._id,
              email : user.email,
              name : user.name
            },
            token : token
         })
        
    } catch (error) {
         res.status(500).json({
            message : error.message
        })
    }
 }

module.exports ={
    registerController,
    loginController
}