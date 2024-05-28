import mongoose from "mongoose";

const RESET_CODES_COLLECTION = "resetPassword";
const EXPIRATION_TIME_SECONDS = 360;

const resetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Por favor, introduce un correo electrónico válido.",
    ],
  },
  code: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: EXPIRATION_TIME_SECONDS,
  },
});

const ResetPasswordModel = mongoose.model(
  RESET_CODES_COLLECTION,
  resetPasswordSchema
);

export default ResetPasswordModel;
