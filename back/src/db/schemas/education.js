import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
        type: String,
        required: true,
      },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    user_id : [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
  },
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
