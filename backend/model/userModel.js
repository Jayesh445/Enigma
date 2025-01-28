import mongoose from "mongoose";

const registerModel = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

export const User = mongoose.model("User", registerModel);
