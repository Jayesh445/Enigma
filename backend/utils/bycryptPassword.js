import bcrypt from "bcrypt";

const hashedPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10); // Use asynchronous hashing for better performance
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error.message);
    throw new Error("Failed to hash password");
  }
};

export default hashedPassword;
