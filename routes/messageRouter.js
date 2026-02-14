import express from "express";
import { getAllMessages, getUnreadMessages, markAsRead, sendMessage } from "../controllers/messageController.js";
import { authAdmin } from "../auth.js";


const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/",authAdmin, getAllMessages);
messageRouter.get("/unread",authAdmin, getUnreadMessages);
messageRouter.put("/:id/read",authAdmin, markAsRead);

export default messageRouter;
