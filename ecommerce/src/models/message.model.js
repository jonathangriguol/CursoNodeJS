import mongoose from "mongoose";

const messageCollection = 'message'

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
})

export const Message = mongoose.model(messageCollection, messageSchema)