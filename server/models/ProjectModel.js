const { Schema, default: mongoose } = require('mongoose');

const ProjectSchema = new Schema({
  project: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
  ],
}, { timestamps: true });


module.exports = mongoose.model("Project",ProjectSchema);