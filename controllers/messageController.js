import Message from "../models/messageModel.js";
import sendEmail from "../utils/sendEmail.js";


export const sendMessage = async (req, res) => {
    try {
        const { userName, userEmail, message } = req.body;

        if (!userName || !userEmail || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const newMessage = await Message.create({
            userName,
            userEmail,
            message,
        });
        await sendEmail(userName, userEmail, message);
        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        return res.status(200).json({
            count: messages.length,
            data: messages,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
export const getUnreadMessages = async (req, res) => {
    try {
        const unreadMessages = await Message.find({ read: false }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            count: unreadMessages.length,
            data: unreadMessages,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.status(200).json({
            message: "Message marked as read",
            data: message,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
