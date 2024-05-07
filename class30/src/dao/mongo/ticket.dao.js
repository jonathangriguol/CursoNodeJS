import Ticket from "../../models/ticket.model.js";

export default class MongoTicketDao {
  async getTickets() {
    try {
      return await Ticket.find().lean();
    } catch (error) {
      console.log(error);
    }
  }

  async getTicketById(ticketId) {
    try {
      return await Ticket.findById(ticketId).lean();
    } catch (error) {
      console.log(error);
    }
  }

  //Agrega un nuevo usuario a la base de datos.
  async addTicket(ticketData) {
    try {
      return await Ticket.create(ticketData);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTicket(idTicket, ticket) {
    try {
      return await Ticket.updateOne({ _id: idTicket }, ticket);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTicket(idTicket) {
    try {
      return await Ticket.deleteOne({ _id: idTicket });
    } catch (error) {
      console.log(error);
    }
  }
}
