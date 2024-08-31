import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";


export const generateTokenAndSetCookie = (userID , res)=>{
  const token = jwt.sign({ userID }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

  res.cookie("jwt_token", token , {
    maxAge: 15  * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict"
  });

  return token;

}