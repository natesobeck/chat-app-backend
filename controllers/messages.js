import { Chat } from "../models/chat";
import { Message } from "../models/message";

async function index(req, res) {
  try {
    const userId = req.user.profile
    const { chatId } = req.body
    const chat = await Chat
      .findOne({
        _id: chatId,
        participants: userId
      })
      .populate('messages')
    if (!chat) {
      return res.status(403).json({ error: "You aren't authorized to view this chat." })
    }

    res.status(200).json(chat.messages)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const userId = req.body.profile
    const { chatId } = req.body

    const chat = await Chat
      .findOne({
        _id: chatId,
        participants: userId
      })

    if (!chat) {
      return res.status(403).json({ error: "You are not authorized to post to this chat." })
    }

    const newMessage = await Message.create(req.body)

    chat.messages.push(newMessage._id)
    chat.lastMessage = newMessage._id,
    chat.hasNewMessage = true
    await chat.save()

    res.status(201).json(newMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// This is a soft delete; the resource remains but it's isDeleted property is set to true
async function deleteMessage(req, res) {
  try {
    const userId = req.user.profile
    const { messageId, chatId } = req.body

    const chat = await Chat
      .findOne({
        _id: chatId,
        participants: userId
      })
    if (!chat) {
      return res.status(403).json({ error: "You are not authorized for this chat." })
    }

    const messageToDelete = await Message.findById(messageId)

    if (!messageToDelete) {
      return res.status(404).json({ error: "Message not found." })
    }
    
    messageToDelete.isDeleted = true
    const deletedMessage = await messageToDelete.save()
    res.status(200).json(deletedMessage._id)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const userId = req.body.profile
    const { messageId, content, chatId } = req.body

    const chat = await Chat
      .findOne({
        _id: chatId,
        participants: userId
      })
      if (!chat) {
        return res.status(403).json({ error: "You are not authorized for this chat" })
      }
    
    const messageToUpdate = await Message.findById(messageId)

    if (!messageToUpdate) {
      return res.status(404).json({ error: "Message not found" })
    }

    if (messageToUpdate.senderId !== userId) {
      return res.status(403).json({ error: "You are not authorized to edit this message." })
    }

    chat.hasNewMessage = true
    await chat.save()
    messageToUpdate.isEdited = true
    messageToUpdate.content = content
    const updatedMessage = await messageToUpdate.save()

    res.status(200).json(updatedMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  deleteMessage,
  update
}