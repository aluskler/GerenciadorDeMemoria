import { processo } from "./processo/processo";
import { SO } from "./sistema/SO";
import { TipoDeChamada } from "./sistema/TipoDeChamada";

const So = new SO();

const p1 = new processo(20);
So.chamada(TipoDeChamada.WRITE_PROCESS, p1);

const p2 = new processo(38);
So.chamada(TipoDeChamada.WRITE_PROCESS, p2);

const p3 = new processo(38);
So.chamada(TipoDeChamada.WRITE_PROCESS, p3);

const p4 = new processo(20);
So.chamada(TipoDeChamada.WRITE_PROCESS, p4);

So.chamada(TipoDeChamada.CLOSE_PROCESS, p2);

const p5 = new processo(8);
So.chamada(TipoDeChamada.WRITE_PROCESS, p5);
