import { Reserva } from "./reserva";

export class Quarto {
    constructor(
        public id: number,
        public idHotel: number,
        public preço: number,
        public tipo: string,
        public comodidades: string[],
        public descrição: string,
        public disponibilidade: { checkIn: Date, checkOut: Date }[],
        public número: number,
        public reservas: Reserva[] = []
    ) {}

    adicionarReserva(reserva: Reserva): boolean {
        if (this.verificarDisponibilidade(reserva.checkIn, reserva.checkOut)) {
            this.reservas.push(reserva);
            return true;
        }
        return false;
    }

    verificarDisponibilidade(newCheckIn: Date, newCheckOut: Date): boolean {
        for (let reserva of this.reservas) {
            if (newCheckIn < reserva.checkOut && newCheckOut > reserva.checkIn) {
                return false;
            }
        }
        return true;
    }
}
