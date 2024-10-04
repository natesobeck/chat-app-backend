import { Message } from "../models/message";

async function index(req, res) {
  try {
    const { chatId } = req.body
    const messages = await Message.find({
      chatId: chatId
    })

    res.status(200).json(messages)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const newMessage = await Message.create(req.body)

    res.status(201).json(newMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// This is a soft delete; the resource remains but it's isDeleted property is set to true
async function deleteMessage(req, res) {
  try {
    const { messageId } = req.body
    const messageToDelete = await Message.findById(messageId)
    
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
    const { messageId } = req.body
    const updatedMessage = Message.findByIdAndUpdate(messageId, req.body)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  deleteMessage,

}