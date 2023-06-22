import bcrypt from"bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// REGISTER USER
export const register=async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            contactNumber,
            password
        } = req.body

        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newUser=new User({
            firstName,
            lastName,
            contactNumber,
            email,
            password:passwordHash,
            teams:[],
            pendingRequest:[],
            acceptedRequest:[]
        });
        const savedUser=await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        delete newUser.password;
        res.status(201).json({token,savedUser});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//LOGIN

export const login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({message:"User does not exist."});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials."}) 

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
