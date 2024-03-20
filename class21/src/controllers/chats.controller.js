import { Router } from "express";
import messagesService from "../services/messages.service.js";

const chatsController = Router();

chatsController.get("/chats/", async (req, res) => {
  try {
    const messages = await messagesService.getAll();

    if (messages) {
      res.status(200).send(messages);
    } else {
      res.status(200).send([]);
    }
  } catch (e) {
    res.status(400).send({ error: e, description: "Endpoint: GET chats/" });
  }
});

/** Add message */
chatsController.post("/chats/message", async (req, res) => {
  try {
    const createdMessage = await messagesService.addMessage(req.body);

    if (createdMessage) {
      res.status(200).send(createdMessage);
    }
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .send({ error: e, description: "Endpoint: POST chats/message/" });
  }
});

export default chatsController;
