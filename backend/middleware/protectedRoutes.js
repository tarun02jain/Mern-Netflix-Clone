import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
import { User } from '../models/userModel.js';


export const protectedRoute = async (req , res , next) => {
  try{
    const token = req.cookies["jwt_token"];
    if(!token) return res.status(401).json({message: 'Unauthorized - no token provided'});

    const decoded = jwt.verify(token , ENV_VARS.JWT_SECRET);
    if(!decoded) return res.status(401).json({success: false , message:"Unauthorized - invalid token"});

    const user = await User.findById(decoded.userID).select("-password");
    if(!user) return res.status(404).json({success: false , message:"Unauthorized - user not found"});

    req.user = user;
    next();
  }
  catch(error){
    res.status(500).json({message : "Internal Server Error" , error: error});
  }
};