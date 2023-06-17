import Team from "../models/team.js";
import User from "../models/user.js";

// Pending Requests

export const pendingRequest= async (req,res)=>{
  try {
    const userId=req.user;
    const newUser=await User.findById(userId);
    const pending=newUser.pendingRequest;
    res.status(200).json({pending});
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};

// Accepted Requests

export const acceptedRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const accepted=newUser.acceptedRequest;
        res.status(200).json({accepted});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Joining Requests

export const joinRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const join=newUser.joinRequest;
        res.status(200).json({join});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Apply to a Team 

export const applyTeam= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const {id,message}=req.body;
        const team=await Team.findById(id);
        const regUser=await User.findById(team.userId);
        regUser.joinRequest.push({user:userId,message:message,teamId:id});
        newUser.pendingRequest.push(team.userId);
        res.status(200).json({newUser});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Accepting or Rejecting a Team

export const confirmation= async (req,res)=>{
  try {
    const userId=req.user;
    const regUser=await User.findById(userId);
    const {id,isConfirmed,message,newId}=req.body;
    const team=await Team.findById(id);
    const newUser=await User.findById(newId);
    if(isConfirmed){
      newUser.acceptedRequest.push(id);
      team.members.push(newId);
    }
    newUser.pendingRequest.splice(newUser.pendingRequest.indexOf(id),1);
    regUser.joinRequest.splice(regUser.joinRequest.indexOf({user:newId,message:message,teamId:id}),1);
    res.status(200).json({team});
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};