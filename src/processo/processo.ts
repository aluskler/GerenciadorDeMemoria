import { enderecoDeMemoria } from "../memoria/enderecoDeMemoria";
import { randomUUID } from "node:crypto";

interface createEndereco {
  inicio: number;
  fim: number;
}
export class processo {
  private id: string;
  private size: number;
  private endereco: enderecoDeMemoria;

  constructor(size: number = Math.round(Math.random() * 128)) {
    this.id = randomUUID();
    this.size = size;
  }
  public get getId(): string {
    return this.id;
  }

  public get getsize(): number {
    return this.size;
  }

  public get getendereco(): enderecoDeMemoria {
    return this.endereco;
  }
  public setendereco({ inicio, fim }: createEndereco) {
    this.endereco = new enderecoDeMemoria(inicio, fim);
  }
}
