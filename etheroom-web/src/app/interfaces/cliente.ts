import { Reserva } from "./reserva";

export class Cliente {

    constructor(
    public id: number,
    public email: string,
    public senha: string,
    public endereco: string,
    public wallet: string, //endereço da conta Ethereum em hexadecimal
    public reservasList: Reserva[], //Lista de endereços de contratos de reserva
    public telefone: string,
    ) {}
}