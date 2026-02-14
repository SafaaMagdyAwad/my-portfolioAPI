import express from "express";
import {
  sendMessage,
  getAllMessages,
  getUnreadMessages,
  markAsRead,
} from "./messageController.js";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/", getAllMessages);
messageRouter.get("/unread", getUnreadMessages);
messageRouter.put("/:id/read", markAsRead);

export default messageRouter;
