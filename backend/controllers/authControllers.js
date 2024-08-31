import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req , res) {
  try {
    console.log("hi");
    const {username , email, password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json({success: false, message: 'All fields are required'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json( {success: false, message: 'Invalid email'});
    }

    if(password.length < 6){
      return res.status(400).json({success: false, message: 'Password must be at least 6 characters'});
    }

    const existingUserByEmail = await User.findOne({email : email});

    if(existingUserByEmail){
      return res.status(400).json({success: false,message: 'Email already exists'});
    }

    const existingUserByUsername = await User.findOne({username : username});
    
    if(existingUserByUsername){
      return res.status(400).json({success: false, message: 'Username already exists'});
    }

    const PROFILE_PICS = ['../avatar1.png', '../avatar2.png' , '../avatar3.png'];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image
    
    });

    generateTokenAndSetCookie(newUser._id , res);
    await newUser.save();

    res.status(201).json({message: "User created successfully", success: true, user: {
      ...newUser._doc,
      password: ""
    }});

  } catch (error) {
    res.status(500).json({success: false, message: "Error saving"});
  }
}

export async function login(req , res) {
  try {
    const {email , password} = req.body;
    
    if(!email ||!password) {
      return res.status(400).json({success: false,message: 'All fields are required'});
    }
    
    const user = await User.findOne({email : email});
    if(!user){
      return res.status(401).json({success: false,message: 'Invalid credentials'});
    }
    
    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({success: false,message: 'Invalid credentials'});
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
  } catch (error) {
    res.status(500).json({success: false,message: "Error login"});
  }
}

export async function logout(req , res) {
  try {
    res.clearCookie("jwt_token");
    res.status(200).json({success: true,message: "Logged out"});

  } catch (error) {
    res.status(500).json({success: false,message: "Error logging out"});
  }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};