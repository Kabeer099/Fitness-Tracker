import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  mealType: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: String, required: true },
  calories: { type: Number, required: true },
  macro: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

export default Nutrition;
