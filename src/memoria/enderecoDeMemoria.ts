export class enderecoDeMemoria{
    private inicio: number
    private fim: number

    constructor(inicio: number, fim: number) {
        this.inicio = inicio
        this.fim = fim
    }
    public get getInicio(): number {
        return this.inicio
    }

    public get getfim(): number {
        return this.fim
    }

    public get getSize(): number {
        return this.fim - this.inicio
    }
}