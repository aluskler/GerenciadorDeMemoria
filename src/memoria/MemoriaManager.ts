import { processo } from "../processo/processo";
import { estrategia } from "./estrategia";
import { enderecoDeMemoria } from "./enderecoDeMemoria";

export class MemoriaManager {
  public memoriaFisica: string[];
  private estrategia: estrategia;

  constructor(estrategia: estrategia) {
    this.memoriaFisica = new Array<string>(128);
    this.estrategia = estrategia;
  }

  public write(process: processo): void {
    if (this.estrategia === estrategia.FIRST_FIT) {
      this.modoFirstFit(process);
    } else if (this.estrategia === estrategia.BEST_FIT) {
      this.modoBestFit(process);
    } else if (this.estrategia === estrategia.WORST_FIT) {
      this.modoWorstFit(process);
    }
  }
  public remove(process: processo): void {
    const idProcesso = process.getId;

    for (let i = 0; i < this.memoriaFisica.length; i++) {
      if (this.memoriaFisica[i] === idProcesso) {
        this.memoriaFisica[i] = "";
      }
    }

    this.logRemoverProcesso(idProcesso);
  }

  private logRemoverProcesso(id: string) {
    console.log(`Processo: ${id} removido da memória.`);
  }

  private modoFirstFit(process: processo): void {
    let contadorDeMemoria = 0;
    let inicioIndex = 0;
    let FimIndex = 0;

    for (let i = 0; i < this.memoriaFisica.length; i++) {
      const element = this.memoriaFisica[i];

      if (!element) {
        contadorDeMemoria++;

        if (contadorDeMemoria === process.getsize) {
          FimIndex = inicioIndex + contadorDeMemoria;
          break;
        }
      } else {
        inicioIndex = i + 1;
        contadorDeMemoria = 0;
      }
    }
    process.setendereco({ inicio: inicioIndex, fim: FimIndex });
    const verificadorDeTamanho = process.getendereco.getSize >= process.getsize;

    if (verificadorDeTamanho) {
      this.logProcessoInicial(process.getsize, process.getId);
      for (
        let indexMemoria = process.getendereco.getInicio;
        indexMemoria < process.getendereco.getfim;
        indexMemoria++
      ) {
        this.memoriaFisica[indexMemoria] = process.getId;
        this.logCriarProcesso(indexMemoria, process.getId);
      }
      this.logFinalizarProcesso(process.getId);
    } else {
      this.logErroNoProcesso(process.getId, process.getsize);
    }
  }
  private modoBestFit(process: processo): void {
    let melhorInicio = -1;
    let menorTamanho = Number.MAX_SAFE_INTEGER;
    let contador = 0
    for (let i = 0; i < this.memoriaFisica.length; i++) {
      let j = i;
      while (!this.memoriaFisica[j] && j < this.memoriaFisica.length) {
        j++;
        contador++
      }
      let tamanho = j - i;
      if (tamanho >= process.getsize && tamanho < menorTamanho && contador < menorTamanho) {
        melhorInicio = i;
        menorTamanho = tamanho;
        i = j - 1;
        contador=0
      }
    }

    this.alocarProcesso(process, melhorInicio);
  }

  private modoWorstFit(process: processo): void {
    let piorInicio = -1;
    let maiorTamanho = 0;

    for (let i = 0; i < this.memoriaFisica.length; i++) {
      let j = i;
      while (!this.memoriaFisica[j] && j < this.memoriaFisica.length) {
        j++;
      }
      let tamanho = j - i;
      if (tamanho >= process.getsize && tamanho > maiorTamanho) {
        piorInicio = i;
        maiorTamanho = tamanho;
        i = j - 1;
      }
    }

    this.alocarProcesso(process, piorInicio);
  }

  private alocarProcesso(process: processo, inicioIndex: number): void {
    if (inicioIndex === -1) {
      this.logErroNoProcesso(process.getId, process.getsize);
      return;
    }

    let fimIndex = inicioIndex + process.getsize;
    process.setendereco({ inicio: inicioIndex, fim: fimIndex });

    this.logProcessoInicial(process.getsize, process.getId);
    for (let i = inicioIndex; i < fimIndex; i++) {
      this.memoriaFisica[i] = process.getId;
      this.logCriarProcesso(i, process.getId);
    }
    this.logFinalizarProcesso(process.getId);
  }
  private logProcessoInicial(size: number, id: string) {
    console.log(`----------------`);
    console.log(`Processo : ${id} - size: ${size}`);
    console.log(`----------\n`);
  }
  private logCriarProcesso(index: number, id: string) {
    console.log(`Index: ${index} -> Value: ${id}`);
  }
  private logFinalizarProcesso(id: string) {
    console.log(`\nProcess: ${id} inicializado!\n`);
  }
  private logErroNoProcesso(id: string, size: number) {
    console.log({
      error: "Memoria Insuficiente",
      process: id,
      size,
    });
  }
}
