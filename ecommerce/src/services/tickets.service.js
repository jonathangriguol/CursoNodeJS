import { Ticket } from "../dao/repository/index.js";

const ticketsService = {
  getTickets: async () => {
    const tickets = await Ticket.getTickets();
    return tickets;
  },

  getTicketById: async (ticketId) => {
    const ticket = await Ticket.getTicketById(ticketId);
    return ticket;
  },

  addTicket: async (ticket) => {
    const result = await Ticket.addTicket(ticket);
    return result;
  },

  updateTicket: async (idTicket, ticket) => {
    const ticketUpdated = await Ticket.updateTicket(idTicket, ticket);
    return ticketUpdated;
  },

  deleteTicket: async (idTicket) => {
    const ticketToDeleted = await Ticket.deleteTicket(idTicket);
    return ticketToDeleted;
  }
};

export default ticketsService