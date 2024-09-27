import mongoose from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema({
  messages: [messageSchema],
  hasNewMessage: {type: Boolean, default: false},
  participants: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  lastMessage: { type: Schema.Typess.ObjectId, ref: 'Message' },
  isDeleted: { type: Boolean, default: false },
  unreadMessageCount: [{
    participantId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    count: { type: Number, default: 0 }
  }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }