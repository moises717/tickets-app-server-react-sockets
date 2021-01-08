const Ticket = require("./Ticket");

class TicketList {
	constructor() {
		this.ultimoNumero = 0;

		this.pendientes = [];
		this.asignados = [];
	}

	get getSiguienteNumero() {
		this.ultimoNumero++;
		return this.ultimoNumero;
	}

	//Tres que se veran en las targetas y  10 en el historial

	get Ultimos13() {
		return this.asignados.slice(0, 13);
	}

	crearTicket() {
		const nuevoTicket = new Ticket(this.getSiguienteNumero);
		this.pendientes.push(nuevoTicket);
		return nuevoTicket;
	}

	asignarTicket(agente, escritorio) {
		if (this.pendientes.length === 0) {
			return null;
		}

		const siguienteTicket = this.pendientes.shift();

		siguienteTicket.agente = agente;
		siguienteTicket.escritorio = escritorio;

		this.asignados.unshift(siguienteTicket);

		return siguienteTicket;
	}
}

module.exports = TicketList;
