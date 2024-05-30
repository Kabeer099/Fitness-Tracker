import mongoose from 'mongoose';

const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bodyMeasurements: {
      type: String,
      required: true,
    },
    runTime: {
      type: String,
      required: true,
    },
    liftWeight: {
      type: String,
      required: true,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
