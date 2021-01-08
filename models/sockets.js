const TicketList = require("./TicketList");

class Sockets {
	constructor(io) {
		this.io = io;

		this.tickeLists = new TicketList();

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on("connection", (socket) => {
			console.log("Cliente coneted");

			socket.on("solicitar-ticket", (data, callback) => {
				const nuevoTicket = this.tickeLists.crearTicket();

				callback(nuevoTicket);
			});
			socket.on(
				"siguiente-ticket-trabajar",
				({ agente, escritorio }, callback) => {
					const suTicket = this.tickeLists.asignarTicket(agente, escritorio);
					callback(suTicket);

					this.io.emit("ticket-asignado", this.tickeLists.Ultimos13);
				}
			);
		});
	}
}

module.exports = Sockets;
