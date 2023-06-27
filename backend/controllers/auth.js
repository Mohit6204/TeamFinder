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
            acceptedRequest:[],
        });
        const savedUser = await newUser.save();
        const {_id}=savedUser;
        const curUser={_id,firstName,lastName,contactNumber,email};
        const token=jwt.sign({id:_id},process.env.JWT_SECRET);
        res.status(201).json({token,curUser});

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
        const {_id,firstName,lastName,contactNumber}=user;
        const curUser={_id,firstName,lastName,contactNumber,email}
        res.status(200).json({token,curUser});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// Get user 

export const getUser=async (req,res)=>{
    try {
        const user_ID=req.user;
        const user=await User.findById(user_ID);
        const {_id,firstName,lastName,contactNumber,email}=user;
        const curUser={_id,firstName,lastName,contactNumber,email}
        res.status(200).json(curUser);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
