import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
  senderId: { type: Schema.Types.ObjectId, ref: 'Profile' },
  isRead: { type: Boolean, default: false },
  isEdited: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  content: { type: Array, default: [] }
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export { Message }