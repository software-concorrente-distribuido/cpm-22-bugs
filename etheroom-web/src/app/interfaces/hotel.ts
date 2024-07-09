import { Quarto } from "./quarto";

export class Hotel {
    
    constructor(
        public id: number,
        public nome: string,
        public endereco: string,
        public comodidades: string[],
        public telefone: string,
        public pais: string,
        public descrição: string,
        public quartos: Quarto[],
        public atraçõesPróximas: string[]
    ) {}
}
