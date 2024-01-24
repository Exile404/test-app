import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    
    username:{
        type: String,
        unique: true,
    },
    name:{
        type: String,
        
    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type: String,
        
    },
    googleId: {
        type: String,
        unique: true,
      },

},{
    timestamps:true
});

export default mongoose.model("User",userSchema)
