import mongoose from 'mongoose'

const ticketsCollection = 'tickets'

const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
}
const numberTypeSchemaNonUniqueRequired = {
  type: Number,
  required: true,
}
const getDateAndCode = () => {
  const codeGen = Math.floor(Math.random() * 10000)
  const currentDate = new Date().toISOString().replace(/[-:.TZ]/g, '')
  return `date:${currentDate} - code:${codeGen}`
}
const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: getDateAndCode(),
  },
  purchase_datetime: { type: Date, default: Date.now },
  amount: numberTypeSchemaNonUniqueRequired,
  purchaser: stringTypeSchemaNonUniqueRequired,
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
    ],
    default: [],
  },
})

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema)
