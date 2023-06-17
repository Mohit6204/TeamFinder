import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min:2,
            max:100,
        },
        lastName:{
            type: String,
            required: true,
            min:2,
            max:100,
        },
        email:{
            type: String,
            required: true,
            min:2,
            max:100,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            min:6,
        },
        teams:{
            type:Array,
            default:[],
        },
        pendingRequest:{
            type:Array,
            default:[],
        },
        acceptedRequest:{
            type:Array,
            default:[],
        },
        joinRequest:{
            type:Array,
            default:[],
        }
    });

    const User=mongoose.model("User",UserSchema);

    export default User;