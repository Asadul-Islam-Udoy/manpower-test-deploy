const mongoose = require("mongoose");
const workerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "worker",
    },
    services: [
      {
        service: {
          type: mongoose.Schema.ObjectId,
          ref: "Service",
          required: true,
        },
      },
    ],
    is_free: {
      type: String,
      default: "YES",
    },
    phone_or_email: {
      type: String,
      required: true,
    },
    relationship:{
      type: String,  
    },
    gender:{
      type: String,  
    },
    education_qualification:{
      type: String,  
    },
    languages:[],
    ratings:{
      type:Number,
      default:0
    },
    reviews:[{
      user:{type:mongoose.Schema.ObjectId,ref:'ClientProfile'},
      comment:{type:String,required:true},
      rating:{type:Number,default:0},
      date:{
        type:Date,
        default:Date.now()
      }
    }],
    avatar: {
      type: String,
    },
    nid_number: {
      type: String,
    },
    profile_description: {
      type: String,
      trim:true
    },
    area: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
