import mongoose from "mongoose";

const TeamSchema=new mongoose.Schema(
    {
       userId:{
          type:String,
          required:true
       },
       description:{
        type:String,
        required:true,
        min:1,
       },
       title:{
        type:String,
        required:true,
        min:1,
       },
       intake:{
        type:Number,
        required:true,
        min:1
       },
       remaining:{
        type:Number,
       },
       members:{
        type:Array,
        default:[]
       }
    }
);

const Team=mongoose.model("Team",TeamSchema);

export default Team;