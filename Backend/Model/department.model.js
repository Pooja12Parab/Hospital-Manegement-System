import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  thumbnail: {
    type: String,
    default: null,
  },
  DepartmentName: {
    type: String,
    required: true, 
  },
  Description: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

export default mongoose.model("department", DepartmentSchema); 
