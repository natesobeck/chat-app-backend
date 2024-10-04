import { Chat } from "../models/chat.js"

async function index(req, res) {
  try {
    const userId = req.user.profile

    const chats = await Chat.find({ participants: userId })
    res.status(200).json(chats)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const { participants } = req.body
    const existingChat = await Chat.findOne({
      participants: { $all: participants },
      participants: { $size: participants.length },
    })

    if (existingChat) {
      return res.status(200).json({ message: "Chat already exists" })
    }

    const unreadMessageCount = participants.map((participantId) => {
      return {
        participantId,
        count: 0,
      }
    })

    req.body = {
      ...req.body,
      lastMessage: null,
      unreadMessageCount
    }

    const newChat = await Chat.create(req.body)
    res.status(201).json(newChat)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const { newMessage, editedMessage, _id: chatId } = req.body
    const chat = Chat.findById(chatId)

    //*  UNFINISHED
    if (newMessage) {

    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { index, create, update }
