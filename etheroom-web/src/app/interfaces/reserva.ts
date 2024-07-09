export class Reserva {
    constructor(
        public id: number,
        public idQuarto: number,
        public checkIn: Date,
        public checkOut: Date
    ) {}
}
