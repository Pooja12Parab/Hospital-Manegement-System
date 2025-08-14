import mongoose from "mongoose";
import departmentModel from "./department.model";
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  thumbnail: {
    type: String,
    default: null,
  },
  DoctorName: {
    type: String,
    require: true,
  },
  DepartmentName: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: departmentModel,
  },

  description: {
    type: String,
    required: true,
  },
  schedule: {
    available_days: {
      type: [String],
      required: true,
    },
    time_slots: {
      type: [String],
      require: true,
    },
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
export default mongoose.model("doctor", doctorSchema);
