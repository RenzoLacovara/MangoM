import { ticketModel } from './models/tickets.model.js'

export default class TicketManager {
  createTicket = async (ticket) => {
    const newTicket = await ticketModel.create(ticket)
    return newTicket
  }
}
