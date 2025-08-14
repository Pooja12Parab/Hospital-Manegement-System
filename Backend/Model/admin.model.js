import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  contact: {
    type: Number,
    require: true,
  },

  thumbnail:{
    type:String,
    require:true
},

  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("admin", adminSchema);
