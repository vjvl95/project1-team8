import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
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
  },
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
