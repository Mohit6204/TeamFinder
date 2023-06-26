import Team from "../models/team.js";
import User from "../models/user.js";

// Pending Requests

export const pendingRequest= async (req,res)=>{
  try {
    const userId=req.user;
    const newUser=await User.findById(userId);
    const response=await Promise.all(newUser.pendingRequest.map( async (val)=>{
         const team=await Team.findById(val.id);
         const value={
          title:team.title,
          description:team.description,
          id:team._id,
          size:team.intake,
          message:val.message,
         }
         return value;
    }))
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};

// Accepted Requests

export const acceptedRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const response=await Promise.all(newUser.acceptedRequest.map( async (Id)=>{
          const team=await Team.findById(Id);
          const value={
           title:team.title,
           description:team.description,
           id:team._id,
           size:team.intake,
          }
          return value;
     }))
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Joining Requests

export const joinRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const response=await Promise.all(newUser.joinRequest.map( async (val)=>{
          const team=await Team.findById(val.team_id);
          const regUser=await User.findById(val.user_id);
          const value={
           title:team.title,
           description:team.description,
           team_id:team._id,
           size:team.intake,
           message:val.message,
           name:regUser.firstName+" "+regUser.lastName,
           email:regUser.email,
           contactNumber:regUser.contactNumber,
           user_id:val.user_id,
          }
          return value;
     }))
        res.status(200).json(response);
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
        regUser.joinRequest.push({team_id:id,user_id:userId,message:message});
        newUser.pendingRequest.push({id:id,message:message});
        regUser.save();
        newUser.save();
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
    const {team_id,isConfirmed,user_id}=req.body;
    const team=await Team.findById(team_id);
    if(userId!==team.userId){
      res.status(403).json("Accsess Denied!!");
    }
    const newUser=await User.findById(user_id);
    if(isConfirmed){
      team.members.push({id:user_id});
      team.intake=team.intake-1;
      newUser.acceptedRequest.push({id:team_id});
    }
      newUser.pendingRequest = newUser.pendingRequest.filter((request) => request.id !== id);
      regUser.joinRequest = regUser.joinRequest.filter((request) => request.team_id !== id );
    team.save();
    newUser.save();
    regUser.save();
    res.status(200).json({team});
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};