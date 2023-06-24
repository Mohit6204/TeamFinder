import Team from "../models/team.js";
import User from "../models/user.js";

// Get all Teams without login

export const allTeams=async (req,res)=>{
    try {
        const teams=await Team.find({intake:{$gt:0}});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Get all Teams with login

export const getTeams=async (req,res)=>{
    try {
        const userId=req.user;
        const myUser=await User.findById(userId);
        const pending=myUser.pendingRequest;
        const accepted=myUser.acceptedRequest;
        const team=myUser.teams;
        const notInclude=[...pending,...accepted,...team];
        const teams=await Team.find({_id:{$nin:notInclude},intake:{$gt:0}});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Get my Team

export const myTeams=async (req,res)=>{
    try {
        const userId=req.user;
        const newuser= await User.findById({userId});
        const teams=newuser.teams;
        const currTeams=await promise.all(teams.map( async (team)=>{
             newTeam=await Team.findById(team);
             return newTeam;
        }))
        res.status(200).json(currTeams);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Create Team

export const createTeam=async (req,res)=>{
    try {
        const userId=req.user;
        const newuser= await User.findById(userId);
        const {description,title,intake}=req.body;
        const newpost= new Team({
            userId,
            adminName:newuser.firstName+" "+newuser.lastName,
            description,
            title,
            intake,
            remaining:intake,
            members:[],
        });
        const savedPost=await newpost.save();
        newuser.teams.push(savedPost);
        newuser.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// Delete Team

export const deleteTeam =async (req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user;
        const team= await Team.findById(id);
        if(userId!==team.userId){
            res.status(403).json("Access Denied!!");
            return;
        }
        await promise.all(team.members.map(async (newId)=>{
            const newUser=await User.findById(newId);
            newUser.acceptedRequest.splice(newUser.acceptedRequest.indexOf(id),1);
            newUser.save();
        }));
        const regUser=await User.findById(id);
        await promise.all(regUser.joinRequest.map(async (value,index)=>{
            if(value.teamId===id){
                const newUser=await User.findById(value.user);
                newUser.pendingRequest.splice(newUser.pendingRequest.indexOf(id),1);
                regUser.joinRequest.splice(index,1);
                newUser.save();
                regUser.save();
            }
        }));
        await Team.findByIdAndDelete(id);
        res.status(200);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// View Team

export const viewTeam = async (req,res)=>{
    try {
        const {id}=req.params;
        const team= await Team.findById(id);
        const teamMembers=await promise.all(team.members.map(async (id)=>{
             const newUser=await User.findById(id);
             return{
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                email:newUser.email,
             };
        }));
        const regUser=await User.findById(team.userId);
        const finalTeam={
            firstName:regUser.firstName,
            lastName:regUser.lastName,
            email:regUser.email,
            description:team.description,
            title:team.title,
            intake:team.intake,
            members:teamMembers,
        };
        res.status(200).json(finalTeam);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Edit Team page

export const edit = async (req,res)=>{
    try {
       const {id}=req.params;
       const newTeam=await Team.findById(id);
       res.status(200).json(team);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Edit Team

export const editTeam = async (req,res)=>{
    try {
       const {id}=req.params;
       const regTeam=await findById(id);
       if(req.user!==regTeam.userId){
        res.status(403).json("Access Denied!!");
        return;
       }
       const {newTeam}=req.body;
       const team=await findbyIdAndUpdate(id,{...newTeam});
       res.status(200).json(team);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}