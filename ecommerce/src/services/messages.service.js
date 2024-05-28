import MessageDao from "../dao/mongo/message.dao.js";

const Message = new MessageDao();

const messagesService = {
  getAll: async () => {
    try {
      const messages = await Message.getAll();
      return messages;
    } catch (error) {
      throw error;
    }
  },
  addMessage: async (data) => {
    try {
      const newMessage = await Message.insertOne(data);
      return newMessage;
    } catch (error) {
      throw error;
    }
  },
};

export default messagesService
