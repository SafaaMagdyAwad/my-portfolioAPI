import express from "express";
import { getAllMessages, getUnreadMessages, markAsRead, sendMessage } from "../controllers/messageController.js";


const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/", getAllMessages);
messageRouter.get("/unread", getUnreadMessages);
messageRouter.put("/:id/read", markAsRead);

export default messageRouter;
