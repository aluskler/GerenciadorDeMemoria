import { cpumanager } from "../cpu/cpuManager";
import { MemoriaManager } from "../memoria/MemoriaManager";
import { estrategia } from "../memoria/estrategia";
import { processo } from "../processo/processo";
import { TipoDeChamada } from "./TipoDeChamada";

export class SO {
  private MemoriaManager: MemoriaManager;
  private CpuManager: cpumanager;

  constructor() {
    this.MemoriaManager = new MemoriaManager(estrategia.FIRST_FIT); /** */
    this.CpuManager = new cpumanager();
  }
  public chamada(type: TipoDeChamada, process: processo): processo | null {
    if (type === TipoDeChamada.WRITE_PROCESS) {
      this.MemoriaManager.write(process);
    } else if (type === TipoDeChamada.CLOSE_PROCESS) {
      this.closeProcess(process);
    }
    return null;
  }
  public criarProcesso(): processo {
    return new processo();
  }
  private closeProcess(process: processo): void {
    this.MemoriaManager.remove(process);
  }
}
