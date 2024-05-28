export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getTickets() {
    const tickets = await this.dao.getTickets();
    return tickets;
  }

  async getTicketById(ticketId) {
    const ticket = await this.dao.getTicketById(ticketId);
    return ticket;
  }

  async addTicket(ticket) {
    const result = await this.dao.addTicket(ticket);
    return result;
  }

  async updateTicket(idTicket, ticket) {
    const ticketUpdated = await this.dao.updateTicket(idTicket, ticket);
    return ticketUpdated;
  }

  async deleteTicket(idTicket) {
    const ticketToDeleted = await this.dao.deleteTicket(idTicket);
    return ticketToDeleted;
  }
}
